"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content/site";
import Button from "./Button";
import SocialIcon from "./SocialIcon";

interface FormData {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot — humans never see it
}

type Status = "idle" | "success" | "error";

export default function ContactCTA() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 8000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="container-site scroll-mt-24 py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="recessed grid grid-cols-1 gap-14 px-7 py-16 md:px-14 md:py-24 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-30">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="heading-lg mt-5">
            Let&rsquo;s build something that holds up.
          </h2>
          <p className="mt-6 max-w-[48ch] text-silver-mist">
            Need an engineer who can architect, ship and run a system that
            handles real money and real traffic? I&rsquo;m open to lead and senior
            roles, and to selected freelance work.
          </p>

          <ul className="mt-10 flex flex-col">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target={s.id === "email" ? undefined : "_blank"}
                  rel={s.id === "email" ? undefined : "noopener noreferrer"}
                  className="group flex items-center justify-between gap-6 border-t border-white/10 py-4 last:border-b"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-silver-mist">
                      <SocialIcon id={s.id} />
                    </span>
                    <span className="flex flex-col">
                      <span className="caption text-slate-deep">{s.label}</span>
                      <span className="text-[15px] text-liquid-mist">{s.handle}</span>
                    </span>
                  </span>
                  <span className="arrow-btn" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="caption text-silver-mist">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className="field"
              aria-invalid={errors.name ? true : undefined}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-ash">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="caption text-silver-mist">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="field"
              aria-invalid={errors.email ? true : undefined}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-ash">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="caption text-silver-mist">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={6}
              placeholder="What are you building, and when?"
              className="field resize-none"
              aria-invalid={errors.message ? true : undefined}
              {...register("message", {
                required: "A message is required",
                minLength: {
                  value: 10,
                  message: "Tell me a little more — at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <p className="text-sm text-ash">{errors.message.message}</p>
            )}
          </div>

          {/* Honeypot: hidden from people, tempting to bots. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>

          <div className="mt-2 flex flex-col items-start gap-4">
            <Button type="submit" variant="gradient" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message"}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </Button>
            <p role="status" aria-live="polite" className="text-sm text-liquid-mist">
              {status === "success" &&
                "Received — I’ll get back to you within a day or two."}
              {status === "error" && (
                <>
                  Something went wrong sending that. Email me directly at{" "}
                  <a href={`mailto:${site.email}`} className="link-mist">
                    {site.email}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
