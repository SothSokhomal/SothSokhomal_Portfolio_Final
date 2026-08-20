"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Globe,
  LogOut,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects CRUD", href: "/admin/projects", icon: FolderKanban },
    { label: "Add New Project", href: "/admin/projects/new", icon: PlusCircle },
    { label: "Visitor Messages", href: "/admin/messages", icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between p-5 min-h-screen sticky top-0">
      <div className="space-y-8">
        
        {/* Admin Header Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">Admin Control</h2>
            <p className="text-[11px] font-mono text-cyan-400">Owner Portal</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="pt-6 border-t border-slate-900 space-y-4">
        {session?.user && (
          <div className="px-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Signed in as:</span>
            <p className="text-xs font-semibold text-slate-200 truncate">{session.user.email}</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs border-slate-800">
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              <span>Public Portfolio</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full justify-start gap-2 text-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
