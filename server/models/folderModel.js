import mongoose, { Schema } from "mongoose"

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
}, {timestamps: true});

export const folderModel = mongoose.model('Folder', folderSchema);
