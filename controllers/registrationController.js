const emailValidation = require("../helpers/emailValidation")
const User = require("../models/usersModel.js")
const bcrypt = require("bcrypt")
const otpTemplate = require("../helpers/otpTemplate.js")
const sendEmail = require("../helpers/sendEmail.js")
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registrationController = async(req, res)=>{
    const {fullName, email, password, avatar, facebookId, linkedinId} = req.body
    
    if(!fullName){
        return res.send({error: "Enter Fullname"})
    } else if(!email){
        return res.send({error: "Enter Email"})
    } else if(!emailValidation(email)){
        return res.send({error: "Enter a valid Email"})
    }
    else if(!password){
        return res.send({error: "Enter Password"})
    } else{
        let duplicateEmail = await User.find({email: email})

        if(duplicateEmail.length > 0){
            return res.send({error: "Email Already Exists. Try another  "})
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            const user = new User({
                fullName,
                email,
                password: hash,
                avatar, 
                facebookId, 
                linkedinId
            })

            user.save()
            const generator2 = aleaRNGFactory(Date.now());
            let randomNumber = generator2.uInt32().toString().substring(0, 4)
            let randomOtpStore = await User.findOneAndUpdate(
                {email},
                {$set: {randomOtp:randomNumber}},
                {new: true}
            )
            sendEmail(email, randomOtpStore.randomOtp, otpTemplate)

            // setTimeout(async function(){
            //     console.log("OTP deleted!")
            //     let randomOtpStore = await User.findOneAndUpdate(
            //         {email},
            //         {$unset: {randomOtp: "" }},
            //         {new: true}
            //     )
            // }, 15000)

            res.send({
                success: "Registration Successfull, please check your email",
                fullName: user.fullName,
                email: user.email,
            })
        });

        //return res.send({success: "Registration Successfull"})
    }
}

module.exports = registrationController;