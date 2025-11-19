import { useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Createnote from './pages/Createnote';
import FlashcardsPage from "./pages/FlashcardsPage";
import Chatbot from './components/Chatbot';
import AuthPopup from "./components/AuthPopup";

function App() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      
      {/* PASS FUNCTION TO NAVBAR */}
      <Navbar onAuthOpen={() => setOpenAuth(true)} />

      <main className='flex-1 container mx-auto p-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createnote />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/chatbot" element={<Chatbot />} />

        </Routes>
      </main>

      <Footer />

      {/* AUTH POPUP HERE */}
      <AuthPopup 
        isOpen={openAuth}
        onClose={() => setOpenAuth(false)}
      />
    </div>
  );
}

export default App;
