import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  subheading: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  }
});

const noteSchema = new mongoose.Schema({
  heading: {   // main heading
    type: String,
    required: true,
    trim: true
  },
  sections: [sectionSchema], // array of subheadings + content
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true
});

// 🔹 Create text based indexing for faster searching
noteSchema.index({
  heading: "text",
  "sections.subheading": "text",
  "sections.content": "text"
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
