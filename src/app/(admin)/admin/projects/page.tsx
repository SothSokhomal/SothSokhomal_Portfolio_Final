"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects, deleteProject } from "@/actions/projectActions";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { PlusCircle, Search, Edit3, Trash2, ExternalLink, Github, Loader2 } from "lucide-react";

export default function AdminProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjectsData = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await deleteProject(deleteId);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      } else {
        alert(res.error || "Failed to delete project.");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.technologies.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Projects Manager</h1>
          <p className="text-xs text-slate-400">
            Create, edit, search, and delete portfolio projects in MongoDB
          </p>
        </div>

        <Link href="/admin/projects/new">
          <Button size="sm" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add New Project</span>
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category, or technology..."
          className="pl-10 h-10 text-xs"
        />
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 space-y-3 glass-card rounded-2xl">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-cyan-400" />
          <p className="text-xs font-mono">Loading MongoDB Projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center text-slate-400 space-y-3 glass-card rounded-2xl">
          <p className="text-sm font-semibold">No projects found matching search query.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-semibold text-white">
                  {p.title}
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="text-xs font-mono text-cyan-300 border-cyan-500/30">
                    {p.category}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {p.technologies.slice(0, 3).map((t: string) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                    {p.technologies.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono">+{p.technologies.length - 3}</span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-slate-400">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/projects/${p.id}/edit`}>
                      <Button variant="outline" size="sm" className="h-8 px-2.5 gap-1.5 text-xs">
                        <Edit3 className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Edit</span>
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(p.id)}
                      className="h-8 px-2.5 gap-1.5 text-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Project Deletion">
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            Are you sure you want to delete this project permanently from MongoDB? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" disabled={deleting} onClick={handleDelete} className="gap-2">
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              <span>Confirm Delete</span>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
