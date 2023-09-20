import { noteModel } from "../models/noteModel.js"
import mongoose from "mongoose"

const checkMissingFields = (req) => {
    const { title, content } = req.body

    let missing = []
    if (!title) missing.push("Title")
    if (!content) missing.push("Content")

    if (missing.length > 0) {
        throw Error("Please fill in all the fields", missing)
    }
}

async function getAllNotes(req, res) {
    const { sortCriteria, sortBy } = req.query
    let sort = {}

    switch (sortCriteria) {
        case "createdAt": {
            sort = { "createdAt": sortBy }
            break;
        }
        case "updatedAt": {
            sort = { "updatedAt": sortBy }
            break;
        }
        case "title": {
            sort = { "title": sortBy }
            break;
        }
    }

    try {
        const id = req.user._id
        const notes = await noteModel.find({ owner: id }).sort(sort)
        res.status(200).json(notes)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

async function getOneNote(req, res) {
    try {
        const { id } = await req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Document Does not exist" })
        }

        const note = await noteModel.findById(id)
        if (!note) {
            return res.status(400).json({ error: "No Such Document" })
        }

        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

async function createNote(req, res) {
    const { title, content } = req.body
    try {
        checkMissingFields(req)
        const id = req.user._id
        const note = await noteModel.create({ title, content, owner: id })
        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

async function updateNote(req, res) {
    try {
        checkMissingFields(req)
        const { id } = await req.params
        const { title, content } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Document Does not exist" })
        }

        const note = await noteModel.findByIdAndUpdate({ _id: id }, { title, content })

        if (!note) {
            return res.status(400).json({ error: "No Such Document" })
        }

        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}


async function deleteNote(req, res) {
    try {
        const { id } = await req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Document Does not exist" })
        }

        const note = await noteModel.findByIdAndDelete({ _id: id })
        if (!note) {
            return res.status(400).json({ error: "No Such Document" })
        }

        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

export { getAllNotes, getOneNote, createNote, updateNote, deleteNote }