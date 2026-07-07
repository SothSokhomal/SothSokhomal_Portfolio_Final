import React from "react";
import { Mail, Github, Linkedin, MapPin, Download, ChevronRight, Sparkles, BookOpen, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolioData";

// 1. IMPORT THE PDF FILE DIRECTLY
// Note: Ensure the filename matches exactly as seen in your src/img/ folder
import myResumePDF from "../img/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2).pdf";

export default function Hero() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Image Source
  const profileImageSrc = new URL("../img/Soth vannak rothchansokhomal.jpg", import.meta.url).href;

  // Scroll Helper
  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-slate-50/50"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="inline-flex mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] font-bold tracking-wider text-gray-700 uppercase">
                Available for Internship
              </span>
            </div>
          </motion.div>

          {/* Headline Name */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-xs font-semibold tracking-widest text-gray-500 uppercase block mb-2">
              {personalInfo.name}
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Hi, I am <span className="text-gray-950">Sokhomal</span>
            </h1>
            <h2 className="font-sans text-xl sm:text-2xl font-semibold text-gray-700 mt-3 flex items-center gap-2">
              {personalInfo.title}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-gray-500 font-medium text-lg sm:text-xl">React & Node.js Developer</span>
            </h2>
          </motion.div>

          {/* Academic Focus - Updated to Second-Year */}
          <motion.div variants={itemVariants} className="mt-4 p-4 rounded-2xl bg-white/60 border border-gray-100 backdrop-blur-md shadow-xs max-w-xl">
            <p className="font-sans text-xs font-medium text-gray-600 flex items-center gap-1.5 text-left">
              <BookOpen className="w-4 h-4 text-gray-800" />
              Double Major: <strong className="text-gray-900 font-semibold">Software Engineering</strong> & <strong className="text-gray-900 font-semibold">BIS</strong>
            </p>
            <p className="font-sans text-[11px] text-gray-500 mt-1 pl-5 text-left">
              Second-year student Cambodia University of Technology and Science (CamTech)
            </p>
          </motion.div>

          {/* Updated Bio paragraph from data */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm sm:text-base text-gray-600 mt-6 leading-relaxed max-w-xl text-left"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Location and Contact Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-y-3 gap-x-4 mt-6 text-xs text-gray-500 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Phnom Penh, Cambodia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-gray-400" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-gray-900 transition-colors">
                {personalInfo.email}
              </a>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleScrollToContact}
              className="px-8 py-4 bg-gray-950 text-white font-sans text-xs font-bold tracking-wider rounded-xl shadow-md hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              Contact Me
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* REAL DOWNLOAD BUTTON */}
            <a
              href={myResumePDF}
              download="Soth_Vannak_RothChansokhomal_CV.pdf"
              className="px-8 py-4 bg-white text-gray-800 font-sans text-xs font-bold tracking-wider rounded-xl border border-gray-200 shadow-xs hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-gray-500" />
              Download CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200/50 max-w-xs">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 transition-all">
              <Github className="w-4.5 h-4.5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 transition-all">
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[380px] lg:min-h-[500px]">
          
          {/* Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden p-3 bg-white/40 border border-white/60 shadow-xl backdrop-blur-md"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 group">
              <img
                src={profileImageSrc}
                alt="Soth Vannak RothChansokhomal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-sm">
                <span className="font-sans text-[10px] font-semibold text-gray-800">SothSokhomal Portfolio</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Floating statistics card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute bottom-6 sm:bottom-12 -right-4 sm:-right-8 z-20 px-4 py-3 rounded-xl bg-white/90 border border-gray-150/50 shadow-md backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-950 flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-500 font-bold tracking-wide uppercase">Software Eng.</p>
              <p className="text-xs font-bold text-gray-900">CamTech 2nd Year</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}