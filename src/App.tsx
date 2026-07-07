// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Experience from "./components/Experience";
// import Education from "./components/Education";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import AddProjectForm from "./components/AddProjectForm";

// export default function App() {
//   // 1. State to toggle the Admin Panel (Add Project Form)
//   const [isAdmin, setIsAdmin] = useState<boolean>(false);

//   // 2. State to trigger instant updates across components
//   const [refreshSignal, setRefreshSignal] = useState<number>(0);

//   // Function to increment the signal, telling other components to "re-fetch" data
//   const triggerRefresh = () => setRefreshSignal((prev) => prev + 1);

//   return (
//     <div className="relative min-h-screen bg-slate-50 text-gray-800 antialiased font-sans selection:bg-gray-900 selection:text-white">
//       {/* Dynamic Global Navbar */}
//       <Navbar />

//       {/* Main Single Page Layout Content */}
//       <main className="relative">
        
//         {/* Intro Hero view */}
//         <Hero />

//         {/* Dynamic separator */}
//         <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//         {/* About Me Section Anchor */}
//         <div id="aboutMe" className="relative">
//           <section className="py-20 bg-white relative">
//             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
//               <div className="md:col-span-4">
//                 <span className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
//                   Introduction
//                 </span>
//                 <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 leading-tight">
//                   About Soth Vannak RothChansokhomal
//                 </h2>
//               </div>
//               <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm">
//                 <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
//                   I'm a motivated first-year student pursuing a double major in{" "}
//                   <strong className="text-gray-900">Software Engineering</strong> and{" "}
//                   <strong className="text-gray-900">Business Information Systems</strong>.
//                   I am deeply passionate about digital innovation, public speaking, and community
//                   engagement through sustainable technology solutions. My key strengths include strong
//                   leadership, technical problem solving, and cross-cultural communication skills.
//                 </p>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
//                   <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-sm">
//                     <p className="font-sans text-lg font-extrabold text-gray-950">2</p>
//                     <p className="text-[10px] text-gray-500 font-medium">Year Student</p>
//                   </div>
//                   <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-sm">
//                     <p className="font-sans text-lg font-extrabold text-gray-950">6+</p>
//                     <p className="text-[10px] text-gray-500 font-medium">Handcrafted Projects</p>
//                   </div>
//                   <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-sm">
//                     <p className="font-sans text-lg font-extrabold text-gray-950">4</p>
//                     <p className="text-[10px] text-gray-500 font-medium">Scholarships Won</p>
//                   </div>
//                   <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-sm">
//                     <p className="font-sans text-lg font-extrabold text-gray-950">100%</p>
//                     <p className="text-[10px] text-gray-500 font-medium">Commitment Intern</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Dynamic separator */}
//         <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//         {/* Core skills module */}
//         <Skills />

//         {/* Dynamic separator */}
//         <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//         {/* Full Interactive Projects Grid - Pass the signal to listen for changes */}
//         <Projects isAdmin={isAdmin} refreshSignal={refreshSignal} />

//         {/* Floating Admin Toggle Button - Requirement 8 */}
//         <div className="fixed bottom-10 right-10 z-50">
//           <button 
//             onClick={() => setIsAdmin(!isAdmin)}
//             className={`shadow-2xl px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer ${
//               isAdmin 
//               ? "bg-red-500 text-white border-red-600 hover:bg-red-600" 
//               : "bg-white text-gray-600 border-slate-200 hover:border-gray-900 hover:text-gray-900"
//             }`}
//           >
//             {isAdmin ? "✕ Close Admin Panel" : "Manage Portfolio"}
//           </button>
//         </div>

//         {/* Conditional Rendering of the Admin Form - Pass trigger function */}
//         {isAdmin && (
//           <div className="bg-slate-100 border-y border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
//              <AddProjectForm onProjectAdded={triggerRefresh} />
//           </div>
//         )}

//         {/* Dynamic separator */}
//         <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//         {/* Timeline representation for experiences */}
//         <Experience />

//         {/* Dynamic separator */}
//         <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//         {/* Academic summary cards */}
//         <Education />

//         {/* Dynamic separator */}
//         <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//         {/* Contact form - Requirement 4.1.F */}
//         <Contact />

//       </main>

//       {/* Global footer */}
//       <Footer />
//     </div>
//   );
// }







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