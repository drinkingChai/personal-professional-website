var nodemailer = require('nodemailer');

module.exports = {
  new: function(data) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'wzamanwebsite@gmail.com', // Your email id
        pass: 'teatoemail' // Your password
      }
    });

    var mailOptions = {
      from: 'example@gmail.com', // sender address
      to: 'teatocode@gmail.com', // list of receivers
      subject: 'New request from ' + data.name, // Subject line
      text: data.sender + '\n\n' + data.body //, // plaintext body
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
