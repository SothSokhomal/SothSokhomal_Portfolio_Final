import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import { Code2, Github, Linkedin, Instagram, Facebook, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">{personalInfo.name}</span>
          </div>

          <p className="text-xs text-slate-500 font-mono text-center md:text-left">
            &copy; {new Date().getFullYear()} Soth Vannak RothChansokhomal. Built with Next.js 14, TypeScript &amp; MongoDB.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={personalInfo.facebook} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <Link href="/admin" className="text-xs font-mono text-cyan-400 hover:underline">
              Admin Portal
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
