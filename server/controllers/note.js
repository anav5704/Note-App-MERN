import {noteModel} from "../models/note.js"
import mongoose from "mongoose"

async function getAllNotes(req, res){
    try{
        // const id = req.user._id
        const notes = await noteModel.find({}) 
        res.status(200).json(notes)
    }
    catch(err){
        req.status(400).json(err.message)
    }
}

async function getOneNote(req, res){
    try{
        const {id} = await req.params
        if(mongoose.Types.ObjectId.isValid({_id : id})) {
            return req.status(404).json({error: "Document Does not exits"})
        }

        const note = await noteModel.findById(id)
        if (!note){
            return req.status(400).json({error: "No Such Document"})
        }

        res.status(200).json(note)
    }
    catch(err){
        req.status(400).json(err.message)
    }
}

async function createNote(req, res){
    const {title, tags, content} = req.params

    let missing = []
    if(!title) missing.push("Title")
    if(!tags) missing.push("Tags")
    if(!content) missing.push("Content")
    
    if(missing.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", missing})
    }

    try{
        // const id = req.user._id
        const note = await noteModel.create({title, tags, content }) // add "owner: id" to argumets
        res.status(200).json(note)
    }
    catch(err){
        req.status(400).json(err.message)
    }
}

async function deleteNote(req, res){
    try{
        const {id} = await req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "Document Does not exits"})
        }

        const note = noteModel.findByIdAndDelete({_id: id})
        if(!note){
            return res.status(400).json({error: "No Such Document"})
        }

        res.status(200).json(note)
    }
    catch(err){
        req.status(400).json(err.message)
    }
}

async function updateNote(req, res){
    try{
        const {id} = await req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "Document Does not exits"})
        }

        const note = noteModel.findByIdAndUpdate({_id: id}, {...req.body})
        if(!note){
            return res.status(400).json({error: "No Such Document"})
        }

        res.status(200).json(note)
    }
    catch(err){
        req.status(400).json(err.message)
    }
}


export {getAllNotes, getOneNote, createNote, updateNote, deleteNote}