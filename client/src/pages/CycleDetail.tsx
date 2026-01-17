import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";

export default function CycleDetail() {
  const [, params] = useRoute("/cycle/:id");
  const [, setLocation] = useLocation();
  const cycleId = params?.id ? parseInt(params.id) : 0;

  const { data: cycle, isLoading: cycleLoading } = trpc.cycles.getById.useQuery(
    { id: cycleId },
    { enabled: cycleId > 0 }
  );

  const { data: weeks, isLoading: weeksLoading } = trpc.weeks.listByCycle.useQuery(
    { cycleId },
    { enabled: cycleId > 0 }
  );

  if (cycleLoading || weeksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!cycle) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center">
          <p className="text-lg text-muted-foreground">Ciclo não encontrado.</p>
          <Button className="mt-4" onClick={() => setLocation("/")}>
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
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Voltar
        </Button>

        {/* Cycle Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
            {cycle.title}
          </h1>
          {cycle.description && (
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {cycle.description}
            </p>
          )}
        </div>

        {/* Weeks/Items Grid */}
        {weeks && weeks.length > 0 ? (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Itens do Ciclo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {weeks.map((week) => (
                <ContentCard
                  key={week.id}
                  title={`${week.type === 'topic' ? 'Tópico' : 'Exercício'} ${week.weekNumber}: ${week.title}`}
                  onClick={() => setLocation(`/week/${week.id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Nenhum item disponível neste ciclo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
