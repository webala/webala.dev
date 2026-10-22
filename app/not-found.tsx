import Link from "next/link";
import Navigation from "@/components/site/Navigation";
import Footer from "@/components/site/Footer";
import Button from "@/components/site/Button";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="container-site flex min-h-[80svh] flex-col items-start justify-center pt-32 pb-24">
        <p className="eyebrow">404 · Nothing at this depth</p>
        <h1 className="heading-lg mt-6">This page drifted away.</h1>
        <p className="mt-6 max-w-[52ch] text-silver-mist">
          The address may have changed, or the post you were after is still a
          draft. Head back to the surface or browse the writing.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="gradient">
            Back home
          </Button>
          <Button href="/blog" variant="ghost">
            Browse writing
          </Button>
        </div>
        <Link href="/#contact" className="link-mist mt-10 text-sm">
          Or tell me what you were looking for
        </Link>
      </main>
      <Footer />
    </>
  );
}
