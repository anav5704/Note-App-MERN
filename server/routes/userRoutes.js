import { signup, login } from "../controllers/userController.js"
import express from "express"

const userRoutes = express.Router()

userRoutes.post("/signup", signup)

userRoutes.post("/login", login)

export default userRoutes