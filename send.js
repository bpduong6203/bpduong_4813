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

const mailOptions = {
  from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
  to: 'bpduong6203@gmail.com',
  subject: 'Congratulations! Invitation to Interview for NASA Engineer Position',
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-bottom: 2px solid #0055A5;">
        <h1 style="color: #0055A5;">🚀 NASA Recruitment 🚀</h1>
        <p style="font-size: 18px; color: #444;">Invitation to Interview: <b>NASA Engineer</b> Position</p>
      </div>
      <div style="padding: 20px;">
        <p>Dear <b>Candidate</b>,</p>
        <p>We are thrilled to inform you that after reviewing your impressive qualifications, you have been shortlisted for an interview for the position of <b>NASA Engineer</b>.</p>
        <p><b>Interview Details:</b></p>
        <ul style="line-height: 1.8; color: #555;">
          <li><b>Date:</b> March 30, 2025</li>
          <li><b>Time:</b> 10:00 AM (PST)</li>
          <li><b>Location:</b> NASA Headquarters, 300 E St SW, Washington, DC 20546, USA</li>
          <li><b>Contact:</b> HR Department - hr@nasa.gov | Phone: +1 202-358-0000</li>
        </ul>
        <p>Please confirm your attendance by replying to this email before <b>March 28, 2025</b>.</p>
        <p>We look forward to meeting you and discussing how your skills can contribute to advancing space exploration.</p>
        <p style="text-align: center; margin-top: 20px;">
          <a href="https://www.nasa.gov" style="text-decoration: none; background-color: #0055A5; color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Learn More About NASA</a>
        </p>
      </div>
      <div style="text-align: center; padding: 10px; background-color: #f4f4f4; border-top: 2px solid #0055A5; font-size: 14px; color: #777;">
        <p>© 2025 NASA. All rights reserved.</p>
      </div>
      <p style="font-size: 10px; text-align: center; color: #999; margin-top: 20px;">
        This is a professional recruitment email from NASA's HR department.
      </p>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

