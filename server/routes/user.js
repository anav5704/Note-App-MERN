import express from "express"
import {signup} from "../controllers/user.js"

const userRoutes = express.Router()

userRoutes.post("/signup", signup)

userRoutes.post("/login", async (req, res) => {
    res.status(200).json({message: "User logged in"})
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

export default userRoutes