"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { DownloadCloud, ShieldCheck, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Resume", href: "#resume" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0f19]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Personal Branding Image Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/50 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-md flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Soth vannak rothchansokhomal.jpg"
              alt={personalInfo.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-sm leading-tight tracking-tight group-hover:text-cyan-400 transition-colors">
              {personalInfo.shortName}
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
              Software Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={personalInfo.resumePdf}
            download="Soth_Vannak_RothChansokhomal_CV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2 border-slate-700 hover:border-cyan-500/50">
              <DownloadCloud className="h-3.5 w-3.5 text-cyan-400" />
              <span>Download CV</span>
            </Button>
          </a>
          <Link href="/admin">
            <Button variant="gradient" size="sm" className="gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Portal</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 p-5 mt-2 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/60 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href={personalInfo.resumePdf}
              download="Soth_Vannak_RothChansokhomal_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full justify-center gap-2">
                <DownloadCloud className="h-4 w-4 text-cyan-400" />
                <span>Download Resume PDF</span>
              </Button>
            </a>
            <Link href="/admin" className="w-full" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gradient" className="w-full justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
