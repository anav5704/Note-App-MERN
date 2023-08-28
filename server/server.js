import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(listener)

function listener(req, res, next){
    console.log(req.method, req.path)
    next()
}

async function Start(){
    try {   
        mongoose.connect(process.env.MONGO)
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    }
    catch(err){
        console.log("Server start error", err)
    }
}

Start()