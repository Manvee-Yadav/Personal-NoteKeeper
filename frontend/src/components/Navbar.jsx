import { Link, useLocation } from "react-router-dom";
import { BookOpen, Search, X } from "lucide-react";
import { useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";

// 🔹 Auth imports
import { AuthContext } from "../context/AuthContext";
import AuthPopup from "./AuthPopup";

function Navbar() {
  const location = useLocation();
  const { searchNotes, getNotes } = useContext(NoteContext);

  // 🔹 Auth states
  const { user, logoutUser } = useContext(AuthContext);
  const [openAuth, setOpenAuth] = useState(false);

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) searchNotes(keyword);
  };

  const handleClear = () => {
    setKeyword("");
    getNotes();
  };

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-400" />
            <span className="text-2xl text-blue-400 tracking-wide">Personal NoteKeeper</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            <Link
              to="/"
              className={`hover:text-blue-400 transition ${
                location.pathname === "/" ? "text-blue-400 font-semibold" : "text-gray-300"
              }`}
            >
              Home
            </Link>

            <Link
              to="/create"
              className={`hover:text-blue-400 transition ${
                location.pathname === "/create" ? "text-blue-400 font-semibold" : "text-gray-300"
              }`}
            >
              Create Note
            </Link>

            <Link
              to="/flashcards"
              className={`hover:text-blue-400 transition ${
                location.pathname === "/flashcards" ? "text-blue-400 font-semibold" : "text-gray-300"
              }`}
            >
              Flashcards
            </Link>

            <Link to="/chatbot">Chatbot</Link>


            {/* 🔵 Auth Button */}
            {user ? (
              <button
                onClick={logoutUser}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setOpenAuth(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              >
                Login / Sign Up
              </button>
            )}

            {/* 🔍 Search Bar (Only on Home Page) */}
            {location.pathname === "/" && (
              <form onSubmit={handleSearch} className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="px-3 py-1 text-white bg-gray-700 placeholder-gray-400 focus:outline-none"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-2 flex items-center justify-center hover:text-gray-200"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 px-3 py-1 flex items-center justify-center hover:bg-blue-600"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Popup */}
      <AuthPopup isOpen={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
}

export default Navbar;
