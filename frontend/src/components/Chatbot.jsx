import React, { useState } from "react";
import { CHATBOT_URL } from "../api/url";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await CHATBOT_URL.post(
        "ask",
        { question: input },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const botMessage = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting chatbot" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">AI Chatbot</h2>

      <div className="h-64 overflow-y-auto p-3 bg-gray-800 rounded-lg mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-600 self-end"
                : "bg-green-600"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-700 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="px-4 bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
