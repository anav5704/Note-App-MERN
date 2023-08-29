import mongoose from "mongoose"

const userModel = new mongoose.Schema({
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

export default userModel

