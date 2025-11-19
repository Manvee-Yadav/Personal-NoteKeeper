# 📝 Personal NoteKeeper: The AI-Powered Study Assistant ✨

## Overview
**Personal NoteKeeper** is a secure, full-stack web application designed to help students and professionals manage their study notes effectively while leveraging Generative AI to accelerate learning. Beyond simple note-taking, it features a custom AI Chatbot that can summarize notes, explain complex concepts, and generate quizzes based solely on the user's saved content.

This project uses the **MERN stack** (MongoDB, Express, React, Node.js) and demonstrates integrating third-party APIs (like Google Gemini) into a user authentication system.

---

## 🚀 Key Features
- **Secure Authentication**: User signup and login powered by JWT (JSON Web Tokens).  
- **Structured Notes**: Create notes with headings and multiple sections (subheadings and content).  
- **CRUD Functionality**: Full Create, Read, Update, and Delete operations for all notes.  
- **AI Chatbot**: Context-aware chatbot powered by Gemini 2.5 Flash API.  
- **Contextual Q&A**: Answers questions based only on the user's saved notes.  
- **Study Tools**: Generates summaries, explanations, and 5-question multiple-choice quizzes on specific topics.  
- **Flashcards (Planned)**: Upcoming feature for spaced repetition and recall.  

---

## 💻 Tech Stack

| Category          | Technology                           | Purpose                                                   |
|------------------|-------------------------------------|-----------------------------------------------------------|
| Frontend         | React, Axios, CSS/Tailwind           | User interface, state management, and API calls          |
| Backend          | Node.js, Express                     | RESTful API creation and business logic                  |
| Database         | MongoDB, Mongoose                    | Flexible, document-based data storage                    |
| AI Integration   | Gemini 2.5 Flash API, Axios          | Generative AI processing for the chatbot feature        |
| Authentication   | JSON Web Tokens (JWT)                | Secure, stateless user authentication                   |
| Environment      | dotenv                               | Secure handling of environment variables                 |

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js v18+ and npm  
- MongoDB instance (local or Atlas)

### 1. Clone the Repository
```bash
git clone [YOUR_REPOSITORY_URL]
cd personal-notekeeper
2. Install Dependencies
Navigate to both the frontend and backend directories:

bash
Copy code
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
3. Configure Environment Variables
Create a .env file in the backend root directory:

env
Copy code
# MongoDB Connection String (from MongoDB Atlas or local)
MONGO_URL=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=a_strong_secret_key_for_jwt

# Gemini API Configuration
API_KEY=your_gemini_api_key_from_google_ai_studio
GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent

# Backend Port
PORT=4001
4. Run the Application
bash
Copy code
# Start Backend (from backend directory)
npm start  # or node index.js

# Start Frontend (from frontend directory)
npm start  # or npm run dev
The application will be available at http://localhost:5173.

🧠 Chatbot Commands (How to Use)
The custom AI chatbot uses your notes as context:

User Question	Chatbot Action
"summarize topic"	Provides a short summary of all your notes
"explain KMP algorithm"	Gives a simple explanation of the concept based on your notes
"generate quiz on KMP algorithm"	Creates a 5-question multiple-choice quiz on the topic
"What is the definition of string?"	Answers directly using the content of your notes

🤝 Contributing
Contributions are welcome! If you find a bug or have an improvement idea, please open an issue or submit a pull request.

