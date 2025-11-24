import Navigation from "@/components/Navigation";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <Navigation />
        {children}
    </div>;
}