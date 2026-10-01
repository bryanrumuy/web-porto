export type Tone = "violet" | "pink" | "cyan" | "amber";

export const profile = {
  name: "Bryan Rumuy",
  role: "Data Science and Artificial Intelligence",
  tagline:
    "Graduate who builds data-driven models and web systems for real business needs.",
  facts: [
    { label: "Based in", value: "Surabaya, Indonesia" },
    { label: "Experience", value: "2 client projects delivered" },
    { label: "Open to", value: "Data Scientist and Web Developer roles" },
  ],
  location: "Surabaya, Indonesia",
  email: "rumuybryan@gmail.com",
  linkedinHref: "https://www.linkedin.com/in/bryanrumuy",
  summary:
    "Data Science graduate from Universitas Surabaya with a TensorFlow Developer Certificate and hands-on experience across web development and machine learning. I build full-stack systems, from database design to workflow implementation and testing, to solve real operational problems with practical, well-tested software.",
  seeking: "Open to roles as Data Scientist or Web Developer.",
} as const;

export const education = {
  school: "Universitas Surabaya",
  period: "Aug 2022 - Aug 2026",
  degree:
    "Bachelor's Degree in Informatics Engineering, specialization in Data Science and Artificial Intelligence",
} as const;

export const projects = [
  {
    title: "Office Finance System",
    context: "Freelance, Feb 2026 - Apr 2026",
    tone: "violet",
    description:
      "A web-based financial management system that replaced manual office bookkeeping with one centralized digital workflow.",
    points: [
      "Tracking for income, expenses, and transaction records",
      "Features and user flows customized to direct client requirements",
      "Iterative testing and debugging for accurate, reliable data",
      "Delivered solo, from requirements gathering to deployment",
    ],
  },
  {
    title: "Sales & Purchase Information System",
    context: "FL Beauty, Jan 2026 - Jul 2026",
    tone: "pink",
    description:
      "A web-based system that manages product data, inventory, sales, and purchase transactions for a business client.",
    points: [
      "Computerized transaction recording to reduce manual errors",
      "Structured monitoring of sales and purchases",
      "Workflows and database structures designed from business requirements",
      "Functional testing for accurate transaction processing",
    ],
  },
] as const;

export const skills = [
  {
    group: "Data Science & Machine Learning",
    tone: "cyan",
    items: ["Python", "TensorFlow", "Machine Learning", "Data Analysis", "Pandas", "NumPy"],
  },
  {
    group: "Web Development",
    tone: "violet",
    items: ["PHP", "Laravel", "HTML & CSS", "Bootstrap", "C#"],
  },
  {
    group: "Database & Tools",
    tone: "amber",
    items: ["MySQL", "Git & GitHub", "AI-Assisted Development", "Microsoft Office"],
  },
] as const;
