"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DownloadCloud,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function ResumeSection() {
  const resumeProjects = [
    {
      title: "ClearAir — Emergency Air Pollution Alert App",
      role: "UX Researcher & Product Designer",
      period: "2025 – Present",
      location: "Phnom Penh, Cambodia",
      highlights: [
        "Designed a mobile app providing real-time air quality alerts in Khmer and English.",
        "Conducted user interviews and usability testing with Cambodian users to improve accessibility.",
        "Built a prototype featuring AQI alerts, health guidance, and SMS fallback for low-internet environments.",
        "Focused on students, commuters, and vulnerable communities exposed to air pollution.",
      ],
    },
    {
      title: "Green Flow — SEA Sponge City Innovation Challenge",
      role: "Team Member | Top 5 Finalist",
      period: "2025",
      location: "Phnom Penh, Cambodia",
      highlights: [
        "Contributed to a sustainability project addressing urban flooding in Phnom Penh.",
        "Proposed nature-based solutions including rain gardens, bioswales, and permeable pathways.",
        "Helped design a community-focused prototype to improve flood awareness and resilience.",
      ],
    },
    {
      title: "E-Gen Innovation Program — Ministry of Education, Youth and Sport (MoEYS)",
      role: "Team Member | Top 5 Team, First Runner-Up",
      period: "2025",
      location: "Phnom Penh, Cambodia",
      highlights: [
        "Represented CamTech University in a national innovation competition.",
        "Co-developed SDablir, an IoT-based assistive solution supporting students with disabilities and hard-of-hearing learners.",
        "Selected among the Top 5 teams and invited to demo prototype, earning First Runner-Up recognition.",
      ],
    },
    {
      title: "HomeSweet Rental App",
      role: "Lead Designer & System Architect",
      period: "2025",
      location: "Phnom Penh, Cambodia",
      highlights: [
        "Led and facilitated the design team, coordinating design tasks and ensuring consistency across the project.",
        "Designed overall system architecture including flowcharts, data flows, and system processes.",
        "Collaborated with development team to translate requirements into a cross-platform housing solution using Flutter, Vue.js, and Firebase.",
      ],
    },
  ];

  const educationList = [
    {
      school: "Cambodia University of Technology and Science (CamTech)",
      degree: "Bachelor's Degree in Software Engineering",
      period: "2024 – Present",
      location: "Phnom Penh, Cambodia",
    },
    {
      school: "Australian Center for Education (ACE)",
      degree: "General English Program (GEP)",
      period: "2016 – 2023",
      location: "Phnom Penh, Cambodia",
    },
    {
      school: "Phsar Derm Ktov High School",
      degree: "General Knowledge / High School Diploma",
      period: "2018 – 2024",
      location: "Phnom Penh, Cambodia",
    },
  ];

  const leadershipHighlight = {
    title: "eMpowering Youths Across ASEAN (eYAA) Cohort 6",
    role: "Selected Cambodian Representative & Operations/Logistics Team",
    period: "2026",
    location: "Puerto Princesa, Philippines",
    highlights: [
      "Selected as one of Cambodia's representatives for eYAA Cohort 6, a regional ASEAN youth leadership program.",
      "Served on the Operations & Logistics Team for the Y.E.S. We Can! Youth Empowerment Series with Filipino Hospitality Management.",
      "Helped organize training activities reaching 120 marginalized youths face-to-face, 1,000 students via webinars, and 50 aspiring entrepreneurs.",
    ],
  };

  return (
    <section id="resume" className="py-24 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header with Big Tech Prominent Download CV */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-10">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="gradient" className="font-mono uppercase tracking-wider text-[11px] px-3 py-1">
              Curriculum Vitae &amp; Track Record
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Professional Resume &amp; Innovations
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Software engineering student at CamTech experienced in full-stack web applications, IoT accessibility, climate resilience, and ASEAN regional leadership.
            </p>
          </div>

          <a
            href={personalInfo.resumePdf}
            download="Soth_Vannak_RothChansokhomal_CV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" className="gap-2.5 shadow-xl glow-blue group">
              <DownloadCloud className="h-5 w-5 text-cyan-300 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Download Full CV (PDF)</span>
            </Button>
          </a>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Education & ASEAN Leadership (5 Cols) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Education Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>

              <div className="space-y-4">
                {educationList.map((edu) => (
                  <div
                    key={edu.school}
                    className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span>{edu.period}</span>
                      <span className="text-slate-500">{edu.location}</span>
                    </div>
                    <h4 className="font-bold text-white text-base leading-snug">{edu.degree}</h4>
                    <p className="text-xs text-slate-400">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ASEAN Regional Representative Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Regional ASEAN Leadership</h3>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-purple-500/40 transition-all space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                  <span>{leadershipHighlight.period}</span>
                  <span className="text-slate-500">{leadershipHighlight.location}</span>
                </div>
                <h4 className="font-bold text-white text-base">{leadershipHighlight.title}</h4>
                <p className="text-xs text-cyan-400 font-mono">{leadershipHighlight.role}</p>
                <ul className="space-y-2 pt-2">
                  {leadershipHighlight.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Experience & Innovation Projects (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Experience &amp; Innovation Projects</h3>
            </div>

            <div className="space-y-6">
              {resumeProjects.map((proj) => (
                <div
                  key={proj.title}
                  className="glass-card rounded-2xl p-7 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-white text-lg">{proj.title}</h4>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-900 text-cyan-300 border border-slate-800 self-start sm:self-auto">
                      {proj.period}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-cyan-400">{proj.role} &bull; {proj.location}</p>

                  <ul className="space-y-2 pt-2">
                    {proj.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Prominent Download CV Card */}
        <div className="glass-card rounded-3xl p-8 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Need a PDF Copy of Soth Sokhomal&apos;s Resume?</h3>
              <p className="text-xs text-slate-400">
                Official PDF CV containing technical skills, innovations, academic honors, and references.
              </p>
            </div>
          </div>

          <a
            href={personalInfo.resumePdf}
            download="Soth_Vannak_RothChansokhomal_CV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="gradient" className="gap-2 font-bold whitespace-nowrap">
              <DownloadCloud className="h-5 w-5" />
              <span>Download PDF CV</span>
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
}
