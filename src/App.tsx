import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AddProjectForm from "./components/AddProjectForm";

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // 🚀 REFRESH SIGNAL: Increments to trigger useEffect in Projects.tsx
  const [refreshSignal, setRefreshSignal] = useState<number>(0);
  const triggerRefresh = () => setRefreshSignal((prev) => prev + 1);

  return (
    <div className="relative min-h-screen bg-slate-50 text-gray-800 antialiased font-sans">
      <Navbar />
      <main className="relative">
        <Hero />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        {/* Skills Section */}
        <Skills />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Pass isAdmin and signal to Projects */}
        <Projects isAdmin={isAdmin} refreshSignal={refreshSignal} />

        {/* Floating Admin Toggle Button */}
        <div className="fixed bottom-10 right-10 z-50">
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className={`shadow-2xl px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
              isAdmin ? "bg-red-500 text-white border-red-600" : "bg-white text-gray-600 border-slate-200 hover:text-gray-900"
            }`}
          >
            {isAdmin ? "✕ Close Admin View" : "Manage Portfolio"}
          </button>
        </div>

        {/* ADMIN PANEL: Form calls triggerRefresh after a successful POST */}
        {isAdmin && (
          <div className="bg-slate-100 border-y border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <AddProjectForm onProjectAdded={triggerRefresh} />
          </div>
        )}

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <Experience />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <Education />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}