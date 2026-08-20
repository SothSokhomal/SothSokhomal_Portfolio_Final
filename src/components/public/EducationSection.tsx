"use client";

import { motion } from "framer-motion";
import { educationData, scholarshipsData, certificatesData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, FileCheck, ExternalLink, Download } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="gradient" className="font-mono uppercase tracking-wider text-[11px] px-3 py-1">
            Academic &amp; Certifications
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Education, Scholarships &amp; Credentials
          </h2>
          <p className="text-slate-400 text-base">
            Formal Software Engineering degree, competitive full &amp; partial academic scholarships, and industry certifications.
          </p>
        </div>

        {/* 3 Columns Grid: Education, Scholarships, Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Education History</h3>
            </div>

            <div className="space-y-4">
              {educationData.map((edu) => (
                <div key={edu.school} className="glass-card rounded-xl p-5 border border-slate-800/80 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 block">{edu.period}</span>
                  <h4 className="font-bold text-white text-base leading-snug">{edu.degree}</h4>
                  <p className="text-xs text-slate-400">{edu.school}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scholarships Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Academic Scholarships</h3>
            </div>

            <div className="space-y-4">
              {scholarshipsData.map((sch) => (
                <div key={sch.provider} className="glass-card rounded-xl p-5 border border-slate-800/80 space-y-2 border-l-4 border-l-amber-500">
                  <Badge variant="outline" className="text-[11px] font-mono text-amber-300 border-amber-500/30">
                    {sch.name}
                  </Badge>
                  <p className="text-sm font-semibold text-slate-200">{sch.provider}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Certifications &amp; Training</h3>
            </div>

            <div className="space-y-4">
              {certificatesData.map((cert) => (
                <div key={cert.name} className="glass-card rounded-xl p-5 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400">{cert.year}</span>
                    {cert.file && (
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        <Download className="h-3 w-3" /> PDF
                      </a>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{cert.name}</h4>
                  <p className="text-xs text-slate-400">{cert.provider}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
