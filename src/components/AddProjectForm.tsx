import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface AddProjectFormProps { onProjectAdded: () => void; }

export default function AddProjectForm({ onProjectAdded }: AddProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "", description: "", technologies: "", 
    imageUrl: "https://via.placeholder.com/400x300", 
    githubUrl: "", liveUrl: "", problem: "", 
    contribution: "", challenges: "", lessonsLearned: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
      };

      // Ensure Port 5001 matches your Server terminal
      await axios.post("http://localhost:5001/api/projects", payload);
      
      alert("Project Successfully Added to MongoDB!");
      onProjectAdded(); //Trigger the instant UI update
      
      // Reset Form
      setFormData({ title: "", description: "", technologies: "", imageUrl: "https://via.placeholder.com/400x300", githubUrl: "", liveUrl: "", problem: "", contribution: "", challenges: "", lessonsLearned: "" });
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.response?.data?.message || "Check Backend Terminal"}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 border border-gray-200 p-8 rounded-3xl shadow-xl text-left">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Add New Project</h2>
        <p className="text-gray-500 mb-8 text-sm">Update your database. Changes appear instantly below.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded-xl" name="title" placeholder="Project Title *" onChange={handleChange} value={formData.title} required />
          <textarea className="w-full p-3 border rounded-xl" name="description" placeholder="Description *" onChange={handleChange} value={formData.description} required />
          <input className="w-full p-3 border rounded-xl" name="technologies" placeholder="Technologies (e.g. React, Node, CSS) *" onChange={handleChange} value={formData.technologies} required />
          <input className="w-full p-3 border rounded-xl" name="githubUrl" placeholder="GitHub Repository URL" onChange={handleChange} value={formData.githubUrl} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea className="p-3 border rounded-xl text-sm" name="problem" placeholder="Problem Solved *" onChange={handleChange} value={formData.problem} required />
            <textarea className="p-3 border rounded-xl text-sm" name="contribution" placeholder="Your Contribution *" onChange={handleChange} value={formData.contribution} required />
          </div>

          <button type="submit" className="w-full bg-gray-950 text-white p-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95 cursor-pointer">
            Publish to Portfolio
          </button>
        </form>
      </div>
    </section>
  );
}