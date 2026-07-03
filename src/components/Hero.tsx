import React, { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Download, ChevronRight, Sparkles, BookOpen, ExternalLink, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data/portfolioData";

export default function Hero() {
  const [showCVModal, setShowCVModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 as const,
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

  const blobVariants = {
    animate1: {
      borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
      rotate: [0, 120, 360],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    animate2: {
      borderRadius: ["50% 50% 30% 70% / 50% 60% 40% 50%", "30% 70% 70% 30% / 50% 30% 70% 50%", "50% 50% 30% 70% / 50% 60% 40% 50%"],
      rotate: [360, 180, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const handleDownloadCV = () => {
    // Reveal a beautiful modal showing her resume in visual format with a print/close trigger
    setShowCVModal(true);
  };

  const profileImageSrc = new URL("../img/Soth vannak rothchansokhomal.jpg", import.meta.url).href;

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
          {/* Badge */}
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
              Soth Vannak RothChansokhomal
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

          {/* Academic Focus */}
          <motion.div variants={itemVariants} className="mt-4 p-4 rounded-2xl bg-white/60 border border-gray-100 backdrop-blur-md shadow-xs max-w-xl">
            <p className="font-sans text-xs font-medium text-gray-600 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gray-800" />
              Double Major: <strong className="text-gray-900 font-semibold">Software Engineering</strong> & <strong className="text-gray-900 font-semibold">BIS</strong>
            </p>
            <p className="font-sans text-[11px] text-gray-500 mt-1 pl-5">
              First-Year Student at Cambodia University of Technology and Science (CamTech)
            </p>
          </motion.div>

          {/* Biography paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm sm:text-base text-gray-600 mt-6 leading-relaxed max-w-xl"
          >
            I am highly motivated, passionate about digital innovation, public speaking, and community engagement. I design structured, pixel-perfect front-ends and connect lightweight APIs. Let's build sustainable technology together!
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

          {/* Buttons CTA */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleScrollToContact}
              className="px-6 py-3 bg-gray-950 text-white font-sans text-xs font-bold tracking-wider rounded-xl shadow-md hover:bg-gray-800 hover:translate-y-[-1px] active:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer"
            >
              Contact Me
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadCV}
              className="px-6 py-3 bg-white text-gray-800 font-sans text-xs font-bold tracking-wider rounded-xl border border-gray-200 shadow-xs hover:bg-gray-50 hover:translate-y-[-1px] active:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-gray-500" />
              Download CV
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200/50 max-w-xs">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 hover:shadow-xs transition-all">
              <Github className="w-4.5 h-4.5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 hover:shadow-xs transition-all">
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 hover:shadow-xs transition-all">
              <span className="font-bold text-xs tracking-tight">IG</span>
            </a>
            <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 hover:shadow-xs transition-all">
              <span className="font-bold text-xs tracking-tight">FB</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Portrait & Glassmorphism blobs */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[380px] lg:min-h-[500px]">
          
          {/* Decorative rotating glassmorphic blobs */}
          <motion.div
            variants={blobVariants}
            animate="animate1"
            className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-amber-200/40 to-orange-100/40 top-10 right-4 z-0 filter blur-xl"
          />
          <motion.div
            variants={blobVariants}
            animate="animate2"
            className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-gray-200/40 to-slate-300/40 bottom-10 left-4 z-0 filter blur-xl"
          />

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
                className="w-full h-full object-cover grayscale-10 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent pointer-events-none" />
              
              {/* Apple-style floating badge inside frame */}
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
              <p className="text-xs font-bold text-gray-900">CamTech 2024 - Pres.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern simulated print-ready CV Modal */}
      <AnimatePresence>
        {showCVModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-gray-900 text-base">Curriculum Vitae</h3>
                  <p className="text-xs text-gray-500">Soth Vannak RothChansokhomal</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Print CV
                  </button>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Document Area */}
              <div className="overflow-y-auto p-8 text-left font-sans leading-relaxed text-gray-800">
                {/* Print Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-950">Soth Vannak RothChansokhomal</h1>
                    <p className="text-sm text-gray-600 font-medium mt-1">Software Developer Intern | React | JavaScript</p>
                    <p className="text-xs text-gray-500 mt-0.5">Phnom Penh, Cambodia | {personalInfo.phone}</p>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>Email:</strong> {personalInfo.email}</p>
                    <p><strong>GitHub:</strong> github.com/SothSokhomal</p>
                  </div>
                </div>

                {/* Print Sections */}
                <div className="space-y-6 mt-6">
                  {/* Summary */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-100 pb-1.5 mb-2">About Me</h4>
                    <p className="text-xs text-gray-600">{personalInfo.bio}</p>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-100 pb-1.5 mb-2">Education</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-start text-xs">
                          <strong className="text-gray-900">Cambodia University of Technology and Science (CamTech)</strong>
                          <span className="text-gray-500 font-medium">2024 - Present</span>
                        </div>
                        <p className="text-[11px] text-gray-600">Bachelor's Degree in Software Engineering (Double Major: SE & BIS)</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-start text-xs">
                          <strong className="text-gray-900">Australian Center for Education (ACE)</strong>
                          <span className="text-gray-500 font-medium">2016 - 2023</span>
                        </div>
                        <p className="text-[11px] text-gray-600">General English Program</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-100 pb-1.5 mb-2">Core Tech Stack</h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-600">
                      <p><strong>Web Development:</strong> HTML5, CSS3, JavaScript, Bootstrap, Responsive Design</p>
                      <p><strong>Frontend Frameworks:</strong> React.js, Tailwind CSS</p>
                      <p><strong>Backend & API:</strong> Node.js, Express.js, REST APIs</p>
                      <p><strong>Databases:</strong> MySQL, PostgreSQL</p>
                      <p><strong>Languages:</strong> C/C++, Python, Java, JavaScript</p>
                      <p><strong>Dev & Design:</strong> Git, GitHub, Postman, Figma, Canva</p>
                    </div>
                  </div>

                  {/* Projects Summary */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-100 pb-1.5 mb-2">Key Projects</h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <strong className="text-gray-950">AI-Powered Weather Chatbot</strong> <span className="text-gray-500 text-[10px] font-mono">(React, Node, Dialogflow)</span>
                        <p className="text-[11px] text-gray-600">Conversational interface retrieving real-time metrics with natural language parsing.</p>
                      </div>
                      <div>
                        <strong className="text-gray-950">Expense Tracker Web App</strong> <span className="text-gray-500 text-[10px] font-mono">(HTML, CSS, JS)</span>
                        <p className="text-[11px] text-gray-600">CRUD finance logger featuring transaction tables, local memory sync, and dynamic edits.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => setShowCVModal(false)}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-sans font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Close CV Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Quick close icon for the modal helper
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
