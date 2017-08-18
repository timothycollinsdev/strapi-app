'use strict';

const nodemailer = require('nodemailer');

/**
 * Email service.
 */

var exp = {
  send: function (options) {
    return new Promise(function (resolve, reject) {

      var transporter = nodemailer.createTransport(
        {
          host: "smtp-mail.outlook.com", // hostname
          secure: false, // use SSL
          port: 587, // port for secure SMTP
          auth: {
              user: "neo.xactor@outlook.com",
              pass: "***REMOVED***"
          }
        }
      );
      if(options.length <= 0) reject("You need to have one recipent! none found")
      options.forEach(option=>{
        let mailOptions = {
            from: '"Shahid Kamal 👻" <neo.xactor@outlook.com>', // sender address
            to: option.to, // list of receivers
            subject: option.subject, // Subject line
            text: option.text, // plain text body
            html: option.html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            // console.log(info);
            resolve(`Message ${info.messageId} sent: ${info.response}`)
        });
      });
    });
  }
};

module.exports = exp
//
// exp.send({
//   "to" : "neo.xactor@gmail.com",
//   "subject" : "Email Inquiry for",
//   "text" : "You've requested these things",
//   "html" : "<h1> You've requested these things</h1>"
// }).then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.error(error);
// })
