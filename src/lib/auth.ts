import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const adminEmail = process.env.ADMIN_EMAIL || "soth.vannakrothchansokhomal@gmail.com";

        // Security check: restrict admin access strictly to soth.vannakrothchansokhomal@gmail.com
        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) {
          throw new Error("Unauthorized: Only the portfolio owner can access the admin dashboard.");
        }

        let user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user) {
          const defaultPassword = process.env.ADMIN_PASSWORD || "admin123456";
          if (credentials.password === defaultPassword) {
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            user = await prisma.user.create({
              data: {
                email: credentials.email.toLowerCase(),
                password: hashedPassword,
                name: "Soth Vannak RothChansokhomal",
                role: "ADMIN",
              },
            });
          } else {
            throw new Error("Invalid password credentials.");
          }
        } else {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid password credentials.");
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-nextauth-key-soth-sokhomal-2026",
};
