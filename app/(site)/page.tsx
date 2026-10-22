import Hero from "@/components/site/Hero";
import Projects from "@/components/site/Projects";
import Experience from "@/components/site/Experience";
import Articles from "@/components/site/Articles";
import ContactCTA from "@/components/site/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Articles />
      <ContactCTA />
    </main>
  );
}
