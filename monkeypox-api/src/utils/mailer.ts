import nodemailer from 'nodemailer';
import { envs } from '../config/env';

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: envs.SMTP_USER, 
    pass: envs.SMTP_PASS, 
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  console.log(subject)
  const mailOptions = {
    from: envs.SMTP_USER, 
    to,
    subject,                  
    text,                      
    html,                        
  };

  try {
    await transporter.sendMail(mailOptions); 
    console.log(`Email sent to ${to}`); 
  } catch (error) {
    console.error(`Error sending email: ${error}`); 
  }
};
