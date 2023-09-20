import mongoose, { Schema } from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

export const noteModel = mongoose.model("Note", noteSchema)