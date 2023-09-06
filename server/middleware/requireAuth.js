import jwt from "jsonwebtoken"
import {userModel} from "../models/user.js"

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    
    if(!authorization){
        return res.status(401).json({error: "Auth token required"})
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await userModel.findOne({ _id }).select("_id")
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({error: "Request not suthorized"})
    }
}

export default requireAuth