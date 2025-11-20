import { useEffect, useState, useContext } from "react";
import { BACKEND_URL } from "../api/url";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { token } = useContext(AuthContext); // ✅ Get token from context

  useEffect(() => {
    if (!token) return; // Wait until token loads

    BACKEND_URL.get("/get-notes", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token
      },
    })
      .then((res) => setNotes(res.data))
      .catch((err) => console.log("Error fetching notes", err));
  }, [token]);

  if (notes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">No notes available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-gray-800 p-4 rounded-lg shadow-lg relative"
          style={{ height: "300px", overflow: "hidden" }}
        >
          <h2 className="text-xl font-semibold mb-2 text-white">
            {note.heading}
          </h2>

          <p className="text-gray-300">
            {note.sections[0]?.content?.slice(0, 150)}...
          </p>

          <a
            href={`/note/${note._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 bg-blue-600 px-3 py-1 rounded text-white"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
}
