"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image_url: project?.image_url || "",
    demo_url: project?.demo_url || "",
    github_url: project?.github_url || "",
    technologies: project?.technologies?.join(", ") || "",
    featured: project?.featured || false,
    order_index: project?.order_index || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech);

      const projectData = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url || null,
        demo_url: formData.demo_url || null,
        github_url: formData.github_url || null,
        technologies: technologiesArray,
        featured: formData.featured,
        order_index: formData.order_index,
      };

      if (isEditing && project) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase.from("projects").insert([projectData]);

        if (error) throw error;
      }

      router.push("/admin/dashboard/projects");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert(error.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/projects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-text mb-2">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h1>
        <p className="text-text-secondary">
          {isEditing ? "Update project details" : "Showcase your latest work"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-bg-light rounded-xl p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
              rows={4}
              placeholder="Describe your project"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Project Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://example.com/project-image.jpg"
            />
          </div>

          {/* Demo & GitHub URLs */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-text mb-2 font-medium">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demo_url}
                onChange={(e) =>
                  setFormData({ ...formData, demo_url: e.target.value })
                }
                className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="block text-text mb-2 font-medium">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
                className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Technologies (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="React, Node.js, MongoDB, Tailwind CSS"
              required
            />
          </div>

          {/* Order Index & Featured */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-text mb-2 font-medium">
                Order Index
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) =>
                  setFormData({ ...formData, order_index: parseInt(e.target.value) })
                }
                className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                min="0"
              />
              <p className="text-text-secondary text-sm mt-1">
                Lower numbers appear first
              </p>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-5 h-5 text-primary bg-bg-dark border-bg-lighter rounded focus:ring-primary"
                />
                <span className="text-text">Featured Project</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Save size={20} />
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Project"
                : "Create Project"}
            </button>
            <Link
              href="/admin/dashboard/projects"
              className="inline-flex items-center gap-2 bg-bg-dark hover:bg-bg-lighter text-text font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}


