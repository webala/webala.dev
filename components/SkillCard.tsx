import { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="bg-bg-light rounded-lg p-6 hover:bg-bg-lighter transition-all duration-300 hover:scale-105 group">
      <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
        {skill.icon}
      </div>
      <h3 className="text-text text-lg font-semibold mb-2">{skill.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {skill.description}
      </p>
    </div>
  );
}
