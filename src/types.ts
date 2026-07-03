export interface Project {
  id: number | string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  problem: string;
  features: string[];
  contribution: string;
  challenges: string;
  lessons: string;
  github?: string;
  live?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
  iconName?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description?: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface LeadershipItem {
  title: string;
  organization?: string;
  period: string;
  description: string;
}

export interface ScholarshipItem {
  name: string;
  provider: string;
}

export interface CertificateItem {
  name: string;
  provider: string;
  year: string;
  credentialId?: string;
  link?: string;
  file?: string;
}
