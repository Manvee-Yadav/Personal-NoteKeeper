import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔹 Generate Quiz
export const generateQuizFromNote = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Generate 5 multiple choice questions from this text.
Each question should test understanding.
Return valid JSON only in this format:
{
  "quiz": [
    {
      "question": "string",
      "options": ["A","B","C","D"],
      "answer": "correct_option_text"
    }
  ]
}
Text:
${text}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    const parsed = JSON.parse(response);
    return parsed.quiz;
  } catch (error) {
    console.log("Error parsing Gemini output:", response);
    throw new Error("Invalid response from Gemini");
  }
};

// 🔹 Generate Flashcards
export const generateFlashcardsFromNote = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Create flashcards from the following text.
Each flashcard should have a term and a short definition.
Return valid JSON only in this format:
{
  "flashcards": [
    {"term": "Term", "definition": "Definition"}
  ]
}
Text:
${text}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    const parsed = JSON.parse(response);
    return parsed.flashcards;
  } catch (error) {
    console.log("Error parsing Gemini output:", response);
    throw new Error("Invalid response from Gemini");
  }
};
