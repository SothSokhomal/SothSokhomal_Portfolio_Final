export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  telegram?: string;
  message: string;
};
export type ProjectItem = {
  _id: string; 
  title: string;
  category: string;
  description: string;
  technologies: string[];
  problem: string;
  features: string[];
  contribution: string;
  challenges: string;
  lessonsLearned: string; 
  liveUrl?: string;       
  githubUrl?: string;     
};

const API_ROOT = "http://sothsokhomalportfolio-env.eba-yd5navbm.ap-southeast-2.elasticbeanstalk.com/api";


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





