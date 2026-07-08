import React from "react";
import { skillsData } from "../data/portfolioData";
import { 
  FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaPython, FaGithub, FaFigma
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiExpress, SiMysql, SiPostgresql, SiCplusplus } from "react-icons/si";

export default function Skills() {
  const getSkillIcon = (skillName: string) => {
    switch (skillName) {
      case "HTML": return <FaHtml5 className="w-4 h-4" />;
      case "CSS": return <FaCss3Alt className="w-4 h-4" />;
      case "JavaScript": return <IoLogoJavascript className="w-4 h-4" />;
      case "React": return <FaReact className="w-4 h-4" />;
      case "Bootstrap": return <FaBootstrap className="w-4 h-4" />;
      case "Node.js": return <FaNodeJs className="w-4 h-4" />;
      case "Express.js": return <SiExpress className="w-4 h-4" />;
      case "MySQL": return <SiMysql className="w-4 h-4" />;
      case "PostgreSQL": return <SiPostgresql className="w-4 h-4" />;
      case "C++": return <span className="font-bold text-base font-serif leading-none">C</span>;
      case "Python": return <FaPython className="w-4 h-4" />;
      case "Github": return <FaGithub className="w-4 h-4" />;
      case "Figma": return <FaFigma className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <section id="skill" className="py-20 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="font-sans text-3xl font-extrabold text-[#333333] mb-12">
          My skills
        </h2>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
          {skillsData.map((category, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[260px] lg:w-[210px] min-h-[260px] p-6 rounded-xl bg-[#e8e8e8] border-2 border-[#222222] flex flex-col"
            >
              <h3 className="font-sans font-bold text-[#555555] text-[15px] mb-8 text-center">
                {category.category}
              </h3>

              <ul className="flex flex-col space-y-5 px-2">
                {category.items.map((skill, sIdx) => {
                  const icon = getSkillIcon(skill);
                  return (
                    <li key={sIdx} className="flex items-center gap-4">
                      {icon ? (
                        <div className="flex-shrink-0 text-[#222222] flex items-center justify-center w-5">
                          {icon}
                        </div>
                      ) : (
                        <div className="flex-shrink-0 flex items-center justify-center w-5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#555555]" />
                        </div>
                      )}
                      <span className="font-sans text-[13px] font-semibold text-[#444444]">
                        {skill}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
