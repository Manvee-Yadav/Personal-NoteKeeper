import Note from "../models/note.model.js";

/*
  -------------------------------
  CREATE A NEW NOTE (User-Specific)
  -------------------------------
  • Requires user to be logged in
  • req.user contains the userId (added by authMiddleware)
  • Saves note with "user" field so notes are separated by account
*/
export const createNotes = async (req, res) => {
  try {
    const { heading, sections } = req.body;
    const userId = req.user; // Logged-in user's ID

    // Basic validation
    if (!heading || !sections || sections.length === 0) {
      return res
        .status(400)
        .json({ message: "Heading and at least one section are required" });
    }

    // Create note linked to that user
    const note = await Note.create({
      heading,
      sections,
      user: userId,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error while creating note" });
  }
};

/*
  -------------------------------
  GET ALL NOTES OF LOGGED-IN USER
  -------------------------------
  • Notes are filtered by user ID
  • Ensures users cannot see other people's notes
*/
export const getNotes = async (req, res) => {
  try {
    const userId = req.user;

    const notes = await Note.find({ user: userId }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching notes" });
  }
};

/*
  ---------------------------------
  GET SINGLE NOTE BY ID (User-specific)
  ---------------------------------
*/
export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user, // user must own this note
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching note" });
  }
};


/*
  ---------------------------------
  SEARCH NOTES OF LOGGED-IN USER
  ---------------------------------
  • Performs case-insensitive search on note heading
  • Only returns notes created by that user
*/
export const searchNotes = async (req, res) => {
  try {
    const userId = req.user;
    const keyword = req.params.keyword;

    if (!keyword) {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    const notes = await Note.find({
      user: userId,
      heading: { $regex: keyword, $options: "i" }, // case-insensitive search
    });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error while searching notes" });
  }
};

/*
  -------------------------------
  UPDATE A NOTE
  -------------------------------
  • Only updates if:
      1. Note exists
      2. Note belongs to the logged-in user
  • Prevents modifying other users’ notes
*/
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // Only your note
      req.body,
      { new: true } // Return updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or not yours" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating note" });
  }
};

/*
  -------------------------------
  DELETE A NOTE
  -------------------------------
  • Deletes only if:
      1. Note exists
      2. Note belongs to the logged-in user
  • Avoids deleting other users’ notes
*/
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found or not yours" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting note" });
  }
};



