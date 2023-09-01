import jwt from "jsonwebtoken"
import {userModel} from "../models/user.js"

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

async function signup (req, res){
    const {email, password} = req.body
    try{
       const user = await userModel.signup(email, password)
       const token = createToken(user._id)
        res.status(200).json({message: "User registered successfully", user, token})
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

async function login (req, res){
    const {email, password} = req.body
    try{
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        return res.status(200).json({token, user})
    }
    catch(err){
        return res.status(400).json(err.message)
    }
}

export {signup, login}