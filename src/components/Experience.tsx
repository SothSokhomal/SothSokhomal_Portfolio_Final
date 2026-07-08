import React from "react";
import { motion } from "motion/react";
import { Award, Star, Users, Calendar, HelpingHand, Heart, Trophy, Compass } from "lucide-react";
import { leadershipData } from "../data/portfolioData";

export default function Experience() {
  // Helper to resolve relevant icons for her leadership roles
  const getTimelineIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("ambassador") || t.includes("sister")) {
      return <Star className="w-5 h-5 text-gray-900" />;
    }
    if (t.includes("sponge") || t.includes("city")) {
      return <Trophy className="w-5 h-5 text-gray-900" />;
    }
    if (t.includes("volunteer") || t.includes("registration")) {
      return <HelpingHand className="w-5 h-5 text-gray-900" />;
    }
    if (t.includes("e-gen") || t.includes("innovation")) {
      return <Award className="w-5 h-5 text-gray-900" />;
    }
    if (t.includes("cancer")) {
      return <Heart className="w-5 h-5 text-gray-900" />;
    }
    return <Users className="w-5 h-5 text-gray-900" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 as const,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 15,
      },
    },
  } as const;

  return (
    <section id="experience" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative vector grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40" />

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
            Leadership & Activities
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
            My Creative Journeys
          </h2>
          <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
        </div>

        {/* Timeline container */}
        <div className="relative pl-8 sm:pl-12 border-l border-gray-200 ml-4 sm:ml-8 mt-12 space-y-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {leadershipData.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative group text-left"
              >
                {/* Floating Timeline Bullet Circle with icon */}
                <div className="absolute -left-14 sm:-left-18 top-1 w-10 h-10 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-center shadow-xs group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                  <div className="group-hover:text-white text-gray-700 transition-colors">
                    {getTimelineIcon(item.title)}
                  </div>
                </div>

                {/* Card representation */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-xs hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      {/* Organization Name */}
                      <span className="font-mono text-[10px] font-bold text-gray-400 tracking-wider uppercase block">
                        {item.organization || "Independent Action"}
                      </span>
                      {/* Role Title */}
                      <h3 className="font-sans font-bold text-gray-900 text-base mt-0.5 group-hover:text-gray-950">
                        {item.title}
                      </h3>
                    </div>
                    {/* Period Badge */}
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200/60 max-w-max self-start sm:self-center shadow-2xs">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-sans text-[10px] font-bold text-gray-600 tracking-wide">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Summary text */}
                  <p className="font-sans text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
