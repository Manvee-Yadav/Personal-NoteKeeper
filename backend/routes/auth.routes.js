import express from "express";
import { signup, login, getUser } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Route (fetch logged-in user)
router.get("/me", auth, getUser);

export default router;
