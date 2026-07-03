import React from "react";
import { personalInfo } from "../data/portfolioData";
import { Code2, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleJump = (id: string) => {
    const element = document.getElementById(id);
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
    <footer id="footer" className="bg-gray-950 text-gray-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-center md:text-left">
        
        {/* Left column: Logo & brief statement */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleJump("home")}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-950 shadow-md">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-sans font-bold text-white tracking-tight text-base">
              {personalInfo.shortName}
            </span>
          </div>
          <p className="font-sans text-xs text-gray-500 mt-4 leading-relaxed max-w-sm">
            Let's have a connect together, lookingforward to collaborate together
          </p>

          <ul className="mt-4 flex flex-col items-center md:items-start gap-2">
            <li>
              <button onClick={() => handleJump("aboutMe")} className="hover:text-white transition-colors cursor-pointer">
                ABOUT ME
              </button>
            </li>
            <li>
              <button onClick={() => handleJump("skill")} className="hover:text-white transition-colors cursor-pointer">
                SKILLS
              </button>
            </li>
            <li>
              <button onClick={() => handleJump("project")} className="hover:text-white transition-colors cursor-pointer">
                PROJECTS
              </button>
            </li>
            <li>
              <button onClick={() => handleJump("experience")} className="hover:text-white transition-colors cursor-pointer">
                EXPERIENCE
              </button>
            </li>
          </ul>
        </div>

        {/* Right column: Copyright claims */}
        <div className="md:col-span-3 flex flex-col items-center md:items-end text-xs text-gray-500 gap-1.5">
          <p>&copy; {currentYear} {personalInfo.shortName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
