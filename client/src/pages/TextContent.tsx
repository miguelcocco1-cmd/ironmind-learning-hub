import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function TextContent() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [isCompleted, setIsCompleted] = useState(false);

  const { data: content, isLoading } = trpc.contents.getById.useQuery(
    { id: Number(id) },
    { enabled: !!id }
  );

  const markComplete = trpc.progress.markContentComplete.useMutation({
    onSuccess: () => {
      setIsCompleted(true);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">A carregar...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Conteúdo não encontrado</div>
      </div>
    );
  }

  const handleMarkComplete = () => {
    markComplete.mutate({ contentId: content.id });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation(`/item/${content.weekId}`)}
          >
            ← Voltar
          </Button>
          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted || markComplete.isPending}
            className="gap-2"
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Concluído
              </>
            ) : (
              "Marcar como Concluído"
            )}
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{content.title}</h1>
          {content.description && (
            <p className="text-muted-foreground text-lg">{content.description}</p>
          )}
        </div>

        {/* Text Content Box */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-lg">
          <div 
            className="prose prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 first:prose-h1:mt-0
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
              prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
              prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-li:text-foreground/90 prose-li:mb-2
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic
              prose-hr:border-border prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: content.url }}
          />
        </div>
      </main>
    </div>
  );
}
