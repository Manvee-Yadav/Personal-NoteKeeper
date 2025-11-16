import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

function Notecard({ note }) {
  const {deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    heading: note.heading,
    sections: note.sections.map(section => ({
      subheading: section.subheading,
      content: section.content
    }))
  });

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...editData.sections];//make copy of section data
    updatedSections[index][field] = value; //index-which section to be chnages //field-subheading or content whpm to chnage
    setEditData({ ...editData, sections: updatedSections });/*...editData → keeps other parts of editData (like heading) the same.
sections: updatedSections → replaces old sections with the updated ones  */
  };

  const handleUpdate = () => {
    if (!editData.heading.trim()) return;
    updateNote(note._id, editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            className="border rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                className="border rounded-lg p-2 w-full mb-1 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={section.subheading}
                onChange={(e) =>
                  handleSectionChange(idx, "subheading", e.target.value)
                }
                placeholder="Subheading"
              />
              <textarea
                rows="3"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {note.heading}
          </h2>
          {note.sections.map((section, idx) => (
            <div key={idx} className="mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {section.subheading}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
            </div>
          ))}

          {/* Footer: date + actions */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>
              {note.createdAt
                ? new Date(note.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "No date"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Notecard;
