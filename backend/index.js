// index.js

import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

// 1. MUST BE THE FIRST EXECUTABLE LINE
dotenv.config();

// 2. NOW SAFELY IMPORT ALL APPLICATION ROUTES/SERVICES
//    (These files can now access the variables loaded in step 1)
import router from "./routes/note.route.js";
import chatbotRoute from "./routes/chatbot.route.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();
const port = process.env.PORT || 4001;

// --- Your middleware and setup ---

// ✅ CORS FIX (Important)
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend
    credentials: true,               // allow cookies / token
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
try {
  mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true, // Deprecated, can remove
    // useUnifiedTopology: true, // Deprecated, can remove
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

// Routes
app.use("/noteapp", router);
app.use("/chatbot", chatbotRoute);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});