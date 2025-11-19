import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AUTH_URL } from "../api/url";

function AuthPopup({ isOpen, onClose }) {
  const [tab, setTab] = useState("login");
  const { loginUser } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());

    const url = tab === "login" ? "login" : "signup";

    try {
      const res = await AUTH_URL.post(url, payload);

      if (tab === "login") {
        loginUser(res.data);
        onClose();
      } else {
        alert("Account created! You can now login.");
        setTab("login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-white"
        >
          ✖
        </button>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 justify-center">
          <button
            onClick={() => setTab("login")}
            className={`px-4 py-2 rounded ${
              tab === "login" ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`px-4 py-2 rounded ${
              tab === "signup" ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "signup" && (
            <input
              name="name"
              required
              placeholder="Full Name"
              className="w-full p-2 bg-gray-700 rounded"
            />
          )}

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full p-2 bg-gray-700 rounded"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full p-2 bg-gray-700 rounded"
          />

          <button className="bg-blue-600 w-full py-2 rounded font-semibold">
            {tab === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPopup;
