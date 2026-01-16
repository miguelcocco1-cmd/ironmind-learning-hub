import { ContentCard } from "./ContentCard";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Content {
  id: number;
  title: string;
  thumbnailUrl?: string | null;
  duration?: number | null;
  completed?: boolean;
}

interface ModuleRowProps {
  title: string;
  contents: Content[];
  onContentClick: (contentId: number) => void;
  onViewAll?: () => void;
}

export function ModuleRow({
  title,
  contents,
  onContentClick,
  onViewAll,
}: ModuleRowProps) {
  if (contents.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {onViewAll && (
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={onViewAll}
          >
            Ver Tudo
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative px-4 md:px-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {contents.map((content) => (
            <div key={content.id} className="flex-none w-64 md:w-80">
              <ContentCard
                title={content.title}
                thumbnail={content.thumbnailUrl || undefined}
                duration={content.duration || undefined}
                completed={content.completed}
                onClick={() => onContentClick(content.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
