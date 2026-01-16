import { Card } from "@/components/ui/card";
import { Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  thumbnail?: string;
  duration?: number;
  completed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ContentCard({
  title,
  thumbnail,
  duration,
  completed = false,
  onClick,
  className,
}: ContentCardProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer card-hover bg-card border-border group",
        className
      )}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Play className="h-12 w-12 text-primary/50" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-16 w-16 text-white" />
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(duration)}
          </div>
        )}

        {/* Completed Badge */}
        {completed && (
          <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </Card>
  );
}
