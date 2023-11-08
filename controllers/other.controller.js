import sendEmail from "../utils/sendEmail.js";

export const sendContactMessage = async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  const subject = `the message form LMS project from a email =>${email} `;
  const Contsctmessage = message;

 await sendEmail(email, subject, Contsctmessage);


    return res.status(200).json({
        success: true,
        message: "message send",
      });
  

  
};
