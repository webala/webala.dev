import SkillCard from "./SkillCard";
import { Skill } from "@/types";
import { Code2, Palette, Database, Layers, Camera, Wrench } from "lucide-react";

const skills: Skill[] = [
  {
    icon: <Code2 size={40} />,
    title: "UI/UX Web Control",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    icon: <Palette size={40} />,
    title: "App Design",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    icon: <Database size={40} />,
    title: "Back-end Development",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    icon: <Layers size={40} />,
    title: "Web Development",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    icon: <Camera size={40} />,
    title: "Photography",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    icon: <Wrench size={40} />,
    title: "Prototyping",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

export default function SkillSet() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-text-secondary mb-2 uppercase tracking-wider text-sm">
            My work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-primary">Projects</span>-Set
          </h2>
          <div className="w-20 h-1 bg-primary mt-2"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col items-center gap-8">
        <div className="w-4 h-4 rounded-full bg-primary/50"></div>
        <div className="w-1 h-24 bg-primary/30"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
      </div>
    </section>
  );
}
