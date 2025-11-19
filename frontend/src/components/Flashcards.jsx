import React, { useState, useEffect } from "react";

function Flashcards({ notes }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [showContent, setShowContent] = useState(false);

  // Flatten all sections once when notes change
  const allSections = notes.flatMap((note) =>
    note.sections.map((section) => ({
      heading: note.heading,
      subheading: section.subheading,
      content: section.content,
    }))
  );

  // Pick a random section
  const getRandomCard = () => {
    if (allSections.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allSections.length);
    return allSections[randomIndex];
  };

  useEffect(() => {
    setCurrentCard(getRandomCard());
    setShowContent(false);
  }, [notes]);

  const handleNext = () => {
    setCurrentCard(getRandomCard());
    setShowContent(false); // Hide content for new card
  };

  if (!currentCard) return <p className="text-white">No notes available for flashcards.</p>;

  return (
    <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-lg text-white flex flex-col items-center gap-6">
      <h2 className="text-xl font-bold text-blue-400">{currentCard.heading}</h2>
      <h3 className="text-lg font-semibold">{currentCard.subheading}</h3>
      {showContent && <p className="text-gray-200 transition-all">{currentCard.content}</p>}

      <div className="flex gap-4">
        <button
          onClick={() => setShowContent((prev) => !prev)}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
        >
          {showContent ? "Hide" : "Show"} Content
        </button>

        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
        >
          Next Card
        </button>
      </div>
    </div>
  );
}

export default Flashcards;
