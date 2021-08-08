import nodemailer from "nodemailer";
import config from "../../../config";
const sendResetPassword = async (
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
    text: `Generate new password with this link : ${config.api.front.full}/reset-password/${token}`,
  };

  transporter.sendMail(mailOptions);
};

export default sendResetPassword;
