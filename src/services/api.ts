export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  telegram?: string;
  message: string;
};

export type ProjectItem = {
  id: string | number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  problem: string;
  features: string[];
  contribution: string;
  challenges: string;
  lessons: string;
  live?: string;
  github?: string;
};

const API_ROOT = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function handleResponse(response: Response) {
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const message = json?.message || response.statusText || "Request failed.";
    throw new Error(message);
  }
  return json;
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  const response = await fetch(`${API_ROOT}/projects`);
  const json = await handleResponse(response);
  return json?.data || json || [];
}

export async function submitContactMessage(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_ROOT}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await handleResponse(response);
  return {
    success: json?.success ?? true,
    message: json?.message || "Message sent successfully.",
  };
}
