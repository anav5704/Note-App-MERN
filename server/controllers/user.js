import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"
import {userModel} from "../models/user.js"

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

async function signup (req, res){
    const {email, password} = req.body
    const warnings = []
    try{
        if(!email || !password){
            throw Error("Missing email or password")
        }

        if(!validator.isEmail(email)){
            warnings.push("email")
            throw Error("Invalid email")
        }

        if(!validator.isStrongPassword(password)){
            warnings.push("password")
            throw Error("Password not strong enough")
        }

        const exists = await userModel.findOne({email})
        if(exists){
            warnings.push("email")
            throw Error("Email already in use")
        }

        if(warnings.length > 0){
            return res.status(400).json({error: "Please fill in all the feilds", warnings})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await userModel.create({email, password: hash})
        return res.status(200).json({message: "User registered successfully", user})
    }
    catch(err){
        return res.status(400).json({error: err.message, warnings})
    }
}

async function login (req, res){
    const {email, password} = req.body
    const warnings = []
    try{
        if(!email || !password){
           throw Error("Missing email or password")
        }

        const user = await userModel.findOne({email})
        if(!user){
            warnings.push("email")
            throw Error("Incorrect email")
        }

        const matches = await bcrypt.compare(password, user.password)
        if(!matches){
            warnings.push("password")
            throw Error("Incorrect password")
        }

        if(warnings.length > 0){
            return res.status(400).json({error: "Please fill in all the feilds", warnings})
        }

        const token = createToken(user._id)
        return res.status(200).json({token, user})
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}

export {signup, login}