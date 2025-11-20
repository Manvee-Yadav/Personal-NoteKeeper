import express from "express";
import {
  createNotes,
  getNotes,
  getSingleNote,
  searchNotes,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-note", auth, createNotes);
router.get("/get-notes", auth, getNotes);
router.get("/get-note/:id", auth, getSingleNote);
router.get("/search/:keyword", auth, searchNotes);
router.put("/update-note/:id", auth, updateNote);
router.delete("/delete-note/:id", auth, deleteNote);

export default router;
