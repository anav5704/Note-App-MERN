import express from "express"

const noteRoutes = express.Router()

noteRoutes.get("/", (req, res) => {
    res.status(200).json({message: "Got all notes"})
})

noteRoutes.route("/:id")
.get((req, res) => {
    const id = req.params.id
    res.status(200).json({message: `Got note with id ${id}`})
})

.delete((req, res) => {
    const id = req.params.id
    res.status(200).json({message: `Deleted note with id ${id}`})
})

.put((req, res) => {
    const id = req.params.id
    res.status(200).json({message: `Updated note with id ${id}`})
})

export default noteRoutes