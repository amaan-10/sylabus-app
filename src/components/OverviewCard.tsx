import {
  BarChart3,
  Pencil,
  Clock,
  FileText,
  Award,
  Calendar,
  Plus,
} from "lucide-react";
import Image from "next/image";

const OverviewCard = () => {
  const details = [
    { icon: BarChart3, label: "Expert" },
    { icon: Pencil, label: "10 Lessons" },
    { icon: Clock, label: "3+ Hours of video content" },
    { icon: FileText, label: "3 File resources" },
    { icon: Award, label: "Certificate of Completion" },
    { icon: Calendar, label: "Added: 20/09/2025" },
  ];

  const topics = ["Framer", "Web Development"];

  return (
    <div className="content-card space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground mb-2">Overview:</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Build visually stunning, fully responsive websites that adapt
            seamlessly to any device.
          </p>
        </div>
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Plus className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Course Details:</h4>
        <ul className="space-y-2">
          {details.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2.5 text-sm text-muted-foreground"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Topics:</h4>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span key={topic} className="badge-topic">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Teacher:</h4>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <Image
              src=""
              alt="Michel Green"
              className="w-full h-full object-cover"
              width={36}
              height={36}
            />
          </div>
          <span className="text-sm font-medium text-foreground">
            Michel Green
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
