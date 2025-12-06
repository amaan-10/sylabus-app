import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  icon: ReactNode;
  items: string[];
}

const ContentSection = ({ title, icon, items }: ContentSectionProps) => {
  return (
    <div className="content-card">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-foreground text-lg">{title}</h3>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentSection;
