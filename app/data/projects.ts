export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
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
    title: "Northbound",
    category: "Brand Identity",
    year: "2025",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781622417/ChatGPT_Image_Jun_16_2026_06_06_36_PM_dtuyla.png",
    href: "#",
  },
  {
    id: "02",
    title: "Ledger & Co.",
    category: "Web Design",
    year: "2024",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1779096336/ChatGPT_Image_May_14_2026_05_01_24_PM_xbuc3h.png",
    href: "#",
  },
  {
    id: "03",
    title: "Halcyon",
    category: "Product Design",
    year: "2024",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1781615314/ChatGPT_Image_Jun_16_2026_04_04_56_PM_tvzaja.png",
    href: "#",
  },
  {
    id: "04",
    title: "Meridian Studio",
    category: "Art Direction",
    year: "2023",
    image:
      "https://res.cloudinary.com/darxwbvff/image/upload/v1779096306/ChatGPT_Image_May_16_2026_01_17_42_PM_ppgf8y.png",
    href: "#",
  },
];
