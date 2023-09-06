import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    tags: {
        type: Array,
        required: true, 
    },
    content: {
        type: String,
        required: true, 
    },
    owner: {
        type: String, 
        required: true, 

    },
}, {timestamps: true})

export const noteModel = mongoose.model("Note", noteSchema )



