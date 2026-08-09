import ScrollToPlugin from "gsap/src/ScrollToPlugin";
import gsap from "gsap";
gsap.registerPlugin(ScrollToPlugin);

export const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: `${id}`,
      ease: "power2.inOut",
      offsetY: -80,
    });
  };