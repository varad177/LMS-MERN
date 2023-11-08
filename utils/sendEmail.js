

// April O'Reilly
import nodemailer from 'nodemailer'

const sendEmail = async function(email , subject , message){


    const transporter = nodemailer.createTransport({
        // host:process.env.SMPT_HOST, 
        // port: process.env.SMPT_PORT,
        host: 'smtp.elasticemail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            // user:'april61@ethereal.email' ,
            // pass:process.env.SMPT_PASSWORD
            pass: process.env.MAILPASS
        }
    });

    await transporter.sendMail({
        // from: process.env.SMPT_FROM_HOST , 
        from: 'fakeacc6862@gmail.com',
        to: email, 
        subject: subject, 
        html:message , 
    });

}

export default sendEmail;



