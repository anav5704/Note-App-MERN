import express from "express"
import { getAllNotes, getOneNote, createNote, updateNote, deleteNote } from "../controllers/note.js"

const noteRoutes = express.Router()

noteRoutes.get("/", getAllNotes)

noteRoutes.route("/:id")
.get(getOneNote)

.post(createNote)

.put(updateNote)

.delete(deleteNote)


export default noteRoutes