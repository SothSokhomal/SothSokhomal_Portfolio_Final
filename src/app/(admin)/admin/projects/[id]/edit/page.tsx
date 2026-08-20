import { getProjectById } from "@/actions/projectActions";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

interface EditProjectProps {
  params: {
    id: string;
  };
}

export const revalidate = 0;

export default async function EditProjectPage({ params }: EditProjectProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Edit Project</h1>
        <p className="text-xs text-slate-400">
          Modify existing project details: {project.title}
        </p>
      </div>
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
