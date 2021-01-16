"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email, name, mobile, product) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '', // email
      pass: '', // password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'mixanasa@yandex.ru', // sender address
    to: email, // list of receivers
    subject: "Регистрация", // Subject line
    text: "Регистрация", // plain text body
    html: `<h1>Здравсвуйте</h1><h1 style='color: blue'>${name}</h1><br/>
           <h1>Телефон</h1><h1>${mobile}</h1><br/> 
           <h1>Товар</h1><h1>${product}</h1><br/> 
          `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@yandex.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendMail().catch(console.error);
module.exports = sendMail;
