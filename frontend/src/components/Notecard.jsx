import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

function Notecard({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    heading: note.heading,
    sections: note.sections.map((section) => ({
      subheading: section.subheading,
      content: section.content,
    })),
  });

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...editData.sections];
    updatedSections[index][field] = value;
    setEditData({ ...editData, sections: updatedSections });
  };

  const handleUpdate = () => {
    if (!editData.heading.trim()) return;
    updateNote(note._id, editData);
    setIsEditing(false);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col relative"
      style={{ height: "300px", overflow: "hidden" }}  // FIXED CARD HEIGHT
    >
      {isEditing ? (
        <>
          {/* ---------- EDIT MODE ---------- */}
          <input
            type="text"
            className="border rounded-lg p-2 w-full mb-3 bg-gray-700 text-white"
            value={editData.heading}
            onChange={(e) =>
              setEditData({ ...editData, heading: e.target.value })
            }
            placeholder="Main Heading"
          />

          {editData.sections.map((section, idx) => (
            <div key={idx} className="mb-3">
              <input
                type="text"
                className="border rounded-lg p-2 w-full mb-1 bg-gray-700 text-white"
                value={section.subheading}
                onChange={(e) =>
                  handleSectionChange(idx, "subheading", e.target.value)
                }
                placeholder="Subheading"
              />

              <textarea
                rows="2"
                className="border rounded-lg p-2 w-full bg-gray-700 text-white"
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(idx, "content", e.target.value)
                }
                placeholder="Content"
              />
            </div>
          ))}

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ---------- VIEW MODE (PREVIEW) ---------- */}
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {note.heading}
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            {note.sections[0]?.content.slice(0, 150)}...
          </p>

          {/* ---------- READ MORE LINK ---------- */}
          <a
            href={`/note/${note._id}`}
            target="_blank"
            className="absolute bottom-4 left-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
          >
            Read More
          </a>

          {/* ---------- EDIT + DELETE ---------- */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => deleteNote(note._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Notecard;
