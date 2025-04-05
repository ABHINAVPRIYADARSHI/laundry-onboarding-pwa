import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProviderForm from "./components/ProviderForm";
import AdminPanel from "./components/AdminPanel";
import A2HSButton from "./components/A2HSButton";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-4 sm:p-8">
        {/* Floating Background Bubbles */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-pink-400 rounded-full opacity-30 animate-bounce-slow" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-bounce-slow" />

        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 mb-10 relative z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
              Laundry Studio
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex space-x-4">
              <Link to="/" className="nav-btn">Home</Link>
              <Link to="/admin" className="nav-btn">Admin</Link>
            </nav>

            {/* Mobile Hamburger */}
            <div className="sm:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className="focus:outline-none text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Side Drawer Menu (Left) */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setMenuOpen(false)}>
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              className="py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Routes */}
        <div className="max-w-4xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-6 sm:p-10 relative z-10">
          <Routes>
            <Route path="/" element={<ProviderForm />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <A2HSButton />
      </main>
    </Router>
  );
}

export default App;
