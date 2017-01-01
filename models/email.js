var nodemailer = require('nodemailer');
var passwords = require('./passwords.js');

module.exports = {
  new: function(data) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'wzamanwebsite@gmail.com', // Your email id
        pass: passwords.email // Your password
      }
    });

    var mailOptions = {
      from: 'example@gmail.com', // sender address
      to: 'teatocode@gmail.com', // list of receivers
      subject: 'New request from ' + data.name, // Subject line
      text: 'New request from ' + data.name + ' at ' + data.sender + '\n\n' + data.body //, // plaintext body
      // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        throw error;
      } else{
        console.log('Message sent: ' + info.response);
      };
    });
  }
}
