import { createContext, useEffect, useState, useContext } from "react";
import { BACKEND_URL } from "../api/url";
import { AuthContext } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch notes
  const getNotes = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const response = await BACKEND_URL.get("/get-notes", authHeader());
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Create Note
  const createNote = async (note) => {
    if (!token) {
      alert("Please login first to create a note.");
      return;
    }

    try {
      const res = await BACKEND_URL.post("/create-note", note, authHeader());
      setNotes((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // 🟡 Update Note
  const updateNote = async (id, updatedNote) => {
    if (!token) {
      alert("Please login first to update a note.");
      return;
    }

    try {
      const res = await BACKEND_URL.put(
        `/update-note/${id}`,
        updatedNote,
        authHeader()
      );

      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // 🔴 Delete Note
  const deleteNote = async (id) => {
    if (!token) {
      alert("Please login first to delete a note.");
      return;
    }

    try {
      await BACKEND_URL.delete(`/delete-note/${id}`, authHeader());
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // 🔍 Search Notes
  const searchNotes = async (keyword) => {
    if (!token) {
      alert("Please login first to search notes.");
      return;
    }

    if (!keyword.trim()) {
      getNotes();
      return;
    }

    try {
      const res = await BACKEND_URL.get(`/search/${keyword}`, authHeader());
      setNotes(res.data);
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  };

  // 🔄 Handle login/logout
  useEffect(() => {
    if (token) {
      getNotes();   // Load notes on login
    } else {
      setNotes([]); // Clear notes on logout
    }
  }, [token]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        updateNote,
        deleteNote,
        searchNotes,
        getNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
