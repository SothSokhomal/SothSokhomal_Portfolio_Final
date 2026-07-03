import React, { useState } from "react";
import { Mail, Github, Linkedin, Instagram, Facebook, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data/portfolioData";
import { submitContactMessage, ContactFormData } from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    telegram: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: ContactFormData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        telegram: formData.telegram,
        message: formData.message,
      };

      const response = await submitContactMessage(payload);
      setToastMessage(response.message || "Message received. Thank you!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        telegram: "",
        message: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send message. Please try again.";
      setToastMessage(message);
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      window.setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
            Let's Connect
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
            Get In Touch
          </h2>
          <div className="h-1 w-12 bg-gray-950 rounded-full mx-auto mt-4" />
          <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
            Interested in hiring me as an intern, collaborating on a project, or just having a technical conversation? Drop a message below!
          </p>
        </div>

        {/* Double Column Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Column Left: Contact Info Channels (5 span) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-2xs">
            <div className="text-left">
              <h3 className="font-sans font-extrabold text-gray-900 text-base mb-2">
                Contact Information
              </h3>
              <p className="font-sans text-xs text-gray-500 mb-8 leading-relaxed">
                Reach out to me directly on my personal accounts, or download my printable CV from the hero section.
              </p>

              <div className="space-y-4">
                {/* Email link */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-gray-800 shadow-3xs">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="font-sans text-xs font-semibold text-gray-800 hover:text-gray-950 transition-colors line-clamp-1">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* GitHub Link */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-gray-800 shadow-3xs">
                    <Github className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">GitHub</p>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="font-sans text-xs font-semibold text-gray-800 hover:text-gray-950 transition-colors line-clamp-1">
                      github.com/SothSokhomal
                    </a>
                  </div>
                </div>

                {/* LinkedIn Link */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-gray-800 shadow-3xs">
                    <Linkedin className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">LinkedIn</p>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="font-sans text-xs font-semibold text-gray-800 hover:text-gray-950 transition-colors line-clamp-1">
                      linkedin.com/in/sothvannakrothchansokhomal
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-social indicators */}
            <div className="mt-8 pt-8 border-t border-gray-150/50 text-left">
              <h4 className="font-sans font-bold text-xs text-gray-800 mb-3 uppercase tracking-wider">
                Follow My Socials
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 hover:shadow-xs transition-all text-[11px] font-semibold"
                >
                  Instagram
                </a>
                <a
                  href={personalInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-150 text-gray-600 hover:text-gray-950 hover:shadow-xs transition-all text-[11px] font-semibold"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Column Right: Message Form Center (7 span) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-gray-150 shadow-xs text-left space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="SothSOkhomal"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-slate-50/50 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="SothSokhomal@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-slate-50/50 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                    Subject Heading
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Internship Application"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-slate-50/50 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Telegram */}
                <div className="space-y-1.5">
                  <label htmlFor="telegram" className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                    Telegram Handle <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="telegram"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-slate-50/50 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project, timing, or internship options..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-slate-50/50 transition-all resize-none placeholder:text-gray-400"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gray-950 text-white font-sans text-xs font-bold tracking-wider rounded-xl shadow-md hover:bg-gray-850 active:translate-y-[1px] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white/80" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Apple-style Sliding Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xl flex items-center gap-3.5 max-w-sm w-full backdrop-blur-md"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-left">
              <p className="font-sans font-bold text-gray-900 text-xs">
                {toastMessage.toLowerCase().includes("unable") || toastMessage.toLowerCase().includes("invalid") || toastMessage.toLowerCase().includes("error")
                  ? "Submission Failed"
                  : "Message Received!"}
              </p>
              <p className="font-sans text-[11px] text-gray-500 mt-0.5 leading-tight">
                {toastMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
