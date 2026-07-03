import React from "react";
import { motion } from "motion/react";
import {
  Globe,
  LayoutGrid,
  Server,
  Database,
  Code2,
  Cpu,
  Palette,
  Layers,
  Users,
  CheckCircle2
} from "lucide-react";
import { skillsData } from "../data/portfolioData";

export default function Skills() {
  // Helper to map string icon names to Lucide Icon components
  const getIcon = (name?: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-5 h-5 text-gray-950" />;
      case "Layout":
        return <LayoutGrid className="w-5 h-5 text-gray-950" />;
      case "Server":
        return <Server className="w-5 h-5 text-gray-950" />;
      case "Database":
        return <Database className="w-5 h-5 text-gray-950" />;
      case "Code":
        return <Code2 className="w-5 h-5 text-gray-950" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-gray-950" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-gray-950" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-gray-950" />;
      case "Users":
        return <Users className="w-5 h-5 text-gray-950" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-gray-950" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 as const,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <section id="skill" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#f1f5f9_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
            Technical Arsenal
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
            My Professional Skills
          </h2>
          <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
          <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
            A comprehensive overview of my current capabilities spanning frontend development,
            backend coordination, databases, algorithms, and collaborative tools.
          </p>
        </div>

        {/* Skills Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {skillsData.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-xs hover:bg-white hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-150 flex items-center justify-center shadow-xs">
                    {getIcon(category.iconName)}
                  </div>
                  <h3 className="font-sans font-bold text-gray-900 text-sm tracking-wide">
                    {category.category}
                  </h3>
                </div>

                {/* Items */}
                <ul className="space-y-2">
                  {category.items.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900/65 flex-shrink-0" />
                      <span className="font-sans text-xs font-medium text-gray-600">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aesthetic indicator inside card */}
              <div className="mt-6 pt-3 border-t border-gray-150/50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                  Active stack
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
