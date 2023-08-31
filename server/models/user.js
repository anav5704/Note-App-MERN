import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

// User schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true, 
    }
})

// User functions
userSchema.statics.signup = async function(email, password){
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
    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("Missing email or password")
     }

     const user = await userModel.findOne({email})
     if(!user){
         throw Error("Incorrect email")
     }

     const matches = await bcrypt.compare(password, user.password)
     if(!matches){
         throw Error("Incorrect password")
     }

     return user
}

export const userModel = mongoose.model("User", userSchema)

