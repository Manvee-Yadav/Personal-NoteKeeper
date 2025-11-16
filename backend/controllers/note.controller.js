import { generateQuizFromNote, generateFlashcardsFromNote } from "../services/gemini.service.js";
import Note from "../models/note.model.js";

export const createNotes=async(req,res)=>{
   try{
      const {heading,sections} =req.body
      if(!heading||!sections||sections.length===0){
        return res.status(400).json({message:"heading and atleast one section required"});
      }
      const newNote=new Note({heading,sections});
      await newNote.save();
      res.status(201).json(newNote)  //201 means http excuted successfuly and 1 or more resource created at server
   }
   catch(error){
     res.status(500).json({message:error.message})
   }
}

export const getNotes= async(req,res)=>{  //fetch all notes by latest date and update
  try{
    const notes = await Note.find().sort({ createdAt: -1, updatedAt: -1 });
    res.status(200).json(notes);
  }catch(error){
    res.status(500).json({message:error.message});
  }
};

export const searchNotes=async(req,res)=>{        //url should be like this:GET /notes/search/:keyword
//text based searching
  const keyword=req.params.keyword;
  if(!keyword){
    return res.status(400).json({message:"keyword is required"});
  }
  try{
    const notes=await Note.find({$text:{$search: keyword }}).sort({createdAt:-1});
    res.status(200).json(notes); 
  }
 catch(error){
  res.status(500).json({message:"notes not found"});
 }
};

// ✅ Update a note
export const updateNote = async (req, res) => {
  try {
    const { heading, sections } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { heading, sections },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quiz Generation
export const generateQuiz = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const fullText = `${note.heading}\n${note.sections.map(s => `${s.subheading}: ${s.content}`).join("\n")}`;
    const quiz = await generateQuizFromNote(fullText);

    res.status(200).json({ message: "Quiz generated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate quiz", error: error.message });
  }
};

// Flashcard Generation
export const generateFlashcards = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const fullText = `${note.heading}\n${note.sections.map(s => `${s.subheading}: ${s.content}`).join("\n")}`;
    const flashcards = await generateFlashcardsFromNote(fullText);

    res.status(200).json({ message: "Flashcards generated successfully", flashcards });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate flashcards", error: error.message });
  }
};
