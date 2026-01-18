import { Card } from "@/components/ui/card";
import { Play, FileText, Headphones, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

interface Content {
  id: number;
  title: string;
  description?: string | null;
  type: "video" | "audio" | "pdf";
  duration?: number | null;
  thumbnailUrl?: string | null;
  completed?: boolean;
}

interface WeekSectionProps {
  weekNumber: number;
  title: string;
  description?: string | null;
  contents: Content[];
}

export function WeekSection({ weekNumber, title, description, contents }: WeekSectionProps) {
  const [, setLocation] = useLocation();

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-5 w-5" />;
      case "audio":
        return <Headphones className="h-5 w-5" />;
      case "pdf":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="mb-12">
      {/* Week Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Semana {weekNumber}: {title}
        </h2>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Contents Grid */}
      {contents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content) => (
            <Card
              key={content.id}
              className="p-5 hover:border-primary transition-colors cursor-pointer bg-card border-border group"
              onClick={() => setLocation(`/content/${content.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                  {getContentIcon(content.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {content.title}
                  </h3>
                  {content.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {content.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="capitalize">{content.type}</span>
                    {content.completed && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Concluído</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-muted-foreground">
            Nenhum conteúdo disponível nesta semana.
          </p>
        </Card>
      )}
    </div>
  );
}
