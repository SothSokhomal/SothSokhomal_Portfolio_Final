import React, { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data/portfolioData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { id: "home", label: "HOME" },
    { id: "aboutMe", label: "ABOUT ME" },
    { id: "skill", label: "SKILLS" },
    { id: "project", label: "PROJECTS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check scroll state for background styling
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-white/10 backdrop-blur-xs border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center shadow-md">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-sans font-bold tracking-tight text-gray-950 text-lg">
              {personalInfo.shortName}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`relative py-2 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer ${
                      activeSection === link.id ? "text-gray-950" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-950 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("contact")}
              className="bg-gray-900 text-white text-xs font-semibold tracking-wider py-2.5 px-5 rounded-full hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
            >
              HIRE ME
            </motion.button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-18 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-40 md:hidden overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full text-left py-2 text-sm font-semibold tracking-wider transition-colors ${
                        activeSection === link.id ? "text-gray-950 pl-2 border-l-2 border-gray-950" : "text-gray-500"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-gray-950 text-white text-xs font-semibold tracking-wider py-3 rounded-xl hover:bg-gray-900 transition-colors text-center"
              >
                HIRE ME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
