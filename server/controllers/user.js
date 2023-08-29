import bcrypt from "bcrypt"
import validator from "validator"
import {userModel} from "../models/user.js"

async function signup (req, res){
    const {email, password} = req.body
    try{
        if(!email || !password){
           throw Error("Missing email or password")
        }

        if(!validator.isEmail(email)){
            throw Error("Invalid email")
        }

        if(!validator.isStrongPassword(password)){
            throw Error("Password not strong enough")
        }

        const exists = await userModel.findOne({email})
        if(exists){
            throw Error("Email already in use")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await userModel.create({email, password: hash})
        return res.status(200).json({message: "User registered successfully", user})
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}

export {signup}