"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/actions/projectActions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ProjectFormProps {
  initialData?: {
    id?: string;
    title: string;
    category: string;
    technologies: string[];
    description: string;
    problem: string;
    features: string[];
    contribution: string;
    challenges: string;
    lessonsLearned: string;
    githubUrl?: string | null;
    liveUrl?: string | null;
  };
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "Full-Stack",
    technologiesStr: initialData?.technologies?.join(", ") || "",
    description: initialData?.description || "",
    problem: initialData?.problem || "",
    featuresStr: initialData?.features?.join("\n") || "",
    contribution: initialData?.contribution || "",
    challenges: initialData?.challenges || "",
    lessonsLearned: initialData?.lessonsLearned || "",
    githubUrl: initialData?.githubUrl || "",
    liveUrl: initialData?.liveUrl || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const techArray = formData.technologiesStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const featuresArray = formData.featuresStr
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      technologies: techArray,
      description: formData.description.trim(),
      problem: formData.problem.trim(),
      features: featuresArray,
      contribution: formData.contribution.trim(),
      challenges: formData.challenges.trim(),
      lessonsLearned: formData.lessonsLearned.trim(),
      githubUrl: formData.githubUrl.trim() || undefined,
      liveUrl: formData.liveUrl.trim() || undefined,
    };

    try {
      let res;
      if (isEdit && initialData?.id) {
        res = await updateProject(initialData.id, payload);
      } else {
        res = await createProject(payload);
      }

      if (res.success) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setError(res.error || "Failed to save project.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Wizard Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge
            variant={currentStep === 1 ? "gradient" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setCurrentStep(1)}
          >
            Step 1: General Info &amp; Stack
          </Badge>
          <Badge
            variant={currentStep === 2 ? "gradient" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setCurrentStep(2)}
          >
            Step 2: Deep-Dive Analysis
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-slate-800/80 space-y-6">
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Basic Metadata &amp; Repositories
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Project Title *</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. AI-Powered Weather Chatbot"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="AI & Full-Stack">AI &amp; Full-Stack</option>
                  <option value="Frontend Design">Frontend Design</option>
                  <option value="Web App (CRUD)">Web App (CRUD)</option>
                  <option value="UI Cloning">UI Cloning</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Game Dev">Game Dev</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Technologies (Comma Separated) *</label>
                <Input
                  name="technologiesStr"
                  value={formData.technologiesStr}
                  onChange={handleChange}
                  placeholder="React.js, Node.js, Dialogflow, OpenWeatherMap"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Short Summary Description *</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief summary displayed on project cards..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">GitHub Repository URL</label>
                <Input
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/SothSokhomal/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Live Demo URL</label>
                <Input
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="button" onClick={() => setCurrentStep(2)}>
                Next: Deep-Dive Analysis &rarr;
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Deep-Dive Portfolio Analysis (Problem, Solution, Contribution, Lessons)
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Problem Statement *</label>
              <Textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={3}
                placeholder="What challenge or limitation did this project solve?"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Key Solution Features (One Per Line)</label>
              <Textarea
                name="featuresStr"
                value={formData.featuresStr}
                onChange={handleChange}
                rows={3}
                placeholder="Feature line 1&#10;Feature line 2&#10;Feature line 3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Personal Contribution *</label>
              <Textarea
                name="contribution"
                value={formData.contribution}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your exact development role and component ownership..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Technical Challenges *</label>
              <Textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={3}
                placeholder="Bugs, state synchronization, or performance obstacles faced..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Lessons Learned *</label>
              <Textarea
                name="lessonsLearned"
                value={formData.lessonsLearned}
                onChange={handleChange}
                rows={3}
                placeholder="Engineering takeaways, patterns, and skills acquired..."
                required
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                &larr; Back to Step 1
              </Button>
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>{isEdit ? "Update Project" : "Save & Publish Project"}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
