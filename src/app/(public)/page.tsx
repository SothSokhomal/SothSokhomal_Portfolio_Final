import { getProjects } from "@/actions/projectActions";
import { HeroSection } from "@/components/public/HeroSection";
import { ResumeSection } from "@/components/public/ResumeSection";
import { TechStackSection } from "@/components/public/TechStackSection";
import { BentoGrid } from "@/components/public/BentoGrid";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { EducationSection } from "@/components/public/EducationSection";
import { ContactSection } from "@/components/public/ContactSection";

export const revalidate = 0;

export default async function HomePage() {
  const rawProjects = await getProjects();

  const projects = rawProjects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    technologies: p.technologies,
    description: p.description,
    problem: p.problem,
    features: p.features || [],
    contribution: p.contribution,
    challenges: p.challenges,
    lessonsLearned: p.lessonsLearned,
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
    featured: p.featured ?? true,
  }));

  return (
    <>
      <HeroSection />
      <ResumeSection />
      <TechStackSection />
      <BentoGrid projects={projects} />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
