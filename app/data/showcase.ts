export type Direction = "left" | "right" | "top" | "bottom";

export interface ShowcaseSlide {
  title: string;
  subtitle: string;
  image: string;
  direction: Direction;
}

// Swap `image` for real work. Mix directions freely — the component reads
// whichever four you assign here and reveals each frame accordingly.
export const showcaseSlides: ShowcaseSlide[] = [
  {
    title: "Kinetic Type",
    subtitle: "Motion Design — Reel 01",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2000&auto=format&fit=crop",
    direction: "left",
  },
  {
    title: "Structural Light",
    subtitle: "Architecture — Reel 02",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
    direction: "top",
  },
  {
    title: "Quiet Machines",
    subtitle: "Product Film — Reel 03",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    direction: "right",
  },
  {
    title: "Field Notes",
    subtitle: "Editorial — Reel 04",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2000&auto=format&fit=crop",
    direction: "bottom",
  },
];