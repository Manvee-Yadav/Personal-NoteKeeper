// /frontend/src/pages/FlashcardsPage.jsx
import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Flashcards from "../components/Flashcards";

function FlashcardsPage() {
  const { notes } = useContext(NoteContext);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Flashcards</h1>
      <Flashcards notes={notes} />
    </div>
  );
}

export default FlashcardsPage;
