import { Home, ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const items = [
    { label: "Courses", href: "#" },
    { label: "Web Development", href: "#" },
    {
      label: "The Complete Guide to Mastering Framer",
      href: "#",
      active: true,
    },
  ];

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Home className="w-4 h-4" />
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          <a
            href={item.href}
            className={`hover:text-foreground transition-colors ${
              item.active ? "text-foreground font-medium" : ""
            }`}
          >
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
