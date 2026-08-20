import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Add New Project</h1>
        <p className="text-xs text-slate-400">
          Fill in project details and deep-dive engineering analysis to publish to MongoDB
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
