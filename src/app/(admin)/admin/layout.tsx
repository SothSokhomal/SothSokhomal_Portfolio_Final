"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "@/components/admin/SessionProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#0b0f19] flex text-slate-100 selection:bg-cyan-500 selection:text-black">
        <AdminSidebar />
        <main className="flex-grow p-8 max-w-7xl mx-auto overflow-y-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
