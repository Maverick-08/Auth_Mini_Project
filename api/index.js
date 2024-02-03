import express from "express" 
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
// import userRoutes from "./routes/user.route";
import userRoute from "./routes/user.route.js"

mongoose.connect(process.env.MongoDb).then(()=>{console.log("Connected with database")}).catch((err)=>{console.log(err);})

const app = express()

// app.use("/api/user",userRoutes)
app.use("/api/user",userRoute)

app.listen(3000,()=>{console.log("Server is running");})