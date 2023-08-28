dotenv.config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

const app = express()

const PORT = process.env.PORT
const URI = process.env.MONGO

app.use(cors())
app.use(express.json())
app.use(listener)

function listener(req, res, next){
    console.log(req.method, req.path)
    next()
}

async function Start(){
    try {   
        mongoose.connect(URI)
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    }
    catch(err){
        console.log("Server start error", err)
    }
}

Start()