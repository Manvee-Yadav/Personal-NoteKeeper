import axios from "axios"

export const BACKEND_URL=axios.create({
    baseURL:"http://localhost:4001/noteapp/"
})

// AUTH API BASE URL
export const AUTH_URL = axios.create({
  baseURL: "http://localhost:4001/auth/"
});

// CHATBOT API BASE URL
export const CHATBOT_URL = axios.create({
  baseURL: "http://localhost:4001/chatbot/"
});