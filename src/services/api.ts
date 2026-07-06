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

const API_ROOT = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

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



// import axios from "axios";

// // Match the port your backend is running on
// const API_BASE_URL = "http://localhost:5001/api";

// export interface ContactFormData {
//   name: string;
//   email: string;
//   subject: string;
//   telegram?: string;
//   message: string;
// }

// export const submitContactMessage = async (formData: ContactFormData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/messages`, formData);
//     return response.data; // This returns the success message from your backend
//   } catch (error: any) {
//     // If the backend is off, throw a clear error
//     throw new Error(error.response?.data?.message || "Server is not responding");
//   }
// };

// // Also ensure your fetchProjects is using the same base URL
// export const fetchProjects = async () => {
//   const response = await axios.get(`${API_BASE_URL}/projects`);
//   return response.data;
// };
