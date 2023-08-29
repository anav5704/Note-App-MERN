import express from "express"

const userRoutes = express.Router()

userRoutes.get("/", (req, res) => {
    res.status(200).json({message: "Got all users"})
})

userRoutes.route("/:id")
.get((req, res) => {
    const id = req.params.id
    res.status(200).json({message: `Got user with id ${id}`})
})

.delete((req, res) => {
    const id = req.params.id
    res.status(200).json({message: `Deleted user with id ${id}`})
})

.put((req, res) => {
    const id = req.params.id
    res.status(200).json({message: `Updated user with id ${id}`})
})

export default userRoutes