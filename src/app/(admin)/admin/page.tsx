import { getProjects } from "@/actions/projectActions";
import { getMessages } from "@/actions/messageActions";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  MessageSquare,
  MailCheck,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Globe,
  Database,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardOverview() {
  const projects = await getProjects();
  const messages = await getMessages();
  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="gradient" className="font-mono text-[11px]">
              System Operational
            </Badge>
            <span className="text-xs font-mono text-cyan-400">MongoDB Atlas Connected</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">
            Portfolio CRUD Metrics &amp; Visitor Message Inquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/projects/new">
            <Button size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Create Project</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="gap-2 border-slate-700">
              <Globe className="h-4 w-4 text-cyan-400" />
              <span>View Public Site</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <Card className="border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Projects</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FolderKanban className="h-5 w-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">{projects.length}</span>
            <p className="text-xs text-slate-400 mt-1">Live in Bento Grid showcase</p>
          </div>
          <Link href="/admin/projects" className="block pt-2">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs px-0 text-cyan-400 hover:bg-transparent">
              <span>Manage Projects Table</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </Card>

        {/* Metric 2 */}
        <Card className="border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Visitor Messages</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">{messages.length}</span>
            <p className="text-xs text-slate-400 mt-1">Total contact submissions</p>
          </div>
          <Link href="/admin/messages" className="block pt-2">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs px-0 text-cyan-400 hover:bg-transparent">
              <span>Read All Messages</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </Card>

        {/* Metric 3 */}
        <Card className="border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Unread Messages</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MailCheck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-emerald-400">{unreadCount}</span>
            <p className="text-xs text-slate-400 mt-1">Requiring review or reply</p>
          </div>
          <Link href="/admin/messages" className="block pt-2">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs px-0 text-cyan-400 hover:bg-transparent">
              <span>Filter Unread</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </Card>

      </div>

      {/* Recent Activity Table Preview */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-4">
        <h3 className="font-bold text-lg text-white">Recent Projects Summary</h3>
        <div className="space-y-3">
          {projects.slice(0, 4).map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-900">
              <div>
                <h4 className="font-semibold text-sm text-white">{p.title}</h4>
                <p className="text-xs font-mono text-slate-400">{p.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {p.technologies.slice(0, 2).join(", ")}
                </Badge>
                <Link href={`/admin/projects/${p.id}/edit`}>
                  <Button variant="outline" size="sm" className="text-xs h-7 px-2.5">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
