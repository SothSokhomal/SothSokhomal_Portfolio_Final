import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, CheckCircle, Languages, BookOpenCheck } from "lucide-react";
import { educationData, scholarshipsData, certificatesData, languagesData } from "../data/portfolioData";

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 110,
        damping: 15,
      },
    },
  };

  return (
    <section id="education" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
            Credentials & Academics
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
            Education & Certifications
          </h2>
          <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Column Left: Education (6 span) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-sans font-extrabold text-gray-900 text-lg flex items-center gap-2 mb-4 text-left">
              <GraduationCap className="w-5.5 h-5.5 text-gray-900" />
              Academic Institutions
            </h3>

            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-white border border-gray-150 shadow-2xs hover:shadow-sm transition-all duration-300 text-left"
                >
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <span className="font-mono text-[9px] font-bold text-gray-400 tracking-wider uppercase">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-gray-900 text-sm mt-1">
                    {edu.school}
                  </h4>
                  <p className="font-sans text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {edu.degree}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Language Box inside Education column */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-gray-950 text-white border border-transparent shadow-xs text-left"
            >
              <h4 className="font-sans font-bold text-sm flex items-center gap-2 text-white">
                <Languages className="w-4.5 h-4.5 text-white" />
                Languages
              </h4>
              <div className="flex gap-4 mt-4">
                {languagesData.map((lang, idx) => (
                  <div key={idx} className="flex-1 p-3 rounded-xl bg-white/10 border border-white/15">
                    <p className="font-sans text-[11px] font-bold text-white/80">{lang.language}</p>
                    <p className="font-mono text-[9px] text-emerald-400 font-bold uppercase mt-0.5">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column Right: Scholarships & Certificates (6 span) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Scholarships Card Block */}
            <div>
              <h3 className="font-sans font-extrabold text-gray-900 text-lg flex items-center gap-2 mb-4 text-left">
                <Award className="w-5.5 h-5.5 text-gray-900" />
                Scholarships Awarded
              </h3>

              <div className="p-6 rounded-2xl bg-white border border-gray-150 shadow-2xs text-left">
                <ul className="space-y-4">
                  {scholarshipsData.map((sch, idx) => (
                    <motion.li
                      key={idx}
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div>
                        <strong className="font-sans font-bold text-xs text-gray-900">{sch.name}</strong>
                        <p className="text-[10px] text-gray-500 mt-0.5">{sch.provider}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certificates Block */}
            <div>
              <h3 className="font-sans font-extrabold text-gray-900 text-lg flex items-center gap-2 mb-4 text-left">
                <BookOpenCheck className="w-5.5 h-5.5 text-gray-900" />
                Licenses & certifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificatesData.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-5 rounded-xl bg-white border border-gray-150 shadow-2xs hover:shadow-sm transition-all duration-200 text-left flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[9px] font-bold text-gray-400 tracking-wider">
                        {cert.year}
                      </span>
                      <h4 className="font-sans font-bold text-gray-900 text-xs mt-1 leading-tight line-clamp-2">
                        {cert.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-3">
                        {cert.provider}
                      </p>
                      {cert.credentialId && (
                        <p className="text-[10px] text-gray-400 mt-2">
                          Credential ID {cert.credentialId}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-semibold uppercase tracking-widest text-gray-900 hover:text-gray-700"
                        >
                          View credential
                        </a>
                      )}
                      {cert.file && (
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 hover:text-emerald-800"
                        >
                          Download certificate PDF
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
