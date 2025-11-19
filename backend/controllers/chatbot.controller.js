import Note from "../models/note.model.js";
import { generateChatbotAnswer } from "../services/gemini.service.js";

export const chatbotController = async (req, res) => {
  try {
    const userId = req.user;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // Fetch all notes of the user
    const notes = await Note.find({ user: userId });

    if (notes.length === 0) {
      return res.json({ answer: "You do not have any notes yet!" });
    }

    // Merge notes text
    const combinedContent = notes
      .map(
        (n) =>
          `Heading: ${n.heading}\n` +
          n.sections
            .map((s) => `Subheading: ${s.subheading}\nContent: ${s.content}`)
            .join("\n")
      )
      .join("\n\n");

    // Generate AI answer
    const answer = await generateChatbotAnswer(question, combinedContent);

    res.json({ answer });
  } catch (err) {
    res.status(500).json({ message: "Chatbot error", error: err.message });
  }
};
