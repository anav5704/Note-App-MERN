import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
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

export const noteModel = mongoose.model("User", noteSchema )



