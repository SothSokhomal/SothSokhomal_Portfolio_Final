import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { initialProjectsData } from "../src/data/portfolioData";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "soth.vannakrothchansokhomal@gmail.com";
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin123456";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Soth Vannak RothChansokhomal",
      role: "ADMIN",
    },
  });

  console.log(`Admin user created/verified: ${admin.email}`);

  // 2. Seed Initial Projects
  const existingProjectsCount = await prisma.project.count();
  if (existingProjectsCount === 0) {
    console.log("Seeding initial 6 projects...");
    for (const proj of initialProjectsData) {
      await prisma.project.create({
        data: {
          title: proj.title,
          category: proj.category,
          technologies: proj.technologies,
          description: proj.description,
          problem: proj.problem,
          features: proj.features,
          contribution: proj.contribution,
          challenges: proj.challenges,
          lessonsLearned: proj.lessonsLearned,
          githubUrl: proj.githubUrl || null,
          liveUrl: proj.liveUrl || null,
          featured: proj.featured ?? true,
        },
      });
    }
    console.log("Projects successfully seeded into MongoDB!");
  } else {
    console.log(`Database already has ${existingProjectsCount} projects. Skipping project seeding.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
