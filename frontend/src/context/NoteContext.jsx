import { createContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../api/url"; // ✅ use named import if you exported as named

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/get-notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ✅ Create a new note
  const createNote = async (note) => {
    try {
      const res = await BACKEND_URL.post("/create-note", note);
      setNotes((prev) => [res.data, ...prev]); // add new note at top
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // ✅ Update a note
  const updateNote = async (id, updatedNote) => {
    try {
      const res = await BACKEND_URL.put(`/update-note/${id}`, updatedNote);
      setNotes((prev) => prev.map((note) => (note._id === id ? res.data : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // ✅ Delete a note
  const deleteNote = async (id) => {
    try {
      await BACKEND_URL.delete(`/delete-note/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✅ Search notes (heading + subheading + content)
  const searchNotes = async (keyword) => {
    if (!keyword.trim()) {
      getNotes(); // if search is empty, return all notes
      return;
    }
    try {
      const res = await BACKEND_URL.get(`/search/${keyword}`);
      setNotes(res.data);
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        updateNote,
        deleteNote,
        searchNotes,
        getNotes, // expose getNotes in case you want to refresh manually
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
