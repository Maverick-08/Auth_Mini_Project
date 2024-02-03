import express from "express" 
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

mongoose.connect(process.env.MongoDb).then(()=>{console.log("Connected with database")}).catch((err)=>{console.log(err);})

const app = express()

app.use(express.json())

app.use("/api/user",userRoute)

app.use("/api/auth",authRoute)

app.listen(3000,()=>{console.log("Server is running");})