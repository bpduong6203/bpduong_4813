require('dotenv').config(); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,       
  port: process.env.MAIL_PORT,      
  secure: false,                    
  auth: {
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_PASSWORD 
  },
  tls: {
    rejectUnauthorized: false       
  }
});

module.exports = {
    sendmailFrogetPass: async function (to, URL) {
        return await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`, 
            to: to, 
            subject: "MAIL MOI DU LICH CAM",
            html: `<a href=${URL}>CLICK VAO DAY DE XEM VIEC NHE VOLT CAO</a>`, 
        });
    }
}