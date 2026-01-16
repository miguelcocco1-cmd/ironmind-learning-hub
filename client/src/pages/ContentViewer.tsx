import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft, CheckCircle, Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContentViewer() {
  const [, params] = useRoute("/content/:id");
  const [, setLocation] = useLocation();
  const contentId = params?.id ? parseInt(params.id) : 0;
  const [isCompleted, setIsCompleted] = useState(false);

  const { data: content, isLoading } = trpc.contents.getById.useQuery(
    { id: contentId },
    { enabled: contentId > 0 }
  );

  const { data: progress } = trpc.progress.getContentProgress.useQuery(
    { contentId },
    { enabled: contentId > 0 }
  );

  const markCompleteMutation = trpc.progress.markContentComplete.useMutation();
  const utils = trpc.useUtils();

  useEffect(() => {
    if (progress?.completed) {
      setIsCompleted(true);
    }
  }, [progress]);

  const handleMarkComplete = async () => {
    if (isCompleted) return;

    await markCompleteMutation.mutateAsync({ contentId });
    setIsCompleted(true);
    utils.progress.getMyProgress.invalidate();
    utils.progress.getContentProgress.invalidate({ contentId });
  };

  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()
        : new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center">
          <p className="text-lg text-muted-foreground">Conteúdo não encontrado.</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {/* Content Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              {content.title}
            </h1>
            {content.description && (
              <p className="text-lg text-muted-foreground">{content.description}</p>
            )}
          </div>
          <Button
            variant={isCompleted ? "outline" : "default"}
            onClick={handleMarkComplete}
            disabled={isCompleted}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Concluído
              </>
            ) : (
              "Marcar como Concluído"
            )}
          </Button>
        </div>

        {/* Content Display */}
        <div className="max-w-5xl mx-auto">
          {content.type === "video" && (
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <iframe
                src={getVideoEmbedUrl(content.url)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {content.type === "audio" && (
            <div className="bg-card p-8 rounded-lg border border-border">
              <audio controls className="w-full">
                <source src={content.url} />
                O seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          )}

          {content.type === "pdf" && (
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Documento PDF
                </h2>
                <Button asChild>
                  <a href={content.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Descarregar PDF
                  </a>
                </Button>
              </div>
              <div className="aspect-[8.5/11] w-full bg-muted rounded overflow-hidden">
                <iframe
                  src={`${content.url}#view=FitH`}
                  className="w-full h-full"
                  title={content.title}
                />
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {content.duration && (
          <div className="max-w-5xl mx-auto mt-6">
            <p className="text-sm text-muted-foreground">
              Duração: {Math.floor(content.duration / 60)} minutos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
