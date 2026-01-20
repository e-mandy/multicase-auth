import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_API_TOKEN,
  },
});