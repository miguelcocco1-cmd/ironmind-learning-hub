import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft, ChevronRight, Lock } from "lucide-react";

export default function CycleDetail() {
  const [, params] = useRoute("/cycle/:id");
  const [, setLocation] = useLocation();
  const cycleId = params?.id ? parseInt(params.id) : 0;

  const { data: cycle, isLoading: cycleLoading } = trpc.cycles.getById.useQuery(
    { id: cycleId },
    { enabled: cycleId > 0 }
  );

  const { data: allWeeks, isLoading: weeksLoading } = trpc.weeks.listByCycle.useQuery(
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
        <div className="container pt-24 text-center px-4">
          <p className="text-base md:text-lg text-muted-foreground">Ciclo não encontrado.</p>
          <Button className="mt-4 touch-manipulation" onClick={() => setLocation("/")}>
            Voltar à Página Inicial
          </Button>
        </div>
      </div>
    );
  }

  // Para o ciclo de Introdução (order=0), mostrar secções personalizadas
  const isIntroduction = cycle?.order === 0;
  
  // Agrupar itens por semana (weekGroup 1-4) ou criar cards personalizados para Introdução
  const weekGroups = isIntroduction 
    ? [1, 2, 3, 4].map(weekNum => {
        const items = allWeeks?.filter(w => w.weekGroup === weekNum) || [];
        const item = items[0]; // Cada weekGroup tem 1 item com weekName personalizado
        return {
          weekNumber: weekNum,
          title: item?.weekName || item?.title || `Secção ${weekNum}`,
          description: item?.description || '',
          items,
          totalItems: items.length,
          topics: items.filter(i => i.type === 'topic').length,
          exercises: 0,

        };
      })
    : [1, 2, 3, 4].map(weekNum => {
        const items = allWeeks?.filter(w => w.weekGroup === weekNum) || [];
        const firstItem = items[0];
        return {
          weekNumber: weekNum,
          items,
          totalItems: items.length,
          topics: items.filter(i => i.type === 'topic').length,
          exercises: items.filter(i => i.type === 'exercise').length,

        };
      });

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

        {/* 4 Semanas ou Secções */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">
            {isIntroduction ? "Secções" : "4 Semanas do Ciclo"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {weekGroups.map((week) => (
              <Card
                key={week.weekNumber}
                onClick={() => setLocation(`/cycle/${cycleId}/week/${week.weekNumber}`)}
                className="group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden border-2 border-border bg-card touch-manipulation relative"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ backgroundImage: `url(/week-${week.weekNumber}-bg.jpg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                <div className="relative z-10 p-6 md:p-8">
                  {/* Week Number */}
                  <div className="text-5xl md:text-6xl font-bold mb-3 md:mb-4 text-white/40 group-hover:text-white/60 transition-colors">
                    {week.weekNumber}
                  </div>

                  {/* Week Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white group-hover:text-primary transition-colors leading-tight">
                    {isIntroduction ? (week as any).title : `Semana ${week.weekNumber}`}
                  </h3>
                  {isIntroduction && (week as any).description && (
                    <p className="text-sm md:text-base text-white/70 mb-3 md:mb-4 line-clamp-2">
                      {(week as any).description}
                    </p>
                  )}

                  {/* Week Stats */}
                  <div className="space-y-2 mb-4 md:mb-6">
                    <p className="text-sm md:text-base text-white/80">
                      {week.totalItems} itens totais
                    </p>
                    <div className="flex gap-4 text-xs md:text-sm text-white/70">
                      <span>{week.topics} tópicos</span>
                      <span>•</span>
                      <span>{week.exercises} exercícios</span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all text-sm md:text-base">
                    Ver Conteúdos
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
