"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Layout,
  Server,
  Database,
  Code,
  Cpu,
  Layers,
  Users,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layout,
  Server,
  Database,
  Code,
  Cpu,
  Layers,
  Users,
};

export function TechStackSection() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="gradient" className="font-mono uppercase tracking-wider text-[11px] px-3 py-1">
            Technical Proficiency
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Skills &amp; Tech Stack
          </h2>
          <p className="text-slate-400 text-base">
            Modern full-stack technologies, databases, computer vision libraries, and software engineering practices.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, idx) => {
            const IconComponent = iconMap[category.iconName] || Code;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {category.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
