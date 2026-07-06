// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Github, ExternalLink, HelpCircle, Layers, Award, Terminal, Code2, AlertCircle, Sparkles, X } from "lucide-react";
// import { projectsData } from "../data/portfolioData";
// import { Project } from "../types";
// import { fetchProjects } from "../services/api";

// export default function Projects() {
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [filter, setFilter] = useState<string>("All");
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState<string | null>(null);

//   const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones"];

//   useEffect(() => {
//     let active = true;

//     const loadProjects = async () => {
//       try {
//         const backendProjects = await fetchProjects();
//         if (active) {
//           setProjects(backendProjects);
//           setLoadError(null);
//         }
//       } catch (error) {
//         if (active) {
//           const message = error instanceof Error ? error.message : "Unable to load projects.";
//           setLoadError(`Backend projects unavailable: ${message}`);
//         }
//       } finally {
//         if (active) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjects();
//     return () => {
//       active = false;
//     };
//   }, []);

//   const availableProjects = projects.length > 0 ? projects : projectsData;

//   const getGroupedProjects = () => {
//     if (filter === "All") return availableProjects;
//     if (filter === "Web Apps") {
//       return availableProjects.filter((p) => p.category.includes("Web App") || p.category.includes("Frontend"));
//     }
//     if (filter === "AI & AI-Vision") {
//       return availableProjects.filter((p) => p.category.includes("AI") || p.category.includes("Vision"));
//     }
//     if (filter === "Creative Clones") {
//       return availableProjects.filter((p) => p.category.includes("UI") || p.category.includes("Game"));
//     }
//     return availableProjects;
//   };

//   const filteredProjects = getGroupedProjects();

//   return (
//     <section id="project" className="py-24 bg-slate-50 relative overflow-hidden">
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

//       <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
//         {/* Header */}
//         <div className="max-w-2xl mx-auto mb-12">
//           <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
//             Proof of Ability
//           </span>
//           <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
//             My Creative Projects
//           </h2>
//           <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
//           <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
//             Click on any project to explore its full structural architecture, including specific
//             technical problems, my direct contributions, challenges solved, and key engineering lessons.
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col items-center gap-3 mb-8">
//           {(loading || loadError) && (
//             <p className={`text-sm ${loadError ? "text-amber-600" : "text-gray-500"}`}>
//               {loading
//                 ? "Loading projects from backend..."
//                 : `Using fallback project data. ${loadError || ""}`}
//             </p>
//           )}
//           <div className="flex flex-wrap justify-center gap-2.5">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setFilter(cat)}
//                 className={`px-4 py-2 rounded-full font-sans text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
//                   filter === cat
//                     ? "bg-gray-950 text-white shadow-md shadow-gray-950/10 scale-[1.02]"
//                     : "bg-white text-gray-500 border border-gray-200 hover:text-gray-800 hover:bg-gray-50"
//                 }`}
//               >
//                 {cat.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <motion.div
//           layout
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
//         >
//           <AnimatePresence mode="popLayout">
//             {filteredProjects.map((proj) => (
//               <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ type: "spring", stiffness: 100, damping: 15 }}
//                 key={proj.id}
//                 whileHover={{ y: -6 }}
//                 onClick={() => setSelectedProject(proj)}
//                 className="group rounded-2xl bg-white border border-gray-150 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
//               >
//                 <div>
//                   {/* Category Badge & Code Icon */}
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="font-mono text-[10px] font-bold tracking-wider text-gray-400 uppercase">
//                       {proj.category}
//                     </span>
//                     <Code2 className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-950 transition-colors" />
//                   </div>

//                   {/* Title */}
//                   <h3 className="font-sans font-bold text-gray-900 text-base mb-2 group-hover:text-gray-950 group-hover:underline decoration-gray-300 decoration-2 underline-offset-4">
//                     {proj.title}
//                   </h3>

//                   {/* Brief description */}
//                   <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6">
//                     {proj.description}
//                   </p>

//                   {/* Technology Tags */}
//                   <div className="flex flex-wrap gap-1.5 mb-6">
//                     {proj.technologies.slice(0, 3).map((tech, tIdx) => (
//                       <span
//                         key={tIdx}
//                         className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 font-mono text-[9px] font-bold text-gray-500"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                     {proj.technologies.length > 3 && (
//                       <span className="px-2 py-1 rounded-md bg-slate-100 font-mono text-[9px] font-bold text-gray-400">
//                         +{proj.technologies.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Bottom Trigger CTA */}
//                 <div className="pt-4 border-t border-gray-100/60 flex items-center justify-between">
//                   <span className="font-sans text-[10px] font-bold tracking-wider text-gray-600 group-hover:text-gray-950 transition-colors flex items-center gap-1">
//                     Explore Details
//                     <span className="group-hover:translate-x-1 transition-transform duration-200">➔</span>
//                   </span>
//                   <div className="flex gap-2">
//                     {proj.live && (
//                       <span className="p-1.5 rounded-md bg-gray-50 text-gray-400">
//                         <ExternalLink className="w-3.5 h-3.5" />
//                       </span>
//                     )}
//                     <span className="p-1.5 rounded-md bg-gray-50 text-gray-400">
//                       <Github className="w-3.5 h-3.5" />
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {/* Project Detail Dialog Overlay */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
//           >
//             {/* Click outside to close */}
//             <div className="absolute inset-0 cursor-default" onClick={() => setSelectedProject(null)} />

//             <motion.div
//               initial={{ scale: 0.95, y: 30 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 30 }}
//               transition={{ type: "spring", stiffness: 120, damping: 18 }}
//               className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col z-10 overflow-hidden border border-gray-100"
//             >
//               {/* Modal Header */}
//               <div className="px-6 py-5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
//                 <div>
//                   <span className="font-mono text-[9px] font-bold tracking-widest text-gray-400 uppercase">
//                     {selectedProject.category}
//                   </span>
//                   <h3 className="font-sans font-extrabold text-gray-950 text-base sm:text-lg">
//                     {selectedProject.title}
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setSelectedProject(null)}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Scrollable details view */}
//               <div className="overflow-y-auto px-6 py-6 space-y-6 text-left">
//                 {/* Tech Badges */}
//                 <div>
//                   <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">
//                     Built With
//                   </h4>
//                   <div className="flex flex-wrap gap-1.5">
//                     {selectedProject.technologies.map((tech, idx) => (
//                       <span
//                         key={idx}
//                         className="px-2.5 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-[9px] font-bold tracking-wide shadow-xs"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Problem Statement */}
//                 <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex gap-3">
//                   <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide">
//                       The Problem Statement
//                     </h4>
//                     <p className="font-sans text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">
//                       {selectedProject.problem}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Key Features */}
//                 <div>
//                   <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2.5">
//                     Core Functionality
//                   </h4>
//                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
//                     {selectedProject.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
//                         <span className="w-1.5 h-1.5 rounded-full bg-gray-950 flex-shrink-0 mt-2" />
//                         <span className="leading-tight">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Contribution */}
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex gap-3">
//                   <Award className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide">
//                       My Contribution
//                     </h4>
//                     <p className="font-sans text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">
//                       {selectedProject.contribution}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Challenges & Lessons learned */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
//                       <Terminal className="w-4 h-4 text-gray-400" />
//                       Challenges Solved
//                     </h4>
//                     <p className="font-sans text-[11px] text-gray-600 mt-2 leading-relaxed">
//                       {selectedProject.challenges}
//                     </p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50">
//                     <h4 className="font-sans font-bold text-emerald-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
//                       <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
//                       Lessons Learned
//                     </h4>
//                     <p className="font-sans text-[11px] text-emerald-800 mt-2 leading-relaxed">
//                       {selectedProject.lessons}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer (Links) */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex flex-wrap justify-between items-center gap-4">
//                 <span className="text-[10px] text-gray-400 font-mono">
//                   SothSokhomal Portfolio Work
//                 </span>
//                 <div className="flex gap-2.5">
//                   <a
//                     href={selectedProject.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-sans font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
//                   >
//                     <Github className="w-4 h-4" />
//                     Github Repo
//                   </a>
//                   {selectedProject.live && (
//                     <a
//                       href={selectedProject.live}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="px-4 py-2 bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                       Live Preview
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }




























// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Changed to framer-motion for stability
// import { Github, ExternalLink, Award, Terminal, Code2, AlertCircle, Sparkles, X } from "lucide-react";
// import { projectsData } from "../data/portfolioData";
// import { Project } from "../types";
// import { fetchProjects } from "../services/api";

// export default function Projects() {
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [filter, setFilter] = useState<string>("All");
//   const [dbProjects, setDbProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);

//   const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones", "Frontend Design", "UI Cloning"];

//   useEffect(() => {
//     const loadBackendProjects = async () => {
//       try {
//         const data = await fetchProjects();
//         // MAP the MongoDB fields to match your original Project Type
//         const formatted = data.map((p: any) => ({
//           ...p,
//           id: p._id, // Use MongoDB _id as the id
//           github: p.githubUrl || p.github,
//           live: p.liveUrl || p.live,
//           lessons: p.lessonsLearned || p.lessons,
//           category: p.category || "Web Apps" 
//         }));
//         setDbProjects(formatted);
//       } catch (error) {
//         console.error("Backend projects not found, showing local only");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadBackendProjects();
//   }, []);

//   // COMBINE BOTH: Original projectsData + Database projects
//   // We filter out duplicates by checking titles
//   const allProjects = [...projectsData, ...dbProjects.filter(dbP => 
//     !projectsData.some(p => p.title === dbP.title)
//   )];

//   const getFilteredProjects = () => {
//     if (filter === "All") return allProjects;
//     return allProjects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase().replace("All", "")));
//   };

//   const filteredProjects = getFilteredProjects();

//   return (
//     <section id="project" className="py-24 bg-slate-50 relative overflow-hidden">
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

//       <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
//         {/* Header */}
//         <div className="max-w-2xl mx-auto mb-12">
//           <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
//             Proof of Ability
//           </span>
//           <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
//             My Creative Projects
//           </h2>
//           <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
//           <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
//             Displaying {allProjects.length} total projects (Local + Database).
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap justify-center gap-2.5 mb-12">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setFilter(cat)}
//               className={`px-4 py-2 rounded-full font-sans text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
//                 filter === cat
//                   ? "bg-gray-950 text-white shadow-md"
//                   : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
//               }`}
//             >
//               {cat.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
//           <AnimatePresence mode="popLayout">
//             {filteredProjects.map((proj) => (
//               <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 key={proj.id}
//                 onClick={() => setSelectedProject(proj)}
//                 className="group rounded-2xl bg-white border border-gray-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
//               >
//                 <div>
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="font-mono text-[10px] font-bold tracking-wider text-gray-400 uppercase">
//                       {proj.category}
//                     </span>
//                     <Code2 className="w-4.5 h-4.5 text-gray-400" />
//                   </div>
//                   <h3 className="font-sans font-bold text-gray-900 text-base mb-2 group-hover:underline">
//                     {proj.title}
//                   </h3>
//                   <p className="font-sans text-xs text-gray-500 line-clamp-3 mb-6">
//                     {proj.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1.5 mb-6">
//                     {proj.technologies.slice(0, 3).map((tech, i) => (
//                       <span key={i} className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 font-mono text-[9px] text-gray-500">
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                   <span className="text-[10px] font-bold text-gray-600">Explore Details ➔</span>
//                   <div className="flex gap-2">
//                     {proj.live && <ExternalLink className="w-3.5 h-3.5 text-gray-400" />}
//                     <Github className="w-3.5 h-3.5 text-gray-400" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {/* MODAL OVERLAY */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
//           >
//             <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full z-10 overflow-hidden border border-gray-100"
//             >
//                {/* Modal Header */}
//                <div className="px-6 py-5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
//                 <div>
//                   <span className="font-mono text-[9px] font-bold tracking-widest text-gray-400 uppercase">{selectedProject.category}</span>
//                   <h3 className="font-sans font-extrabold text-gray-950 text-lg">{selectedProject.title}</h3>
//                 </div>
//                 <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
//               </div>

//               {/* Scrollable details view */}
//               <div className="p-6 space-y-6 text-left max-h-[70vh] overflow-y-auto">
//                 <div>
//                   <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Built With</h4>
//                   <div className="flex flex-wrap gap-1.5">
//                     {selectedProject.technologies.map((tech, idx) => (
//                       <span key={idx} className="px-2.5 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-[9px] font-bold">{tech}</span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex gap-3">
//                   <AlertCircle className="w-5 h-5 text-orange-500" />
//                   <div>
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase">The Problem</h4>
//                     <p className="text-xs text-gray-600 mt-1">{selectedProject.problem}</p>
//                   </div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
//                   <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Award className="w-4 h-4" /> My Contribution</h4>
//                   <p className="text-xs text-gray-600 mt-2">{selectedProject.contribution}</p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4" /> Challenges</h4>
//                     <p className="text-xs text-gray-600 mt-2">{selectedProject.challenges}</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50">
//                     <h4 className="font-sans font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-500" /> Lessons</h4>
//                     <p className="text-xs text-emerald-800 mt-2">{selectedProject.lessons}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Links Footer */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex justify-end gap-3">
//                   <a href={selectedProject.github} target="_blank" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2">
//                     <Github className="w-4 h-4" /> Github
//                   </a>
//                   {selectedProject.live && (
//                     <a href={selectedProject.live} target="_blank" className="px-4 py-2 bg-gray-950 text-white font-bold text-xs rounded-xl flex items-center gap-2">
//                       <ExternalLink className="w-4 h-4" /> Live Demo
//                     </a>
//                   )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Github, ExternalLink, Award, Terminal, Code2, AlertCircle, Sparkles, X, Trash2 } from "lucide-react";
// import { projectsData } from "../data/portfolioData";
// import { Project } from "../types";
// import { fetchProjects } from "../services/api";
// import axios from "axios";

// // Define props to accept isAdmin from App.tsx
// interface ProjectsProps {
//   isAdmin?: boolean;
// }

// export default function Projects({ isAdmin }: ProjectsProps) {
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [filter, setFilter] = useState<string>("All");
//   const [dbProjects, setDbProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);

//   const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones", "Frontend Design", "UI Cloning"];

//   // Load Projects from MongoDB
//   const loadBackendProjects = async () => {
//     try {
//       const data = await fetchProjects();
//       const formatted = data.map((p: any) => ({
//         ...p,
//         id: p._id, // Map MongoDB _id to id
//         github: p.githubUrl || p.github,
//         live: p.liveUrl || p.live,
//         lessons: p.lessonsLearned || p.lessons,
//         category: p.category || "Web Apps" 
//       }));
//       setDbProjects(formatted);
//     } catch (error) {
//       console.error("Backend projects not found, showing local only");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBackendProjects();
//   }, []);

//   // --- CRUD: DELETE FUNCTION (Requirement 6.1 & 8) ---
//   const handleDelete = async (id: string | number) => {
//     if (!window.confirm("Are you sure you want to delete this project from the database?")) return;

//     try {
//       // Call the DELETE endpoint
//       await axios.delete(`http://localhost:5001/api/projects/${id}`);
      
//       // Update local state so it disappears immediately
//       setDbProjects(prev => prev.filter(p => (p as any)._id !== id && p.id !== id));
//       alert("✅ Project deleted successfully!");
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert("❌ Error: Could not delete. Hardcoded projects cannot be deleted from the database.");
//     }
//   };

//   const allProjects = [...projectsData, ...dbProjects.filter(dbP => 
//     !projectsData.some(p => p.title === dbP.title)
//   )];

//   const getFilteredProjects = () => {
//     if (filter === "All") return allProjects;
//     return allProjects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase().replace("All", "")));
//   };

//   const filteredProjects = getFilteredProjects();

//   return (
//     <section id="project" className="py-24 bg-slate-50 relative overflow-hidden">
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

//       <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
//         <div className="max-w-2xl mx-auto mb-12">
//           <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">Proof of Ability</span>
//           <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">My Creative Projects</h2>
//           <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-2.5 mb-12">
//           {categories.map((cat) => (
//             <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full font-sans text-xs font-bold transition-all ${filter === cat ? "bg-gray-950 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}>
//               {cat.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
//           <AnimatePresence mode="popLayout">
//             {filteredProjects.map((proj) => (
//               <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 key={proj.id}
//                 onClick={() => setSelectedProject(proj)}
//                 className="group rounded-2xl bg-white border border-gray-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative"
//               >
//                 <div>
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">{proj.category}</span>
//                     <Code2 className="w-4.5 h-4.5 text-gray-400" />
//                   </div>
//                   <h3 className="font-sans font-bold text-gray-900 text-base mb-2">{proj.title}</h3>
//                   <p className="font-sans text-xs text-gray-500 line-clamp-3 mb-6">{proj.description}</p>
//                 </div>

//                 {/* DELETE BUTTON (Visible only in Admin Mode) */}
//                 {isAdmin && (proj as any)._id && (
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation(); // Stop modal from opening
//                       handleDelete((proj as any)._id);
//                     }}
//                     className="mb-4 flex items-center justify-center gap-2 w-full py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all"
//                   >
//                     <Trash2 className="w-3 h-3" /> DELETE PROJECT
//                   </button>
//                 )}

//                 <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                   <span className="text-[10px] font-bold text-gray-600">Explore Details ➔</span>
//                   <div className="flex gap-2">
//                     {proj.live && <ExternalLink className="w-3.5 h-3.5 text-gray-400" />}
//                     <Github className="w-3.5 h-3.5 text-gray-400" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {/* ... (Keep your existing Modal Overlay code here) ... */}
      
//     </section>
//   );
// }






















// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Github, ExternalLink, Award, Terminal, Code2, AlertCircle, Sparkles, X, Trash2 } from "lucide-react";
// import { projectsData } from "../data/portfolioData";
// import { Project } from "../types";
// import { fetchProjects } from "../services/api";
// import axios from "axios";

// export default function Projects() {
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [filter, setFilter] = useState<string>("All");
  
//   // This state will now hold BOTH original and database projects
//   const [allProjects, setAllProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);

//   const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones", "Frontend Design", "UI Cloning"];

//   useEffect(() => {
//     const loadEverything = async () => {
//       try {
//         const data = await fetchProjects();
//         // Format database projects
//         const formattedDb = data.map((p: any) => ({
//           ...p,
//           id: p._id, // Map MongoDB _id to id
//           github: p.githubUrl || p.github,
//           live: p.liveUrl || p.live,
//           lessons: p.lessonsLearned || p.lessons,
//           category: p.category || "Web Apps" 
//         }));

//         // Merge originals from portfolioData with database projects
//         // We use titles to prevent duplicates
//         const merged = [...projectsData, ...formattedDb.filter(dbP => 
//           !projectsData.some(p => p.title === dbP.title)
//         )];
        
//         setAllProjects(merged);
//       } catch (error) {
//         console.error("Backend offline, showing originals only");
//         setAllProjects(projectsData);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadEverything();
//   }, []);

//   // --- CRUD: DELETE FUNCTION (Works for both) ---
//   const handleDelete = async (id: string | number, isDatabaseProject: boolean) => {
//     const confirmMsg = isDatabaseProject 
//       ? "This project is in the database. Delete it forever?" 
//       : "Remove this original project from the view?";
      
//     if (!window.confirm(confirmMsg)) return;

//     if (isDatabaseProject) {
//       try {
//         await axios.delete(`http://localhost:5001/api/projects/${id}`);
//         alert("✅ Deleted from MongoDB");
//       } catch (err) {
//         alert("❌ Database delete failed");
//         return;
//       }
//     }

//     // Update the UI by removing the item from the local state
//     setAllProjects(prev => prev.filter(p => p.id !== id && (p as any)._id !== id));
//   };

//   const getFilteredProjects = () => {
//     if (filter === "All") return allProjects;
//     return allProjects.filter((p) => 
//       p.category.toLowerCase().includes(filter.toLowerCase().replace("All", ""))
//     );
//   };

//   const filteredProjects = getFilteredProjects();

//   return (
//     <section id="project" className="py-24 bg-slate-50 relative overflow-hidden">
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

//       <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
//         <div className="max-w-2xl mx-auto mb-12">
//           <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">Proof of Ability</span>
//           <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">My Creative Projects</h2>
//           <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-2.5 mb-12">
//           {categories.map((cat) => (
//             <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full font-sans text-xs font-bold transition-all ${filter === cat ? "bg-gray-950 text-white" : "bg-white text-gray-500 border border-gray-200"}`}>
//               {cat.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
//           <AnimatePresence mode="popLayout">
//             {filteredProjects.map((proj) => {
//               // Check if it's a database project (MongoDB IDs are usually strings of 24 chars)
//               const isDb = typeof proj.id === 'string' && proj.id.length > 10;

//               return (
//                 <motion.div
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   key={proj.id}
//                   onClick={() => setSelectedProject(proj)} // CLICKING OPENS MODAL
//                   className="group rounded-2xl bg-white border border-gray-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative"
//                 >
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">{proj.category}</span>
//                       <Code2 className="w-4.5 h-4.5 text-gray-400" />
//                     </div>
//                     <h3 className="font-sans font-bold text-gray-900 text-base mb-2">{proj.title}</h3>
//                     <p className="font-sans text-xs text-gray-500 line-clamp-3 mb-6">{proj.description}</p>
//                   </div>

//                   {/* DELETE BUTTON - Always Visible as requested */}
//                   <div className="mb-4">
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevents modal from opening when clicking delete
//                         handleDelete(proj.id, isDb);
//                       }}
//                       className="flex items-center justify-center gap-2 w-full py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
//                     >
//                       <Trash2 className="w-3 h-3" /> DELETE PROJECT
//                     </button>
//                   </div>

//                   <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                     <span className="text-[10px] font-bold text-gray-600">Explore Details ➔</span>
//                     <div className="flex gap-2">
//                       {proj.live && <ExternalLink className="w-3.5 h-3.5 text-gray-400" />}
//                       <Github className="w-3.5 h-3.5 text-gray-400" />
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {/* MODAL OVERLAY (Keep your existing modal code here) */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
//           >
//             <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full z-10 overflow-hidden border border-gray-100"
//             >
//                {/* Modal Header */}
//                <div className="px-6 py-5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
//                 <div>
//                   <span className="font-mono text-[9px] font-bold tracking-widest text-gray-400 uppercase">{selectedProject.category}</span>
//                   <h3 className="font-sans font-extrabold text-gray-950 text-lg">{selectedProject.title}</h3>
//                 </div>
//                 <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 rounded-xl cursor-pointer"><X className="w-5 h-5" /></button>
//               </div>

//               {/* Scrollable details view */}
//               <div className="p-6 space-y-6 text-left max-h-[70vh] overflow-y-auto">
//                 <div>
//                   <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Built With</h4>
//                   <div className="flex flex-wrap gap-1.5">
//                     {selectedProject.technologies.map((tech, idx) => (
//                       <span key={idx} className="px-2.5 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-[9px] font-bold">{tech}</span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex gap-3">
//                   <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase">The Problem</h4>
//                     <p className="text-xs text-gray-600 mt-1">{selectedProject.problem}</p>
//                   </div>
//                 </div>

//                 {/* Features (Handle cases where database might not have them) */}
//                 {selectedProject.features && selectedProject.features.length > 0 && (
//                   <div>
//                     <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Features</h4>
//                     <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
//                       {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
//                     </ul>
//                   </div>
//                 )}

//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
//                   <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Award className="w-4 h-4" /> My Contribution</h4>
//                   <p className="text-xs text-gray-600 mt-2">{selectedProject.contribution}</p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                     <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-gray-400" /> Challenges</h4>
//                     <p className="text-xs text-gray-600 mt-2">{selectedProject.challenges}</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50">
//                     <h4 className="font-sans font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-500" /> Lessons</h4>
//                     <p className="text-xs text-emerald-800 mt-2">{selectedProject.lessons}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Links Footer */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex justify-end gap-3">
//                   <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer">
//                     <Github className="w-4 h-4" /> Github
//                   </a>
//                   {selectedProject.live && (
//                     <a href={selectedProject.live} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gray-950 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer">
//                       <ExternalLink className="w-4 h-4" /> Live Demo
//                     </a>
//                   )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }


























import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Award, Terminal, Code2, AlertCircle, Sparkles, X, Trash2 } from "lucide-react";
import { projectsData } from "../data/portfolioData";
import { Project } from "../types";
import { fetchProjects } from "../services/api";
import axios from "axios";

// 1. Define the Props interface (Requirement 5.2)
interface ProjectsProps {
  isAdmin: boolean;
  refreshSignal: number; // Used to trigger re-fetch when a project is added
}

export default function Projects({ isAdmin, refreshSignal }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  
  // State to hold BOTH original (hardcoded) and database projects
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Web Apps", "AI & AI-Vision", "Creative Clones", "Frontend Design", "UI Cloning"];

  // 2. Load and Merge Data Logic
  const loadEverything = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      // Format database projects to match your UI's expected fields
      const formattedDb = data.map((p: any) => ({
        ...p,
        id: p._id, // Map MongoDB _id to id
        github: p.githubUrl || p.github,
        live: p.liveUrl || p.live,
        lessons: p.lessonsLearned || p.lessons,
        category: p.category || "Web Apps" 
      }));

      // Merge local projects with database projects (avoiding duplicates by title)
      const merged = [...projectsData, ...formattedDb.filter(dbP => 
        !projectsData.some(p => p.title === dbP.title)
      )];
      
      setAllProjects(merged);
    } catch (error) {
      console.error("Backend offline, showing originals only");
      setAllProjects(projectsData);
    } finally {
      setLoading(false);
    }
  };

  // 3. Effect hook: Re-runs when component mounts OR when refreshSignal changes
  useEffect(() => {
    loadEverything();
  }, [refreshSignal]); 

  // 4. CRUD: DELETE FUNCTION (Requirement 6.1 & 8)
  const handleDelete = async (id: string | number, isDatabaseProject: boolean) => {
    const confirmMsg = isDatabaseProject 
      ? "This project is stored in MongoDB. Delete it permanently?" 
      : "Remove this local project from the current view?";
      
    if (!window.confirm(confirmMsg)) return;

    if (isDatabaseProject) {
      try {
        // Call your backend API - Ensure port matches your server
        await axios.delete(`http://localhost:5001/api/projects/${id}`);
        alert("✅ Project deleted from database.");
      } catch (err) {
        alert("❌ Error: Could not connect to backend to delete.");
        return;
      }
    }

    // Update the UI immediately by filtering the local state
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
          <p className="font-sans text-sm text-gray-500 mt-4">
            {loading ? "Syncing with database..." : `Displaying ${allProjects.length} engineering projects.`}
          </p>
        </div>

        {/* Filter Buttons */}
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
            {filteredProjects.map((proj) => {
              const isDb = typeof proj.id === 'string' && proj.id.length > 10;

              return (
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
                      <Code2 className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-900" />
                    </div>
                    <h3 className="font-sans font-bold text-gray-900 text-base mb-2">{proj.title}</h3>
                    <p className="font-sans text-xs text-gray-500 line-clamp-3 mb-6">{proj.description}</p>
                  </div>

                  {/* DELETE BUTTON (Requirement 8) */}
                  {isAdmin && (
                    <div className="mb-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents modal from opening
                          handleDelete(proj.id, isDb);
                        }}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
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
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MODAL OVERLAY */}
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
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Built With</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-[9px] font-bold">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex gap-3 text-left">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase">The Problem</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedProject.problem}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 text-left">
                  <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Award className="w-4 h-4" /> My Contribution</h4>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{selectedProject.contribution}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-sans font-bold text-gray-900 text-xs uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-gray-400" /> Challenges</h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{selectedProject.challenges}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50">
                    <h4 className="font-sans font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-500" /> Lessons</h4>
                    <p className="text-xs text-emerald-800 mt-2 leading-relaxed">{selectedProject.lessons}</p>
                  </div>
                </div>
              </div>

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