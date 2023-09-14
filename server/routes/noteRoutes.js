import express from "express"
import requreAuth from "../middleware/requireAuth.js"
import { getAllNotes, getOneNote, createNote, updateNote, deleteNote } from "../controllers/noteController.js"

const noteRoutes = express.Router()
noteRoutes.use(requreAuth)

noteRoutes.get("/", getAllNotes)

noteRoutes.route("/:id")
.get(getOneNote)

.post(createNote)

.put(updateNote)

.delete(deleteNote)


export default noteRoutes