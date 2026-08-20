"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  ArrowRight,
  DownloadCloud,
  Sparkles,
  Award,
  Code2,
  FolderGit2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Available for Software Engineering Internships</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I&apos;m <span className="text-gradient">{personalInfo.shortName}</span>
              <br />
              <span className="text-2xl sm:text-3xl font-semibold text-slate-300">
                {personalInfo.title}
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["React", "Next.js 14", "TypeScript", "Node.js", "MongoDB", "Prisma", "Python", "OpenCV"].map(
                (tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 font-mono text-xs">
                    {tech}
                  </Badge>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects">
                <Button size="lg" className="gap-2 group">
                  <span>Explore Bento Projects</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a
                href={personalInfo.resumePdf}
                download="Soth_Vannak_RothChansokhomal_CV.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2 border-slate-700 hover:border-cyan-500">
                  <DownloadCloud className="h-4 w-4 text-cyan-400" />
                  <span>Download CV</span>
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Connect:</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="p-2 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="p-2 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={personalInfo.facebook} target="_blank" rel="noreferrer" className="p-2 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Code/Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Outer Card with Gradient Border */}
              <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/30 via-indigo-500/20 to-purple-500/30 shadow-2xl">
                <div className="rounded-[22px] bg-slate-950/90 p-6 backdrop-blur-xl border border-slate-800 space-y-6">
                  
                  {/* Avatar & Status Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg glow-blue flex-shrink-0">
                      {/* Avatar Image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={personalInfo.avatar}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{personalInfo.name}</h3>
                      <p className="text-xs font-mono text-cyan-400">{personalInfo.location}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[11px] text-slate-300 font-mono">CamTech SE Student</span>
                      </div>
                    </div>
                  </div>

                  {/* Code Block Snippet */}
                  <div className="rounded-xl bg-slate-900/90 p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-[10px] text-slate-500 ml-2">developer.config.ts</span>
                    </div>
                    <p><span className="text-purple-400">const</span> developer = &#123;</p>
                    <p className="pl-4"><span className="text-cyan-400">name</span>: <span className="text-amber-300">&quot;{personalInfo.shortName}&quot;</span>,</p>
                    <p className="pl-4"><span className="text-cyan-400">passion</span>: <span className="text-amber-300">&quot;Full-Stack &amp; AI Systems&quot;</span>,</p>
                    <p className="pl-4"><span className="text-cyan-400">scholarships</span>: <span className="text-emerald-400">4</span>,</p>
                    <p className="pl-4"><span className="text-cyan-400">status</span>: <span className="text-cyan-300">&quot;Ready to Impact&quot;</span></p>
                    <p>&#125;;</p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                      <FolderGit2 className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                      <span className="block text-lg font-bold text-white">6+</span>
                      <span className="text-[10px] text-slate-400">Projects</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                      <Award className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                      <span className="block text-lg font-bold text-white">4</span>
                      <span className="text-[10px] text-slate-400">Scholarships</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                      <Code2 className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                      <span className="block text-lg font-bold text-white">Top 5</span>
                      <span className="text-[10px] text-slate-400">National Finalist</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
