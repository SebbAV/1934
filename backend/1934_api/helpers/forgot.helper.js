var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '1934.aigame@gmail.com',
        pass: 'alcatraz_1934'
    }
});
module.exports =
    {
        sendMail: function (email, code) {
            var mailOptions = {
                from: 'jose.mvp55@gmail.com',
                to: email,
                subject: 'New Password assigned',
                text: "new password: " + code
            };
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) reject(error);
                    resolve(info);
                });
            });

        }
    }
