"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { initialProjectsData, ProjectData } from "@/data/portfolioData";

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (projects && projects.length > 0) {
      return projects.map((p) => ({
        ...p,
        id: p.id.toString(),
      }));
    }
  } catch (error) {
    console.error("Prisma error fetching projects, falling back to static portfolio data:", error);
  }

  // Fallback to static project list if DB is empty or connecting
  return initialProjectsData.map((p, idx) => ({
    id: `static-${idx + 1}`,
    ...p,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

export async function getProjectById(id: string) {
  try {
    if (id.startsWith("static-")) {
      const idx = parseInt(id.replace("static-", ""), 10) - 1;
      const proj = initialProjectsData[idx] || initialProjectsData[0];
      return { id, ...proj };
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) return null;

    return {
      ...project,
      id: project.id.toString(),
    };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

export async function createProject(data: {
  title: string;
  category: string;
  technologies: string[];
  description: string;
  problem: string;
  features: string[];
  contribution: string;
  challenges: string;
  lessonsLearned: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}) {
  try {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        category: data.category,
        technologies: data.technologies,
        description: data.description,
        problem: data.problem,
        features: data.features,
        contribution: data.contribution,
        challenges: data.challenges,
        lessonsLearned: data.lessonsLearned,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        featured: data.featured ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProject(
  id: string,
  data: {
    title: string;
    category: string;
    technologies: string[];
    description: string;
    problem: string;
    features: string[];
    contribution: string;
    challenges: string;
    lessonsLearned: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  }
) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        technologies: data.technologies,
        description: data.description,
        problem: data.problem,
        features: data.features,
        contribution: data.contribution,
        challenges: data.challenges,
        lessonsLearned: data.lessonsLearned,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        featured: data.featured ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message || "Failed to delete project" };
  }
}
