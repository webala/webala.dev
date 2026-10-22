import Navigation from "@/components/site/Navigation";
import Footer from "@/components/site/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:btn-base focus:btn-kelp"
      >
        Skip to content
      </a>
      <Navigation />
      <div id="main">{children}</div>
      <Footer />
    </>
  );
}
