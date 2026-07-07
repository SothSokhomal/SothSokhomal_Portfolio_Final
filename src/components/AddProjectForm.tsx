// import React, { useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";

// // 1. Define the props interface so it can receive the refresh function from App.tsx
// interface AddProjectFormProps {
//   onProjectAdded: () => void;
// }

// // 2. Define the form data structure for TypeScript
// interface ProjectData {
//   title: string;
//   description: string;
//   technologies: string;
//   imageUrl: string;
//   githubUrl: string;
//   liveUrl: string;
//   problem: string;
//   contribution: string;
//   challenges: string;
//   lessonsLearned: string;
// }

// const AddProjectForm: React.FC<AddProjectFormProps> = ({ onProjectAdded }) => {
//   const [formData, setFormData] = useState<ProjectData>({
//     title: "",
//     description: "",
//     technologies: "",
//     imageUrl: "",
//     githubUrl: "",
//     liveUrl: "",
//     problem: "",
//     contribution: "",
//     challenges: "",
//     lessonsLearned: "",
//   });

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       // Convert technologies string to array for the backend
//       const projectDataToSubmit = {
//         ...formData,
//         technologies: formData.technologies.split(",").map((tech) => tech.trim()),
//       };

//       // Change this URL to match your actual backend port (5001)
//       await axios.post("http://localhost:5001/api/projects", projectDataToSubmit);

//       alert("✅ Project Added Successfully!");
      
//       // 3. TRIGGER THE REFRESH in the parent component
//       onProjectAdded(); 

//       // 4. Reset form fields
//       setFormData({
//         title: "",
//         description: "",
//         technologies: "",
//         imageUrl: "",
//         githubUrl: "",
//         liveUrl: "",
//         problem: "",
//         contribution: "",
//         challenges: "",
//         lessonsLearned: "",
//       });
//     } catch (err: any) {
//       alert("❌ Error adding project: " + err.message);
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-3xl mx-auto px-6 border border-gray-200 p-8 rounded-2xl shadow-sm text-left">
//         <h2 className="text-3xl font-bold mb-2 text-gray-900">Add New Project</h2>
//         <p className="text-sm text-gray-500 mb-8 font-sans">Enter project details to update your engineering portfolio.</p>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all text-sm"
//               type="text"
//               name="title"
//               placeholder="Project Title *"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all text-sm"
//               type="text"
//               name="technologies"
//               placeholder="Technologies (Comma separated) *"
//               value={formData.technologies}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <textarea
//             className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all text-sm resize-none"
//             name="description"
//             placeholder="Short Description *"
//             rows={2}
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input className="p-3 border border-gray-200 rounded-xl text-xs bg-slate-50 outline-none" type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
//             <input className="p-3 border border-gray-200 rounded-xl text-xs bg-slate-50 outline-none" type="text" name="githubUrl" placeholder="GitHub URL" value={formData.githubUrl} onChange={handleChange} />
//             <input className="p-3 border border-gray-200 rounded-xl text-xs bg-slate-50 outline-none" type="text" name="liveUrl" placeholder="Live Demo URL" value={formData.liveUrl} onChange={handleChange} />
//           </div>

//           <textarea className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-900" name="problem" placeholder="Problem Addressed *" rows={2} value={formData.problem} onChange={handleChange} required />
//           <textarea className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-900" name="contribution" placeholder="My Individual Contribution *" rows={2} value={formData.contribution} onChange={handleChange} required />
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <textarea className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-900" name="challenges" placeholder="Challenges Encountered *" rows={2} value={formData.challenges} onChange={handleChange} required />
//             <textarea className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-900" name="lessonsLearned" placeholder="Lessons Learned *" rows={2} value={formData.lessonsLearned} onChange={handleChange} required />
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-gray-950 text-white p-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md active:scale-[0.98] cursor-pointer"
//           >
//             Add Project to Database
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default AddProjectForm;




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
      
      alert("✅ Project Successfully Added to MongoDB!");
      onProjectAdded(); // 🚀 Trigger the instant UI update
      
      // Reset Form
      setFormData({ title: "", description: "", technologies: "", imageUrl: "https://via.placeholder.com/400x300", githubUrl: "", liveUrl: "", problem: "", contribution: "", challenges: "", lessonsLearned: "" });
    } catch (err: any) {
      console.error(err);
      alert(`❌ Error: ${err.response?.data?.message || "Check Backend Terminal"}`);
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