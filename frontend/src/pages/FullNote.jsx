import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../api/url";
import { useParams } from "react-router-dom";

function FullNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const token = localStorage.getItem("token"); // ✅ get token

  useEffect(() => {
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }

    BACKEND_URL.get(`/get-note/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send token to backend
      },
    })
      .then((res) => setNote(res.data))
      .catch((err) => console.log("Error loading note", err));
  }, [id, token]);

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-800 p-6 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">{note.heading}</h1>

      {note.sections.map((sec, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            {sec.subheading}
          </h2>
          <p className="text-gray-300 whitespace-pre-line">{sec.content}</p>
        </div>
      ))}

      <button
        onClick={() => window.close()}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Close Tab
      </button>
    </div>
  );
}

export default FullNote;
