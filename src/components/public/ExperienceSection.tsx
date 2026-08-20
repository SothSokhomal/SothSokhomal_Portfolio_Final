"use client";

import { motion } from "framer-motion";
import { leadershipData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Award, Users, Globe, ChevronRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="gradient" className="font-mono uppercase tracking-wider text-[11px] px-3 py-1">
            Leadership &amp; Contributions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Honors, Competitions &amp; Community
          </h2>
          <p className="text-slate-400 text-base">
            National innovation challenges, ambassador leadership, and regional youth empowerment initiatives across Cambodia &amp; ASEAN.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
          {leadershipData.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative pl-6 md:pl-10"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#0b0f19] glow-blue" />

              {/* Card Container */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-cyan-400 font-mono">
                      {item.organization}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-slate-400 border border-slate-800 self-start sm:self-auto">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
