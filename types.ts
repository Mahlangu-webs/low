export interface Skill {
  name: string;
  level: number;
}

export interface SoftSkill {
  name: string;
  icon: string;
}

export interface ExperienceItem {
  type: string;
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  score?: string;
  link: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageText: string;
  link?: string;
  githubLink?: string;
}