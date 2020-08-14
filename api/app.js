const express = require("express")
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // support encoded bodies
app.use(cors())

const mailer = require('../functions/mailer.js')
const example = require('../functions/example.js')
const upload = require("../functions/helpers/upload")

const { validationResult } = require("express-validator")
const {
    fieldRequired,
    validateEmail,
} = require("../functions/helpers/form-validators")


app.get('*', (req, res) => {
    example.handler(req.body, null, (n, response) => res.json(response))
})


app.post('/handle-form',
    [
        upload.none(), // enable req.body.{form[name]} below using multer
        fieldRequired("Your-message"),
        fieldRequired("Your-email"),
        validateEmail("Your-email"),
    ],
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
        }
        try {

            mailer.handler(req.body, null, function (n, response) {
                res.json(response)
            })


        } catch (error) {
            return res.status(504).json({ error })
        }
    }
)

app.listen(process.env.PORT ? process.env.port : 3227);