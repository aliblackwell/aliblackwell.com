const nodemailer = require("nodemailer");

module.exports.handler = (event, context, callback) => {
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {

        let transporter, senderAddress;

        if (process.env.NODE_ENV === 'production') {

            senderAddress = process.env.fromEmail;
            transporter = nodemailer.createTransport({
                sendmail: true,
                newline: 'unix',
                path: '/usr/sbin/sendmail',
                port: 587,
                secure: true,
                auth: {
                    user: senderAddress,
                    pass: process.env.fromEmailPassword
                },
                tls: {
                    rejectUnauthorized: false  // if on local
                }
            });

        } else {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            senderAddress = '"Fred Foo 👻" <foo@example.com>'
            // create reusable transporter object using the default SMTP transport
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });
        }

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: senderAddress, // sender address
            to: "aliblackwell@protonmail.com", // list of receivers
            subject: "New contact form", // Subject line
            text: `Name: ${event['Your-name']}
Email: ${event['Your-email']}
Number: ${event['Your-number']}

${event['Your-message']}
            `, // plain text body
            html: `<b>Name: ${event['Your-name']}</b><br/>
                    <b>Number: ${event['Your-number']}</b><br/>
                    <b>Email: ${event['Your-email']}</b><br/>
                    ${event['Your-message']}`, // html body
        });

        if (process.env.NODE_ENV !== 'production') {
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
    }

    main().then(() => {

        callback(null, {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({
                status: "Mailer function working"
            })
        })


    }).catch(console.error);

};