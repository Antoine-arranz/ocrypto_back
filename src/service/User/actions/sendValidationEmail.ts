import nodemailer from "nodemailer";
import config from "../../../config";
const sendValidationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "ocryptozz@gmail.com",
      pass: "ocrypto4life",
    },
  });

  let mailOptions = {
    from: "ocryptozz@gmail.com",
    to: `antoine_arranz@hotmail.com`,
    subject: "Contact request",
    text: `please verify your email with this link : ${config.api.front.full}/login/${token}`,
  };

  transporter.sendMail(mailOptions);
};

export default sendValidationEmail;
