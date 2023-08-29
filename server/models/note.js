import mongoose from "mongoose"

const noteModel = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    content: {
        type: Object,
        required: true, 
    },
    owner: {
        type: String, 
        required: true, 

    },
}, {timestamps: true})

export default noteModel

