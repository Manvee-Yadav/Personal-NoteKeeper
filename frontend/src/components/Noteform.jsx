import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteForm() {
  const { createNote } = useContext(NoteContext);

  const [note, setNote] = useState({
    heading: "",
    sections: [
      { subheading: "", content: "" } // start with one empty section
    ]
  });

  // Update heading
  const handleHeadingChange = (e) => {
    setNote({ ...note, heading: e.target.value });
  };

  // Update section field
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...note.sections];
    updatedSections[index][field] = value;
    setNote({ ...note, sections: updatedSections });
  };

  // Add a new section
  const addSection = () => {
    setNote({
      ...note,
      sections: [...note.sections, { subheading: "", content: "" }]
    });
  };

  // Remove a section
  const removeSection = (index) => {
    const updatedSections = note.sections.filter((_, i) => i !== index);
    setNote({ ...note, sections: updatedSections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.heading || note.sections.length === 0) return;

    // Optional: Remove empty sections
    const filteredNote = {
      ...note,
      sections: note.sections.filter(
        (s) => s.subheading.trim() || s.content.trim()
      )
    };

    createNote(filteredNote);
    // Reset form
    setNote({ heading: "", sections: [{ subheading: "", content: "" }] });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Create a New Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Heading */}
        <input
          type="text"
          placeholder="Enter main heading..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          value={note.heading}
          onChange={handleHeadingChange}
        />

        {/* Sections */}
        {note.sections.map((section, idx) => (
          <div key={idx} className="border p-4 rounded-lg bg-gray-700 relative">
            <input
              type="text"
              placeholder="Subheading"
              className="w-full px-3 py-2 rounded-lg mb-2 bg-gray-600 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={section.subheading}
              onChange={(e) =>
                handleSectionChange(idx, "subheading", e.target.value)
              }
            />
            <textarea
              placeholder="Content"
              rows="3"
              className="w-full px-3 py-2 rounded-lg bg-gray-600 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={section.content}
              onChange={(e) =>
                handleSectionChange(idx, "content", e.target.value)
              }
            />
            {note.sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(idx)}
                className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        {/* Add Section Button */}
        <button
          type="button"
          onClick={addSection}
          className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          + Add Section
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
