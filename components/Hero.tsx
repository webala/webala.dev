"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  //   const scrollToContact = () => {
  //     document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  //   };

  const router = useRouter();

  const scrollToProjects = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToResume = () => {
    router.push("/resume");
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl w-full">
        <div className="flex items-center justify-between gap-12">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hello, I'm
              <br />
              <span className=" text-primary">Daniel Webala</span>
            </h1>

            <p>
              A software engineer specializing in building scalable web
              applications. I'm currently building{" "}
              <Link
                href="https://app.swift9os.com"
                target="_blank"
                className="text-primary"
              >
                {" "}
                Swift Pos
              </Link>
              , a digital point of sale system that supports a wide range of
              businesses and business operations ie sales, inventory, customers,
              purchase orders, reporting and analytics, role based access
              contol, payment processing among other features.
            </p>

            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-3">
              <button onClick={navigateToResume} className="bg-primary hover:bg-primary-dark text-white px-8 py-2 rounded-md transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
                View Resume
              </button>

              <button
                onClick={scrollToProjects}
                className="bg-transparent border border-primary text-white px-8 py-2 rounded-md transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50"
              >
                My Projects
              </button>
            </div>
          </div>

          {/* Right Decorative Elements */}
          <div className="hidden lg:flex justify-end items-center relative bottom-10">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0">
                <div className="flex flex-col items-center gap-8">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-1 h-16 bg-primary/30"></div>
                  <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
                  <div className="w-1 h-16 bg-primary/30"></div>
                  <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
