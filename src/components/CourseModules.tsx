import { useState } from "react";
import { CheckSquare, ChevronDown } from "lucide-react";

const modules = [
  {
    title: "Module 1: Introduction to Framer",
    content:
      "Get started with Framer basics, understanding the interface, and setting up your first project.",
  },
  {
    title: "Module 2: Building Your First Layout",
    content:
      "Learn how to create responsive layouts using Framer's powerful layout tools and grid system.",
  },
  {
    title: "Module 3: Styling & Components",
    content:
      "Master styling techniques and learn to create reusable components for consistent designs.",
  },
  {
    title: "Module 4: Adding Interactions & Animations",
    content:
      "Bring your designs to life with smooth animations and interactive elements.",
  },
  {
    title: "Module 5: Media & Integrations",
    content:
      "Add images, videos, and integrate third-party services into your Framer projects.",
  },
  {
    title: "Module 6: Prototyping & Collaboration",
    content:
      "Create interactive prototypes and collaborate effectively with your team.",
  },
  {
    title: "Module 7: Publishing Your Website",
    content:
      "Learn the publishing process and how to deploy your Framer site to the web.",
  },
  {
    title: "Module 8: SEO & Site Optimization",
    content:
      "Optimize your site for search engines and improve performance metrics.",
  },
  {
    title: "Module 9: Advanced Workflows & Customization",
    content:
      "Explore advanced features, custom code, and professional workflows.",
  },
  {
    title: "Module 10: Monetization & Growth with Framer",
    content:
      "Learn strategies to monetize your skills and grow your Framer business.",
  },
];

const CourseModules = () => {
  // Single-item accordion behavior
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id)); // collapsible
  };

  return (
    <div className="content-card">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-foreground text-lg">
          Course Modules:
        </h3>
        <CheckSquare className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        {modules.map((module, index) => {
          const id = `module-${index}`;
          const isOpen = openItem === id;

          return (
            <div key={id} className="border-0 rounded-lg">
              <button
                type="button"
                onClick={() => handleToggle(id)}
                className={`flex w-full items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left hover:no-underline ${
                  isOpen ? "rounded-b-none" : ""
                }`}
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
                id={`${id}-trigger`}
              >
                <span className="text-sm font-medium text-foreground text-left">
                  {module.title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`${id}-content`}
                  role="region"
                  aria-labelledby={`${id}-trigger`}
                  className="bg-muted/30 px-4 rounded-b-lg"
                >
                  <p className="text-sm text-muted-foreground pt-2">
                    {module.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseModules;
