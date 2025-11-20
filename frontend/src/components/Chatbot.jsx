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
    <div className="p-8 bg-gray-900 text-white rounded-xl max-w-3xl mx-auto shadow-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">AI Chatbot</h2>

      {/* Chat Window */}
      <div className="h-[500px] overflow-y-auto p-4 bg-gray-800 rounded-lg mb-6 border border-gray-700">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 my-3 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-600 ml-auto text-right"
                : "bg-green-600 mr-auto text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-3">
        <input
          className="flex-1 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
