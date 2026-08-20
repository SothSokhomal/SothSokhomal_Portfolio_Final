import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soth Vannak RothChansokhomal | Senior Software Developer Portfolio",
  description:
    "High-performance full-stack portfolio and private admin dashboard built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Prisma ORM + MongoDB Atlas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0b0f19] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
