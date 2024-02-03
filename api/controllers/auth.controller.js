import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signUp = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)

    const user = new User({username,email,password:hashedPassword})

    try{
        await user.save()
        res.status(201).json({message:"New user added successfully"})
    }catch(err){
        next(err)
    }
}

export const signIn = async (req,res,next)=>{
    const {email,password} = req.body

    const validUser = await User.findOne({email})
    if(!validUser) return next(errorHandler(404,"User not found"))

    const validPassword = bcryptjs.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(401,"Invalid Credentials"))

    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)

    delete validUser._doc.password

    res.cookie("accessToken",token,{httpOnly:true,expires: new Date(Date.now() + 60 * 60 * 1000)})

    res.json(validUser)
}