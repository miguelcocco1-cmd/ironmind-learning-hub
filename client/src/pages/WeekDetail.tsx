import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";

export default function WeekDetail() {
  const [, params] = useRoute("/cycle/:cycleId/week/:weekNumber");
  const [, setLocation] = useLocation();
  const cycleId = params?.cycleId ? parseInt(params.cycleId) : 0;
  const weekNumber = params?.weekNumber ? parseInt(params.weekNumber) : 0;

  const { data: cycle } = trpc.cycles.getById.useQuery(
    { id: cycleId },
    { enabled: cycleId > 0 }
  );

  const { data: allWeeks, isLoading: weeksLoading } = trpc.weeks.listByCycle.useQuery(
    { cycleId },
    { enabled: cycleId > 0 }
  );

  // Filtrar itens da semana específica
  const weekItems = allWeeks?.filter(w => w.weekGroup === weekNumber) || [];

  if (weeksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (weekItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center px-4">
          <p className="text-base md:text-lg text-muted-foreground">Semana não encontrada.</p>
          <Button className="mt-4 touch-manipulation" onClick={() => setLocation(`/cycle/${cycleId}`)}>
            Voltar ao Ciclo
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
          onClick={() => setLocation(`/cycle/${cycleId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Voltar ao Ciclo
        </Button>

        {/* Week Header */}
        <div className="mb-8 md:mb-12">
          <div className="text-sm md:text-base text-muted-foreground mb-2">
            {cycle?.title}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
            Semana {weekNumber}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {weekItems.length} itens • {weekItems.filter(i => i.type === 'topic').length} tópicos • {weekItems.filter(i => i.type === 'exercise').length} exercícios
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {weekItems.map((item) => (
            <ContentCard
              key={item.id}
              title={`${item.type === 'topic' ? 'Tópico' : 'Exercício'} ${item.weekNumber}: ${item.title}`}
              onClick={() => setLocation(`/item/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
