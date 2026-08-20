import { getProjectById } from "@/actions/projectActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  UserCheck,
  Flame,
  GraduationCap,
  Layers,
} from "lucide-react";

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Navigation Back Link */}
        <Link href="/#projects">
          <Button variant="outline" size="sm" className="gap-2 border-slate-700 hover:border-cyan-500">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Projects</span>
          </Button>
        </Link>

        {/* Header Block */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gradient" className="font-mono text-xs px-3 py-1">
              {project.category}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Project ID: {project.id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="default" className="gap-2">
                  <Github className="h-4 w-4" />
                  <span>View Repository</span>
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10">
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Project Demo</span>
                </Button>
              </a>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Technology Stack Employed:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 text-cyan-300 border border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Sections: Problem, Solution, Contribution, Lessons Learned */}
        <div className="space-y-8">
          
          {/* Section 1: Problem Statement */}
          <div className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">1. Problem Statement</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              {project.problem}
            </p>
          </div>

          {/* Section 2: Solution & Key Features */}
          <div className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Lightbulb className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">2. Engineering Solution &amp; Features</h3>
            </div>
            {project.features && project.features.length > 0 && (
              <ul className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 3: Personal Contribution */}
          <div className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-3 text-emerald-400">
              <UserCheck className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">3. Personal Contribution &amp; Ownership</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              {project.contribution}
            </p>
          </div>

          {/* Section 4: Technical Challenges */}
          <div className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-3 text-purple-400">
              <Flame className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">4. Technical Challenges &amp; Bottlenecks</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              {project.challenges}
            </p>
          </div>

          {/* Section 5: Lessons Learned */}
          <div className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-3 border-l-4 border-l-cyan-500">
            <div className="flex items-center gap-3 text-cyan-400">
              <GraduationCap className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">5. Lessons Learned &amp; Takeaways</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              {project.lessonsLearned}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
