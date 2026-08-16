export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
}

// Swap `image` for your real assets — anything with a stable aspect ratio
// works, since each card enforces `aspect-[3/4]` regardless of the
// source image's natural size.
export const SERVICES: ServiceItem[] = [
  {
    id: "strategy",
    index: "01",
    title: "Brand Strategy",
    description: "Positioning, voice, and a visual system that actually holds together under pressure.",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png"
  },
  {
    id: "design",
    index: "02",
    title: "Web Design",
    description: "Interfaces that look inevitable in hindsight — not just on-trend for a season.",
 image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png"
  },
  {
    id: "development",
    index: "03",
    title: "Development",
    description: "Fast, accessible builds engineered to survive real users, not just a demo.",
 image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png"
  },
  {
    id: "motion",
    index: "04",
    title: "Motion & Animation",
    description: "Micro-interactions and scroll storytelling with real narrative intent.",
 image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png"
  },
  {
    id: "growth",
    index: "05",
    title: "SEO & Growth",
    description: "Technical foundations that make the rest of the work findable.",
 image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png"
  },
];