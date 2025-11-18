import Hero from "@/components/Hero";
import SkillSet from "@/components/SkillSet";
import Projects from "@/components/Projects";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import ContactForm from "@/components/ContactForm";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <Hero />
      {/* <SkillSet /> */}
      <Projects />
      <FeaturedBlogs />
      <ContactForm />
    </main>
  );
}
