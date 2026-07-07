import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Award, Terminal, Code2, AlertCircle, Sparkles, X, Trash2 } from "lucide-react";
import { projectsData } from "../data/portfolioData";
import { Project } from "../types";
import { fetchProjects } from "../services/api";
import axios from "axios";

// 1. Props Interface - Receives state from App.tsx (Requirement 5.2)
interface ProjectsProps {
  isAdmin: boolean;
  refreshSignal: number; 
}

export default function Projects({ isAdmin, refreshSignal }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  
  // 2. State to hold the unified list of all projects
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones", "Frontend Design", "UI Cloning"];

  // 3. Load and Merge Data: Combines Hardcoded + MongoDB (Requirement 4.1.D)
  const loadData = async () => {
    setLoading(true);
    try {
      const dbData = await fetchProjects();
      const formattedDb = dbData.map((p: any) => ({
        ...p,
        id: p._id, // MongoDB ID
        github: p.githubUrl || p.github,
        live: p.liveUrl || p.live,
        lessons: p.lessonsLearned || p.lessons,
        category: p.category || "Web App"
      }));

      // Merge and remove duplicates by title
      const merged = [...projectsData, ...formattedDb.filter(dbP => 
        !projectsData.some(p => p.title === dbP.title)
      )];
      
      setAllProjects(merged);
    } catch (error) {
      console.error("Database connection error, showing originals only.");
      setAllProjects(projectsData);
    } finally {
      setLoading(false);
    }
  };

  // 4. Trigger re-fetch when refreshSignal changes (No page reload needed!)
  useEffect(() => {
    loadData();
  }, [refreshSignal]);

  // 5. CRUD: Unified Delete Function (Requirement 6.1 & 8)
  const handleDelete = async (id: string | number) => {
    const isDbProject = typeof id === 'string' && id.length > 10;
    
    const confirmMsg = isDbProject 
      ? "Delete this project from MongoDB database?" 
      : "Remove this original project from current view?";
      
    if (!window.confirm(confirmMsg)) return;

    if (isDbProject) {
      try {
        // DELETE via API (Port 5001)
        await axios.delete(`http://localhost:5001/api/projects/${id}`);
        alert("✅ Deleted from MongoDB database.");
      } catch (err) {
        alert("❌ Error: API failed to delete.");
        return;
      }
    }

    // Update UI immediately (Local State update)
    setAllProjects(prev => prev.filter(p => p.id !== id && (p as any)._id !== id));
  };

  const getFilteredProjects = () => {
    if (filter === "All") return allProjects;
    return allProjects.filter((p) => 
      p.category.toLowerCase().includes(filter.toLowerCase().replace("All", ""))
    );
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="project" className="py-24 bg-slate-50 relative overflow-hidden text-left">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">Proof of Ability</span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">My Creative Projects</h2>
          <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
          <p className="font-sans text-sm text-gray-500 mt-4 leading-relaxed">
            {loading ? "Synchronizing with database..." : `Displaying ${allProjects.length} engineering works.`}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${filter === cat ? "bg-gray-950 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={proj.id}
                onClick={() => setSelectedProject(proj)} 
                className="group rounded-2xl bg-white border border-gray-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">{proj.category}</span>
                    <Code2 className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-950 transition-colors" />
                  </div>
                  <h3 className="font-sans font-bold text-gray-900 text-base mb-2 group-hover:underline decoration-2">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 line-clamp-3 mb-6">{proj.description}</p>
                </div>

                {/* 6. ADMIN DELETE BUTTON - Visible on every card in Admin Mode */}
                {isAdmin && (
                  <div className="mb-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents details modal from opening
                        handleDelete(proj.id);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      <Trash2 className="w-3 h-3" /> DELETE PROJECT
                    </button>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-600">Explore Details ➔</span>
                  <div className="flex gap-2">
                    {proj.live && <ExternalLink className="w-3.5 h-3.5 text-gray-400" />}
                    <Github className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 7. MODAL OVERLAY (Details View) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full z-10 overflow-hidden border border-gray-100"
            >
               <div className="px-6 py-5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
                <div className="text-left">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase">{selectedProject.category}</span>
                  <h3 className="font-sans font-extrabold text-gray-950 text-lg">{selectedProject.title}</h3>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 rounded-xl cursor-pointer"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-6 space-y-6 text-left max-h-[70vh] overflow-y-auto">
                {/* Tech Tags */}
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Built With</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-[9px] font-bold">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide">The Problem Statement</h4>
                    <p className="font-sans text-[11px] text-gray-600 mt-1 leading-relaxed">{selectedProject.problem}</p>
                  </div>
                </div>

                {/* My Contribution */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
                  <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Award className="w-4 h-4" /> My Contribution</h4>
                  <p className="font-sans text-[11px] text-gray-600 mt-2 leading-relaxed">{selectedProject.contribution}</p>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-gray-400" /> Challenges</h4>
                    <p className="font-sans text-[11px] text-gray-600 mt-2 leading-relaxed">{selectedProject.challenges}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50">
                    <h4 className="font-sans font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-500" /> Lessons</h4>
                    <p className="font-sans text-[11px] text-emerald-800 mt-2 leading-relaxed">{selectedProject.lessons}</p>
                  </div>
                </div>
              </div>

              {/* Links Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex justify-end gap-3">
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors">
                    <Github className="w-4 h-4" /> Github Repo
                  </a>
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gray-950 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Preview
                    </a>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}