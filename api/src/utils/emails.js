import nodemailer from "nodemailer";
import { generateError } from "../errors/errors";

const from = process.env.EMAILUSER || "Innovant Bridge";
const user = process.env.EMAIL || "innovantbridge@gmail.com";
const pass = process.env.EMAILPASS || "azerty123.";
const clientUrl = process.env.CLIENTURL || "http://localhost:3000";
const adminUrl = process.env.ADMINURL || "http://localhost:3001";

const getURL = (admin) => (admin ? adminUrl : clientUrl);

export const welcomeEmail = (admin, email, name, token) => {
  const url = getURL(admin);

  return createmail(
    email,
    "Welcome to Bridge",
    `  <h1>  Welcome ${name} to Bridge</h1>
          <p> Please verify your account by clicking in the link below and then You can login to our plateform, see you there :)</p>
           <a href="${url}/signinfo?page=signUpVerification&token=${token}">Verify your account here</a>
    `
  );
};

export const resetPasswordMail = (admin, email, token) => {
  const url = getURL(admin);
  return createmail(
    email,
    "Reset password",
    `  <h1>  Reset your password here </h1>
    <a href="${url}/resetpassword?page=passwordValidation&token=${token}">Reset password!</a>`
  );
};

export const invitationEmail = (email, description, owned) => {
  return createmail(
    email,
    "Invitation",
    `  <h1>Invitation from Bridge</h1>
          <h6> ${description}</h6>
     <a href="${clientUrl}/signup?owned=${owned}" &² > Click here to visit our plateform! </a>
    `
  );
};

export const createmail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `${from} < ${user} > `,
      to: email,
      subject,
      text: "",
      html,
    });
    return "Email has been sent";
  } catch (error) {
    generateError(error.message);
  }
};
