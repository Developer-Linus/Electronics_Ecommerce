import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendActivationEmail = async (email, token) => {
  const link = `http://localhost:5000/api/auth/activate/${token}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Advanced InfoTech" <no-reply@advancedinfotech.com>',
    to: email,
    subject: "Activate your account",
    html: `<p>Click <a href="${link}">here</a> to activate your account.</p>`,
  });
};
