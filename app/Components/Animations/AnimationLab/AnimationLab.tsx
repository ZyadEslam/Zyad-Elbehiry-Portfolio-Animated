"use client";

import ScrollPhysics from "./ScrollPhysics";
import LabIntro from "./LabIntro";
import SceneOne from "../SceneOne/SceneOne";



export default function AnimationLab() {
  return (
    <section
      id="animation-lab"
      className="relative overflow-hidden bg-background"
    >
      {/* <LabIntro />
      <ScrollPhysics /> */}
    <SceneOne/>
      {/* Placeholder for next parts */}
      <div className="h-screen" />
    </section>
  );
}