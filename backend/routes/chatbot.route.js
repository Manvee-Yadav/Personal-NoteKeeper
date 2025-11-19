import express from "express";
import { chatbotController } from "../controllers/chatbot.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// User must be logged in
router.post("/ask", auth, chatbotController);

export default router;
