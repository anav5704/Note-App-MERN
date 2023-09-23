import { userModel } from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

const signup = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            throw Error("Missing email or password")
        }

        if (!validator.isEmail(email)) {
            throw Error("Invalid email")
        }

        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough")
        }

        const exists = await userModel.findOne({ email })
        if (exists) {
            throw Error("Email already in use")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await userModel.create({ email, password: hash })
        const token = createToken(user._id)

        res.status(200).json({ message: "User registered successfully", user, token })
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            throw Error("Missing email or password")
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            throw Error("Incorrect email")
        }

        const matches = await bcrypt.compare(password, user.password)
        if (!matches) {
            throw Error("Incorrect password")
        }

        const token = createToken(user._id)
        return res.status(200).json({ token, user })
    }
    catch (err) {
        return res.status(400).json(err.message)
    }
}

export { signup, login }