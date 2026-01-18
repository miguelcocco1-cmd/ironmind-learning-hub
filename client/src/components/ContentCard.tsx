import { Card } from "@/components/ui/card";
import { Play, CheckCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  thumbnail?: string;
  duration?: number;
  completed?: boolean;
  isAccessible?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ContentCard({
  title,
  thumbnail,
  duration,
  completed = false,
  isAccessible = true,
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
        "relative overflow-hidden bg-card border-border group touch-manipulation transition-transform",
        isAccessible 
          ? "cursor-pointer card-hover active:scale-95" 
          : "cursor-not-allowed opacity-75",
        className
      )}
      onClick={() => isAccessible && onClick?.()}
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
            <Play className="h-10 w-10 md:h-12 md:w-12 text-primary/50" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-12 w-12 md:h-16 md:w-16 text-white" />
        </div>

        {/* Overlay de Bloqueio */}
        {!isAccessible && (
          <div className="absolute inset-0 bg-black/40 z-20 flex flex-col items-center justify-center">
            <div className="bg-black/60 rounded-lg p-4 md:p-6 flex flex-col items-center">
              <Lock className="h-10 w-10 md:h-12 md:w-12 text-white mb-2 md:mb-3" />
              <p className="text-sm md:text-base font-semibold text-white px-2 text-center">Brevemente Disponível</p>
            </div>
          </div>
        )}

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded">
            {formatDuration(duration)}
          </div>
        )}

        {/* Completed Badge */}
        {completed && (
          <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 bg-green-600 text-white rounded-full p-0.5 md:p-1">
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-3 md:p-4">
        <h3 className="text-xs md:text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
      </div>
    </Card>
  );
}
