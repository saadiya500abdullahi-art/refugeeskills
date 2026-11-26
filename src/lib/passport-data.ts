export type Profile = {
  name: string;
  title: string;
  region: string;
  summary: string;
  skills: string[];
  years: string;
  education: string;
  languages: string;
  experience: string;
  goals: string;
  contact: string;
};
export type Project = {
  id: string;
  title: string;
  description: string;
  skills: string;
  link: string;
  date: string;
  evidence: string;
};
export type DemoState = {
  profile: Profile;
  projects: Project[];
  assessments: Record<string, string>;
  mentorRequests: string[];
};
export const emptyProfile: Profile = {
  name: "",
  title: "",
  region: "",
  summary: "",
  skills: [],
  years: "",
  education: "",
  languages: "",
  experience: "",
  goals: "",
  contact: "Do not share contact details",
};
export const initialState: DemoState = {
  profile: emptyProfile,
  projects: [],
  assessments: {},
  mentorRequests: [],
};
export const completion = (p: Profile) =>
  Math.round(
    ([
      p.name,
      p.title,
      p.summary,
      p.skills.length > 0,
      p.years,
      p.education,
      p.languages,
      p.experience,
      p.goals,
      p.region,
    ].filter(Boolean).length /
      10) *
      100,
  );
export const canRequestContact = (consent: boolean) => consent;
export const assessmentLabel = (submitted: boolean) =>
  submitted ? "Completed · Self-assessed" : "Not started";
export const opportunities = [
  {
    id: "1",
    title: "Frontend Developer Internship",
    org: "Open Horizons Studio",
    category: "Internship",
    location: "Remote",
    skill: "Web development",
    description: "Build accessible digital experiences with a supportive product team.",
    duration: "3 months",
    tag: "Flexible hours",
  },
  {
    id: "2",
    title: "Digital Skills Fellowship",
    org: "Bridge Forward Collective",
    category: "Fellowship",
    location: "Berlin, Germany",
    skill: "Data analysis",
    description: "Develop your data skills through practical projects and peer learning.",
    duration: "6 months",
    tag: "Learning stipend",
  },
  {
    id: "3",
    title: "Community Translation Partner",
    org: "Language Together",
    category: "Remote work",
    location: "Remote",
    skill: "Translation",
    description: "Make essential community resources accessible across languages.",
    duration: "Part-time",
    tag: "Remote friendly",
  },
  {
    id: "4",
    title: "Project Management Essentials",
    org: "Pathways Learning",
    category: "Training",
    location: "Online",
    skill: "Project management",
    description: "Strengthen your delivery skills through a practical learning program.",
    duration: "8 weeks",
    tag: "No cost",
  },
  {
    id: "5",
    title: "Career Mentor Matching",
    org: "Skills Without Borders",
    category: "Mentorship",
    location: "Remote",
    skill: "Engineering",
    description: "Connect with a professional mentor in your field and plan your next step.",
    duration: "12 weeks",
    tag: "One-to-one",
  },
  {
    id: "6",
    title: "Junior Product Designer",
    org: "Common Ground Design",
    category: "Entry-level job",
    location: "Amsterdam, Netherlands",
    skill: "Design",
    description: "Bring your perspective to a team creating thoughtful community products.",
    duration: "Full-time",
    tag: "Inclusive hiring",
  },
];
export const mentors = [
  {
    id: "m1",
    name: "Amara Okafor",
    title: "Senior Product Designer",
    initials: "AO",
    category: "Design",
    topics: ["Portfolio review", "Career transitions"],
    bio: "Helping emerging designers turn their experience into a compelling portfolio.",
    years: "9 years of experience",
  },
  {
    id: "m2",
    name: "Daniel Hassan",
    title: "Software Engineering Lead",
    initials: "DH",
    category: "Engineering",
    topics: ["Technical interviews", "Web development"],
    bio: "Building confidence, practical skills and pathways into engineering teams.",
    years: "12 years of experience",
  },
  {
    id: "m3",
    name: "Sofia Martins",
    title: "People & Talent Partner",
    initials: "SM",
    category: "Career development",
    topics: ["CV & applications", "Professional networks"],
    bio: "Supporting professionals to tell their story and navigate a new job market.",
    years: "8 years of experience",
  },
];
export const candidates = [
  {
    id: "c1",
    name: "Leila Ahmed",
    title: "UX / UI Designer",
    initials: "LA",
    category: "Design",
    skills: ["Design", "Figma", "User research"],
    summary:
      "A thoughtful designer with six years of experience creating accessible digital products.",
    project: "Accessible community services app",
    evidence: "Research interviews, wireframes and a tested interactive prototype.",
    consent: true,
  },
  {
    id: "c2",
    name: "Yusuf Kareem",
    title: "Frontend Developer",
    initials: "YK",
    category: "Engineering",
    skills: ["Web development", "React", "TypeScript"],
    summary: "An experienced developer building fast, inclusive and maintainable web applications.",
    project: "Multilingual learning platform",
    evidence: "React application, accessibility audit and performance report.",
    consent: false,
  },
  {
    id: "c3",
    name: "Nadia Tesfaye",
    title: "Data Analyst",
    initials: "NT",
    category: "Data",
    skills: ["Data analysis", "Python", "SQL"],
    summary: "Turning complex information into useful insights for people and communities.",
    project: "Community transport insights",
    evidence: "Anonymized dataset, Python notebook and an interactive dashboard.",
    consent: true,
  },
];
