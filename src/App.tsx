import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-gray-800 antialiased font-sans selection:bg-gray-900 selection:text-white">
      {/* Dynamic Global Navbar */}
      <Navbar />

      {/* Main Single Page Layout Content */}
      <main className="relative">
        
        {/* Intro Hero view */}
        <Hero />

        {/* Dynamic separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* About Me Section Anchor */}
        <div id="aboutMe" className="relative">
          {/* We've embedded her about info into Hero for natural Apple landing flows,
              but let's make an elegant, fast-access highlights panel to serve as the AboutMe anchor */}
          <section className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-4">
                <span className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Introduction
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 leading-tight">
                  About Soth Vannak RothChansokhomal
                </h2>
              </div>
              <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-3xs">
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                  I'm a motivated first-year student pursuing a double major in{" "}
                  <strong className="text-gray-900">Software Engineering</strong> and{" "}
                  <strong className="text-gray-900">Business Information Systems</strong>.
                  I am deeply passionate about digital innovation, public speaking, and community
                  engagement through sustainable technology solutions. My key strengths include strong
                  leadership, technical problem solving, and cross-cultural communication skills.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
                  <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-3xs">
                    <p className="font-sans text-lg font-extrabold text-gray-950">2</p>
                    <p className="text-[10px] text-gray-500 font-medium">Year Student</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-3xs">
                    <p className="font-sans text-lg font-extrabold text-gray-950">6+</p>
                    <p className="text-[10px] text-gray-500 font-medium">Handcrafted Projects</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-3xs">
                    <p className="font-sans text-lg font-extrabold text-gray-950">4</p>
                    <p className="text-[10px] text-gray-500 font-medium">Scholarships Won</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-150/60 shadow-3xs">
                    <p className="font-sans text-lg font-extrabold text-gray-950">100%</p>
                    <p className="text-[10px] text-gray-500 font-medium">Commitment Intern</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Dynamic separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* Core skills module */}
        <Skills />

        {/* Dynamic separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* Full Interactive Projects Grid */}
        <Projects />

        {/* Dynamic separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* Timeline representation for experiences, leadership roles & volunteer history */}
        <Experience />

        {/* Dynamic separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* Academic summary bento cards for Education, scholarships & certificates */}
        <Education />

        {/* Dynamic separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* Contact form & socials handle connection centre */}
        <Contact />

      </main>

      {/* Corporate trademark global footer */}
      <Footer />
    </div>
  );
}
