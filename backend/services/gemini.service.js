// gemini.service.js

import axios from "axios";

export const generateChatbotAnswer = async (question, notes) => {
  
  // ✅ Access environment variables inside the function to ensure they are loaded
  const GEMINI_URL = process.env.GEMINI_URL;
  const API_KEY = process.env.API_KEY;

  if (!GEMINI_URL || !API_KEY) {
    console.error("Configuration Error: GEMINI_URL or API_KEY is missing!");
    return "Sorry, the AI service is not configured correctly.";
  }

  try {
    const prompt = `
      You are a helpful assistant for a note-taking app.

      NOTES:
      ${notes}

      USER QUESTION:
      ${question}

      If user asks:
      - "generate quiz on X topic" => create 5 MCQ quiz questions with correct answers labeled (e.g., A)
      - "explain X" => provide simple explanation
      - "summarize topic" => give a short summary
      - Anything else => answer using above notes only. If the notes do not contain the answer, state that you can only use the provided notes.
    `;

    // Robust Authentication: Sending API key in the 'x-goog-api-key' header
    const response = await axios.post(
      GEMINI_URL, 
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'x-goog-api-key': API_KEY, 
          'Content-Type': 'application/json'
        }
      }
    );

    // Safe extraction of the AI's generated text
    const output =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received from AI.";

    return output;
  } catch (err) {
    // Detailed Error Logging for debugging API failures (e.g., 401, 404, 429)
    console.error("--- START CHATBOT ERROR DETAILS ---");
    console.error("Chatbot answer error:", err.message);

    if (err.response) {
      console.error("HTTP Status Code:", err.response.status);
      console.error("API Error Data:", JSON.stringify(err.response.data));
    } else if (err.request) {
      console.error("No response received from the server (Network/Timeout issue).");
    }
    console.error("--- END CHATBOT ERROR DETAILS ---");

    // This is the message the user sees if the API request fails
    return "Sorry, I could not answer that.";
  }
};