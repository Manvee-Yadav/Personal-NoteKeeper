import express from "express";
import {createNotes,getNotes,searchNotes,updateNote,deleteNote} from "../controllers/note.controller.js";
import { generateQuiz, generateFlashcards } from "../controllers/note.controller.js";
const router = express.Router();

// ✅ Create a new note
// POST /notes/create
router.post("/create-note", createNotes);

// ✅ Get all notes
// GET /notes
router.get("/get-notes", getNotes);

// ✅ Search notes by keyword
// GET /notes/search/:keyword
router.get("/search/:keyword", searchNotes);

// ✅ Update note by ID
// PUT /notes/:id
router.put("/update-note/:id", updateNote);

// ✅ Delete note by ID
// DELETE /notes/:id
router.delete("/delete-note/:id", deleteNote);

router.post("/generate-quiz/:id", generateQuiz);
router.post("/generate-flashcards/:id", generateFlashcards);

export default router;


