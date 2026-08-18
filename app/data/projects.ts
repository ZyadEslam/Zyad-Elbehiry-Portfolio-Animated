export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  tags?: string[];
  github?: string;
  demo?: string;
}

//   "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png",
//   "https://res.cloudinary.com/darxwbvff/image/upload/v1779096336/ChatGPT_Image_May_14_2026_05_01_24_PM_xbuc3h.png",
//   "https://res.cloudinary.com/darxwbvff/image/upload/v1779096402/Thumbnail_vvmkk3.png",
//   "https://res.cloudinary.com/darxwbvff/image/upload/v1781615314/ChatGPT_Image_Jun_16_2026_04_04_56_PM_tvzaja.png",
//   "https://res.cloudinary.com/darxwbvff/image/upload/v1779096306/ChatGPT_Image_May_16_2026_01_17_42_PM_ppgf8y.png",

// Replace `image` with real assets (e.g. /projects/xxx.jpg) and `href`
// with the real case-study route once you wire up routing.
export const projects: Project[] = [
  {
    id: "01",
    title: "Powerpoint world",
    category:
      "Next.js - React - TypeScript - MongoDB - Mongoose - Paymob - SSR - SSG",
    year: "2026",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1787070135/powerpoint_world_resized_1672x941_zwwsjk.png",
    description:
      "Production-ready e-commerce platform for PowerPoint templates with payments, order tracking, bilingual support, and admin capabilities.",
    github: "#",
    demo: "https://powerpointworld.com/",
  },
  {
    id: "03",
    title: "Military LAN Workforce Management System",
    category: "Product Design",
    year: "2026",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1787070493/ChatGPT_Image_Aug_18_2026_07_27_58_PM_wwqs26.png",
    description:
      "A full-stack web application built for military unit administrators to track daily personnel readiness, manage leave requests, and generate printable reports — all running on a closed LAN without internet dependency. The system supports two roles: Admin (officers) with full CRUD, analytics, and approval workflows, and Soldiers who submit and track their own leave requests. Real-time updates via WebSockets keep the dashboard and request queue in sync across devices on the network. Designed with an Arabic RTL interface, operational UX patterns (filters, status pills, metric cards), and a tactical visual theme suited for day-to-day unit management.",
    github:
      "https://github.com/ZyadEslam/Military-LAN-Workforce-Management-System",
    demo: "#",
  },
  {
    id: "02",
    title: "Espesyal Fashion",
    category:
      "Next.js 15 - TypeScript - Tailwind CSS - NextAuth - MongoDB - Paymob",
    year: "2025",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1779096306/ChatGPT_Image_May_16_2026_01_17_42_PM_ppgf8y.png",
    description:
      "Bilingual women's fashion e-commerce platform including authentication, secure checkout, admin dashboard, and real-time order management.",
    github: "https://github.com/ZyadEslam/Espesyal-fashion",
    demo: "https://espesyal-fashion.vercel.app/",
  },

  {
    id: "04",
    title: "Biblomania System — Store Operations Dashboard",
    category:
      "Next.js - React - MongoDB - Mongoose - Tailwind CSS - REST API - Arabic RTL",
    year: "2025",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png",
    description:
      "Biblomania System is an internal web application for managing day-to-day bookstore operations: customer orders, multi-item book entries, shipping status, and expense tracking. It was designed for Arabic-speaking staff with an RTL-first UI and a visual language aligned with the Biblomania brand.",
    github: "https://github.com/ZyadEslam/Biblomania-Store",
    demo: "#",
  },
  {
    id: "05",
    title: "Graphic Designer's Portfolio",
    category: "Next.js - Tailwind CSS - Framer Motion",
    year: "2025",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1787070135/ChatGPT_Image_Aug_18_2026_07_21_47_PM_dhhxxn.png",
    description:
      "Biblomania System is an internal web application for managing day-to-day bookstore operations: customer orders, multi-item book entries, shipping status, and expense tracking. It was designed for Arabic-speaking staff with an RTL-first UI and a visual language aligned with the Biblomania brand.",
    github: "https://github.com/ZyadEslam/Biblomania-Store",
    demo: "#",
  },
];
