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
              pass: "<email password>"
          }
        }
      );
      if(options.length <= 0) reject("You need to have one recipent! none found")
      var successful = 0
      var errorful = 0
      options.forEach(option=>{
        let mailOptions = {
            from: '"Shahid Kamal 👻" <neo.xactor@outlook.com>', // sender address if initialized through custom smtp
            to: option.to, // list of receivers
            subject: option.subject, // Subject line
            text: option.text, // plain text body
            html: option.html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              // add error
              console.log("emailService(): ", error)
              errorful+=1
            }else{
              successful+=1
            }
        });
      });
      resolve(`Sent: ${successful.length}, Error: ${errorful.length}`)
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
