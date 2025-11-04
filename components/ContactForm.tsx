"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactMessage } from "@/types";
import { ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-16 text-center flex flex-col items-start ">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Connect</span> with me
            </h2>
            <p>
              Need a senior engineer who can architect scalable systems and lead
              technical teams?{" "}
            </p>
            <p>I'm here to deliver.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-bg-light border border-bg-lighter rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
              />
              {errors.name && (
                <p className="text-primary text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 bg-bg-light border border-bg-lighter rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
              />
              {errors.email && (
                <p className="text-primary text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                rows={6}
                placeholder="Your Message"
                className="w-full px-6 py-4 bg-bg-light border border-bg-lighter rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
              />
              {errors.message && (
                <p className="text-primary text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
              >
                <span>{isSubmitting ? "Sending..." : "Stay Connected"}</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <p className="text-green-500 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-primary text-sm">
                  Failed to send message. Please try again or check your
                  Supabase configuration.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col items-center gap-8">
        <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
        <div className="w-1 h-24 bg-primary/30"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
        <div className="w-1 h-24 bg-primary/30"></div>
        <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
      </div> */}
    </section>
  );
}
