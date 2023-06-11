const nodemailer = require("nodemailer")

async function sendEmail(email, varify, template){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "pokpokadda@gmail.com", 
          pass: "gtbpnxtymxshqfdb", 
        },
      });
    
      
      let info = await transporter.sendMail({
        from: 'pokpokadda@gmail.com', // sender address
        to: email, // list of receivers
        subject: "please varify your email", // Subject line
        html: template(varify), // html body
      });
}

module.exports = sendEmail