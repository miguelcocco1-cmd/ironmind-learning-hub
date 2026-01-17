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

      <div className="container pt-24 pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {/* Cycle Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {cycle.title}
          </h1>
          {cycle.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {cycle.description}
            </p>
          )}
        </div>

        {/* Weeks/Items Grid */}
        {weeks && weeks.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Itens do Ciclo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
