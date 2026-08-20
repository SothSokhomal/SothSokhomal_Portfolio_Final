"use client";

import { useState, useRef } from "react";
import { submitContactFormAction } from "@/app/actions/contact";
import { personalInfo } from "@/data/portfolioData";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    telegram: "",
    message: "",
    website_hp: "", // Honeypot field for bot protection
  });

  const [loading, setLoading] = useState(false);
  const [isSlowProcessing, setIsSlowProcessing] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsSlowProcessing(false);
    setStatus({ success: true, message: "Sending message..." });

    // If processing takes longer than 2 seconds, trigger optimistic progress alert
    slowTimerRef.current = setTimeout(() => {
      setIsSlowProcessing(true);
    }, 2000);

    try {
      const res = await submitContactFormAction(formData);

      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);

      if (res.success) {
        setStatus({ success: true, message: res.message });
        // Clear form fields ONLY on confirmed success
        setFormData({
          name: "",
          email: "",
          subject: "",
          telegram: "",
          message: "",
          website_hp: "",
        });
      } else {
        setStatus({ success: false, message: res.error });
      }
    } catch (err: any) {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      setStatus({
        success: false,
        message: "An unexpected error occurred. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
      setIsSlowProcessing(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="gradient" className="font-mono uppercase tracking-wider text-[11px] px-3 py-1">
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let&apos;s Build Something Impactful
          </h2>
          <p className="text-slate-400 text-base">
            Have a project in mind, software engineering internship inquiry, or collaboration opportunity? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card rounded-3xl p-8 border border-slate-800/80 space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                Contact Directives
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase block">Email Address</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase block">Phone / Telegram</span>
                    <span className="text-sm font-semibold text-slate-200">{personalInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase block">Location</span>
                    <span className="text-sm font-semibold text-slate-200">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-slate-800/80">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Honeypot Bot Trap Field (Hidden from real users) */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <Input
                    tabIndex={-1}
                    autoComplete="off"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Software Engineering Internship"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Telegram Handle (Optional)</label>
                    <Input
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      placeholder="@username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Your Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message or inquiry here..."
                    required
                  />
                </div>

                {/* Optimistic Processing Notification */}
                {isSlowProcessing && loading && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 animate-pulse">
                    <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>Still processing... Securing MongoDB record and background notification dispatches.</span>
                  </div>
                )}

                {/* Status Toast / Banner */}
                {status && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 border transition-all ${
                      status.success
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-red-500/10 border-red-500/30 text-red-300"
                    }`}
                  >
                    {status.success ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{isSlowProcessing ? "Finalizing Security Checks..." : "Sending Message..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Visitor Message</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
