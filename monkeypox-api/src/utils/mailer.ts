import nodemailer from 'nodemailer';

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  const mailOptions = {
    from: process.env.SMTP_USER, // Remitente (tu Gmail)
    to,                          // Destinatario
    subject,                     // Asunto
    text,                        // Texto sin formato
    html,                        // Mensaje en formato HTML
  };

  try {
    await transporter.sendMail(mailOptions); // Enviar el correo
    console.log(`Email sent to ${to}`); // Confirmación en consola
  } catch (error) {
    console.error(`Error sending email: ${error}`); // Manejo de errores
  }
};
