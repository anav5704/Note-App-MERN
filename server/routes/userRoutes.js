import express from "express"
import {signup, login} from "../controllers/userController.js"

const userRoutes = express.Router()

userRoutes.post("/signup", signup)

userRoutes.post("/login", login)

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