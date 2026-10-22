import { Github, Linkedin, Mail, Twitter, type LucideProps } from "lucide-react";
import type { SocialId } from "@/lib/content/site";

const icons: Record<SocialId, React.ComponentType<LucideProps>> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
};

export default function SocialIcon({
  id,
  size = 18,
}: {
  id: SocialId;
  size?: number;
}) {
  const Icon = icons[id];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
