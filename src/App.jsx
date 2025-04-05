import React, { useState } from "react";
import ProviderForm from "./components/ProviderForm";
import { Menu, X } from "lucide-react";

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-4 sm:p-8">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-400 rounded-full opacity-30 animate-bounce-slow" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-bounce-slow" />

      {/* Responsive Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 mb-10 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
            Laundry Studio
          </h1>

          {/* Desktop nav */}
          <nav className="hidden sm:flex space-x-4">
            <button className="nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Home
            </button>
            <button className="nav-btn">About Us</button>
            <button className="nav-btn">Contact</button>
          </nav>

          {/* Mobile menu icon */}
          <div className="sm:hidden">
            <button onClick={() => setNavOpen(!navOpen)}>
              {navOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {navOpen && (
          <nav className="sm:hidden mt-4 flex flex-col items-start space-y-2">
            <button className="nav-btn w-full text-left">Home</button>
            <button className="nav-btn w-full text-left">About Us</button>
            <button className="nav-btn w-full text-left">Contact</button>
          </nav>
        )}
      </header>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.01] hover:shadow-3xl relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-500">
          🧺 Register Your Laundry Service
        </h2>
        <ProviderForm />
      </div>
    </main>
  );
}

export default App;
