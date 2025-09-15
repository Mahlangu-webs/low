import { Skill, SoftSkill, ExperienceItem, Certificate, Project } from './types';

export const TECHNICAL_SKILLS: Skill[] = [
  { name: 'HTML & CSS', level: 85 },
  { name: 'SQL Database', level: 75 },
  { name: 'IT Support', level: 75 },
  { name: 'Data Analytics', level: 70 },
  { name: 'CompTIA A+ Concepts', level: 80 },
  { name: 'Network Architecture', level: 70 },
];

export const SOFT_SKILLS: SoftSkill[] = [
  { name: 'Teamwork', icon: '🤝' },
  { name: 'Leadership', icon: '🚀' },
  { name: 'Communication', icon: '🗣️' },
  { name: 'Problem Solving', icon: '💡' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    type: 'Internship',
    title: 'Capaciti',
    institution: '',
    period: 'July 2025 - Present',
    description: 'Gaining practical experience in a dynamic tech environment, applying academic knowledge to real-world projects and collaborating with a team of professionals.',
  },
  {
    type: 'Tertiary Qualification',
    title: 'IIE Diploma in IT Management',
    institution: 'IIE Rosebank College',
    period: '2022 - 2024',
    description: 'Completed a comprehensive diploma covering IT project management, web development fundamentals, and network architecture principles.',
  },
  {
    type: 'Secondary Education',
    title: 'Grade 12',
    institution: 'Pungutsha Secondary School',
    period: '',
    description: 'Successfully completed secondary education, providing a strong foundation for higher learning in Information Technology.',
  },
];

export const AI_CERTIFICATIONS_LIST: Certificate[] = [
  {
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Capaciti',
    date: 'August 7, 2025',
    score: '25/30 (83.33%)',
    link: '/Siyabonga Mahlangu-210267801-Introduction to Artificial Intelligent.pdf',
  },
  {
    title: 'Python Development & AI Foundations',
    issuer: 'Capaciti',
    date: 'August 27, 2025',
    score: '31/40 (77.5%)',
    link: '/Siyabonga Mahlangu-210294360.pdf',
  },
  {
    title: 'AI Essentials',
    issuer: 'Intel and Coursera',
    date: 'August 11, 2025',
    link: 'https://coursera.org/verify/RMQJ9DZHZY32',
  },
  {
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI and Coursera',
    date: 'August 5, 2025',
    link: 'https://coursera.org/verify/C10QW857DIMT',
  },
  {
    title: 'Building AI Powered Chatbots Without Programming',
    issuer: 'IBM and Coursera',
    date: 'August 21, 2025',
    link: 'https://coursera.org/verify/3SKNDIKVMQVE',
  },
  {
    title: 'Chatbot Building Essentials with IBM watsonx Assistant (V2)',
    issuer: 'IBM and Coursera',
    date: 'August 25, 2025',
    link: 'https://www.credly.com/go/4HoFlv6n',
  },
  {
    title: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI and Amazon Web Services',
    date: 'August 18, 2025',
    link: 'https://coursera.org/verify/3URIPKGWHFPL',
  },
  {
    title: 'Introduction to Artificial Intelligence (AI)',
    issuer: 'IBM and Coursera',
    date: 'August 8, 2025',
    link: 'https://coursera.org/verify/6V3A30MOUDE8',
  },
  {
    title: 'AI Foundations: Prompt Engineering with ChatGPT',
    issuer: 'Arizona State University and Coursera',
    date: 'August 19, 2025',
    link: 'https://coursera.org/verify/CGB132KWVLS5',
  },
];

export const PROFESSIONAL_CERTIFICATIONS_LIST: Certificate[] = [
  {
    title: 'Introduction to Personal Branding',
    issuer: 'University of Virginia and Coursera',
    date: 'August 22, 2025',
    link: 'https://coursera.org/verify/25GRPH1A0E84',
  },
  {
    title: 'Leading with Impact: Team Dynamics, Strategy and Ethics',
    issuer: 'Coursera Instructor Network',
    date: 'August 22, 2025',
    link: 'https://coursera.org/verify/31YKZ6FKPFG0',
  },
];


export const PROJECTS: Project[] = [
  {
    title: 'Medi Mind AI Prototype',
    description: 'Designed and prototyped an ethical AI healthcare solution. This app concept securely manages sensitive health data like medication schedules, prioritizing user privacy, data security, and transparency.',
    tags: ['Healthcare AI', 'Prototyping', 'AI Ethics'],
    imageUrl: 'https://placehold.co/600x400/16a34a/white?text=Medi+Mind+AI',
    imageText: 'Medi Mind AI Prototype',
    link: 'https://garb-hut-44763277.figma.site/',
    githubLink: 'https://github.com/Mahlangu-webs'
  },
  {
    title: 'MediMind AI Study Buddy',
    description: 'A concept for a personal AI tutor designed to provide students with tailored support for all subjects. The system would offer interactive lessons, answer questions, and adapt to individual learning styles.',
    tags: ['EdTech', 'AI Tutor', 'Personalized Learning'],
    imageUrl: 'https://placehold.co/600x400/f59e0b/white?text=AI+Study+Buddy',
    imageText: 'AI Study Buddy',
    link: 'https://medimindv2.netlify.app/',
    githubLink: 'https://github.com/Mahlangu-webs'
  },
  {
    title: 'Bias Audit Report',
    description: 'Conducted a comprehensive audit on a hypothetical AI model to identify and report potential biases in its training data and predictions. This report outlines findings and recommends mitigation strategies to ensure fairness.',
    tags: ['AI Ethics', 'Bias Detection', 'Responsible AI'],
    imageUrl: 'https://placehold.co/600x400/dc2626/white?text=Bias+Audit+Report',
    imageText: 'Bias Audit Report',
    link: 'https://github.com/Moraka1952/Bias-Audit-Report/blob/main/Bias_Audit_Report_Analysis.ipynb',
    githubLink: 'https://github.com/Mahlangu-webs'
  },
];