const { body } = require("express-validator")

function validateEmail(field) {
  return body(field).isEmail().withMessage("Please enter a valid email address.")
}

function fieldRequired(field) {
  return body(field).not().isEmpty().withMessage("This field is required.")
}


module.exports = {
  validateEmail,
  fieldRequired
}