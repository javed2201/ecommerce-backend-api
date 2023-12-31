const user = require("../models/usersModel")
const bcrypt = require("bcrypt")
const emailValidation = require("../helpers/emailValidation")

let loginController = async (req, res)=>{
    let {email, password} = req.body

    if(!email){
        return res.send({error: "Enter Email"})
    } else if(!emailValidation(email)){
        return res.send({error: "Enter a valid Email"})
    }
    else if(!password){
        return res.send({error: "Enter Password"})
    } else{
        let isEmailExist = await user.find({email})
        if(isEmailExist.length > 0){
            bcrypt.compare(password, isEmailExist[0].password).then(function(result) {
                if(result){
                    res.send({
                        success: "Login Successfull",
                        fullName: isEmailExist.fullName,
                        email: isEmailExist.email,
                    })
                } else{
                    res.json({error: "Password not match"})
                }
            });
        }
        else{
            res.json({error: "Email not match"})
        }
    }
    console.log(email, password)
}

module.exports = loginController