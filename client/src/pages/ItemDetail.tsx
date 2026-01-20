import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveCountdown } from "@/components/LiveCountdown";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft, Play, FileText, Headphones, CheckCircle, Lock } from "lucide-react";

export default function ItemDetail() {
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  const itemId = params?.id ? parseInt(params.id) : 0;

  const { data: item, isLoading: itemLoading } = trpc.weeks.getById.useQuery(
    { id: itemId },
    { enabled: itemId > 0 }
  );

  const { data: contents, isLoading: contentsLoading } = trpc.contents.listByWeek.useQuery(
    { weekId: itemId },
    { enabled: itemId > 0 }
  );

  const { data: exercises, isLoading: exercisesLoading } = trpc.exercises.listByWeek.useQuery(
    { weekId: itemId },
    { enabled: itemId > 0 }
  );

  const { data: progress } = trpc.progress.getMyProgress.useQuery();

  const progressMap = new Map(
    progress?.map((p) => [p.contentId, p.completed]) || []
  );

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

  if (itemLoading || contentsLoading || exercisesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center px-4">
          <p className="text-base md:text-lg text-muted-foreground">Item não encontrado.</p>
          <Button className="mt-4 touch-manipulation" onClick={() => setLocation("/")}>
            Voltar à Página Inicial
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-20 md:pt-24 pb-8 md:pb-12 px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 md:mb-6 touch-manipulation"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Voltar
        </Button>

        {/* Item Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="text-sm md:text-base text-muted-foreground">
              {item.type === 'live' ? '🔴 AULA AO VIVO' : 
               item.type === 'topic' ? `Tópico ${item.weekNumber}` : 
               `Exercício ${item.weekNumber}`}
            </div>
            {item.type === 'live' && item.liveDate && (
              <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                <LiveCountdown liveDate={new Date(item.liveDate)} />
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
            {item.title}
          </h1>
          {item.description && (
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Tabs for Contents and Exercises */}
        <Tabs defaultValue="contents" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contents">Conteúdos</TabsTrigger>
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
          </TabsList>

          {/* Contents Tab */}
          <TabsContent value="contents">
            {contents && contents.length > 0 ? (
              <div className="grid gap-4">
                {contents.map((content) => {
                  const isCompleted = progressMap.get(content.id) || false;
                  
                  // Se for tipo 'text', exibir inline
                  if (content.type === 'text') {
                    return (
                      <Card key={content.id} className="p-6 md:p-8 relative">
                        {!content.isAccessible && (
                          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 rounded-lg flex flex-col items-center justify-center">
                            <Lock className="h-10 w-10 md:h-12 md:w-12 text-white/80 mb-2 md:mb-3" />
                            <p className="text-base md:text-lg font-semibold text-white">Brevemente Disponível</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {content.title}
                          </h3>
                          {isCompleted && (
                            <div className="text-green-600">
                              <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
                            </div>
                          )}
                        </div>
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
                      </Card>
                    );
                  }
                  
                  // Para outros tipos, manter comportamento de clique
                  return (
                    <Card
                      key={content.id}
                      className={`p-4 md:p-6 transition-colors touch-manipulation relative ${
                        content.isAccessible 
                          ? 'hover:border-primary cursor-pointer' 
                          : 'cursor-not-allowed opacity-75'
                      }`}
                      onClick={() => {
                        if (!content.isAccessible) return;
                        if (content.type === 'quiz') {
                          setLocation(`/quiz/${content.id}`);
                        } else {
                          setLocation(`/content/${content.id}`);
                        }
                      }}
                    >
                      {/* Overlay de Bloqueio */}
                      {!content.isAccessible && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 rounded-lg flex flex-col items-center justify-center">
                          <Lock className="h-10 w-10 md:h-12 md:w-12 text-white/80 mb-2 md:mb-3" />
                          <p className="text-base md:text-lg font-semibold text-white">Brevemente Disponível</p>
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 md:gap-4 flex-1">
                          <div className="p-2 md:p-3 bg-primary/10 rounded-lg text-primary">
                            {getContentIcon(content.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-foreground">
                              {content.title}
                            </h3>
                            {content.description && (
                              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                {content.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                              <span className="capitalize">{content.type}</span>
                            </div>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="text-green-600">
                            <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 md:py-20">
                <p className="text-base md:text-lg text-muted-foreground">
                  Nenhum conteúdo disponível neste item.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises">
            {exercises && exercises.length > 0 ? (
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className="p-4 md:p-6 hover:border-primary transition-colors cursor-pointer touch-manipulation"
                    onClick={() => setLocation(`/exercise/${exercise.id}`)}
                  >
                    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-foreground">
                      {exercise.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {exercise.description}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-20">
                <p className="text-base md:text-lg text-muted-foreground">
                  Nenhum exercício disponível neste item.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
