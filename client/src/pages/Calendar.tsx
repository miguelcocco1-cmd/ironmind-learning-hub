import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveCountdown } from "@/components/LiveCountdown";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2, Calendar as CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";

export default function Calendar() {
  const [, setLocation] = useLocation();
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null);

  const { data: cycles } = trpc.cycles.list.useQuery();
  const { data: liveClasses, isLoading } = trpc.weeks.listAllLiveClasses.useQuery();
  
  // Filtrar apenas aulas com datas
  const liveClassesWithDates = (liveClasses || [])
    .filter((w: any) => w.liveDate)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.liveDate!).getTime();
      const dateB = new Date(b.liveDate!).getTime();
      return dateA - dateB;
    });

  type LiveClass = typeof liveClassesWithDates[number];

  // Aplicar filtro de ciclo se selecionado
  const filteredClasses = selectedCycle
    ? liveClassesWithDates.filter((c: LiveClass) => c.cycleId === selectedCycle)
    : liveClassesWithDates;

  // Agrupar por mês
  const classesByMonth = filteredClasses.reduce((acc: any, cls: LiveClass) => {
    const date = new Date(cls.liveDate!);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthName = date.toLocaleDateString("pt-PT", {
      month: "long",
      year: "numeric",
    });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        name: monthName,
        classes: [],
      };
    }

    acc[monthKey].classes.push(cls);
    return acc;
  }, {} as Record<string, { name: string; classes: typeof liveClasses }>);

  const getCycleColor = (cycleId: number) => {
    const cycle = cycles?.find((c) => c.id === cycleId);
    return cycle?.color || "blue";
  };

  const getCycleName = (cycleId: number) => {
    const cycle = cycles?.find((c) => c.id === cycleId);
    return cycle?.title || "Ciclo";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-20 md:pt-24 pb-8 md:pb-12 px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <CalendarIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Calendário de Aulas ao Vivo
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground">
            Todas as {liveClassesWithDates.length} aulas ao vivo dos 6 ciclos • Próximos 6 meses
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 md:mb-8 flex flex-wrap gap-2">
          <Button
            variant={selectedCycle === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCycle(null)}
            className="touch-manipulation"
          >
            <Filter className="mr-2 h-4 w-4" />
            Todos os Ciclos
          </Button>
          {cycles
            ?.filter((c) => c.order >= 1 && c.order <= 6)
            .sort((a, b) => a.order - b.order)
            .map((cycle) => (
              <Button
                key={cycle.id}
                variant={selectedCycle === cycle.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCycle(cycle.id)}
                className="touch-manipulation"
              >
                Ciclo {cycle.order}
              </Button>
            ))}
        </div>

        {/* Vista por Mês */}
        {Object.entries(classesByMonth).map(([monthKey, monthData]) => {
          const { name, classes } = monthData as { name: string; classes: LiveClass[] };
          return (
          <div key={monthKey} className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 capitalize text-foreground">
              {name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {classes.map((cls: LiveClass) => {
                const date = new Date(cls.liveDate!);
                const dayOfWeek = date.toLocaleDateString("pt-PT", {
                  weekday: "long",
                });
                const dayOfMonth = date.getDate();
                const time = date.toLocaleTimeString("pt-PT", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <Card
                    key={cls.id}
                    className="p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer border-l-4"
                    style={{
                      borderLeftColor:
                        getCycleColor(cls.cycleId) === "blue"
                          ? "#3b82f6"
                          : getCycleColor(cls.cycleId) === "green"
                          ? "#10b981"
                          : getCycleColor(cls.cycleId) === "orange"
                          ? "#f97316"
                          : getCycleColor(cls.cycleId) === "red"
                          ? "#ef4444"
                          : getCycleColor(cls.cycleId) === "cyan"
                          ? "#06b6d4"
                          : "#ffffff",
                    }}
                    onClick={() => setLocation(`/item/${cls.id}`)}
                  >
                    {/* Data */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-3xl md:text-4xl font-bold text-foreground">
                          {dayOfMonth}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {dayOfWeek}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-primary">
                          {time}
                        </div>
                        <LiveCountdown liveDate={date} className="text-xs" />
                      </div>
                    </div>

                    {/* Ciclo e Semana */}
                    <div className="mb-2">
                      <div className="text-xs text-muted-foreground mb-1">
                        {getCycleName(cls.cycleId)} • Semana {cls.weekGroup}
                      </div>
                      <div className="text-base md:text-lg font-semibold text-foreground">
                        {cls.title}
                      </div>
                    </div>

                    {/* Descrição */}
                    {cls.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {cls.description}
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        );
        })}

        {filteredClasses && filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">
              Nenhuma aula agendada para este filtro.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
