import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, HelpCircle, Layers, Award, Terminal, Code2, AlertCircle, Sparkles, X } from "lucide-react";
import { projectsData } from "../data/portfolioData";
import { Project } from "../types";
import { fetchProjects } from "../services/api";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones"];

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        const backendProjects = await fetchProjects();
        if (active) {
          setProjects(backendProjects);
          setLoadError(null);
        }
      } catch (error) {
        if (active) {
          const message = error instanceof Error ? error.message : "Unable to load projects.";
          setLoadError(`Backend projects unavailable: ${message}`);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  const availableProjects = projects.length > 0 ? projects : projectsData;

  const getGroupedProjects = () => {
    if (filter === "All") return availableProjects;
    if (filter === "Web Apps") {
      return availableProjects.filter((p) => p.category.includes("Web App") || p.category.includes("Frontend"));
    }
    if (filter === "AI & AI-Vision") {
      return availableProjects.filter((p) => p.category.includes("AI") || p.category.includes("Vision"));
    }
    if (filter === "Creative Clones") {
      return availableProjects.filter((p) => p.category.includes("UI") || p.category.includes("Game"));
    }
    return availableProjects;
  };

  const filteredProjects = getGroupedProjects();

  return (
    <section id="project" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
            Proof of Ability
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
            My Creative Projects
          </h2>
          <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
          <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
            Click on any project to explore its full structural architecture, including specific
            technical problems, my direct contributions, challenges solved, and key engineering lessons.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col items-center gap-3 mb-8">
          {(loading || loadError) && (
            <p className={`text-sm ${loadError ? "text-amber-600" : "text-gray-500"}`}>
              {loading
                ? "Loading projects from backend..."
                : `Using fallback project data. ${loadError || ""}`}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? "bg-gray-950 text-white shadow-md shadow-gray-950/10 scale-[1.02]"
                    : "bg-white text-gray-500 border border-gray-200 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                key={proj.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(proj)}
                className="group rounded-2xl bg-white border border-gray-150 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Category Badge & Code Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      {proj.category}
                    </span>
                    <Code2 className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-950 transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-gray-900 text-base mb-2 group-hover:text-gray-950 group-hover:underline decoration-gray-300 decoration-2 underline-offset-4">
                    {proj.title}
                  </h3>

                  {/* Brief description */}
                  <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6">
                    {proj.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 font-mono text-[9px] font-bold text-gray-500"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-slate-100 font-mono text-[9px] font-bold text-gray-400">
                        +{proj.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Trigger CTA */}
                <div className="pt-4 border-t border-gray-100/60 flex items-center justify-between">
                  <span className="font-sans text-[10px] font-bold tracking-wider text-gray-600 group-hover:text-gray-950 transition-colors flex items-center gap-1">
                    Explore Details
                    <span className="group-hover:translate-x-1 transition-transform duration-200">➔</span>
                  </span>
                  <div className="flex gap-2">
                    {proj.live && (
                      <span className="p-1.5 rounded-md bg-gray-50 text-gray-400">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="p-1.5 rounded-md bg-gray-50 text-gray-400">
                      <Github className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Dialog Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedProject(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col z-10 overflow-hidden border border-gray-100"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] font-bold tracking-widest text-gray-400 uppercase">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-sans font-extrabold text-gray-950 text-base sm:text-lg">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details view */}
              <div className="overflow-y-auto px-6 py-6 space-y-6 text-left">
                {/* Tech Badges */}
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">
                    Built With
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-[9px] font-bold tracking-wide shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide">
                      The Problem Statement
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2.5">
                    Core Functionality
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-950 flex-shrink-0 mt-2" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contribution */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex gap-3">
                  <Award className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide">
                      My Contribution
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">
                      {selectedProject.contribution}
                    </p>
                  </div>
                </div>

                {/* Challenges & Lessons learned */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      Challenges Solved
                    </h4>
                    <p className="font-sans text-[11px] text-gray-600 mt-2 leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50">
                    <h4 className="font-sans font-bold text-emerald-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                      Lessons Learned
                    </h4>
                    <p className="font-sans text-[11px] text-emerald-800 mt-2 leading-relaxed">
                      {selectedProject.lessons}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Links) */}
              <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex flex-wrap justify-between items-center gap-4">
                <span className="text-[10px] text-gray-400 font-mono">
                  SothSokhomal Portfolio Work
                </span>
                <div className="flex gap-2.5">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-sans font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    Github Repo
                  </a>
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Preview
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
