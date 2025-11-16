import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import router from "./routes/note.route.js";

const app = express()
dotenv.config()
const port = process.env.PORT || 4002

// Database Connection Code
try {
   mongoose.connect(process.env.MONGO_URL)
   console.log("conntected to MongoDB")
} catch (error) {
    console.log("Error connecting to MongoDB", error)
}

// Routing Middleware
app.use(express.json())
app.use(cors())
app.use("/noteapp", router); // Mount notes router

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})


