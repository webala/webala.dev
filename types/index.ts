export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  created_at: string;
  order_index?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  featured: boolean;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  reading_time?: number;
  tags?: string[];
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  read?: boolean;
  created_at?: string;
}

export interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
}
