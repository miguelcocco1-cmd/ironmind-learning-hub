import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ModuleDetail() {
  const [, params] = useRoute("/module/:id");
  const [, setLocation] = useLocation();
  const moduleId = params?.id ? parseInt(params.id) : 0;

  const { data: module, isLoading: moduleLoading } = trpc.modules.getById.useQuery(
    { id: moduleId },
    { enabled: moduleId > 0 }
  );

  const { data: weeks, isLoading: weeksLoading } = trpc.weeks.listByModule.useQuery(
    { moduleId },
    { enabled: moduleId > 0 }
  );

  if (moduleLoading || weeksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center">
          <p className="text-lg text-muted-foreground">Módulo não encontrado.</p>
          <Button className="mt-4" onClick={() => setLocation("/modules")}>
            Voltar aos Módulos
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
          onClick={() => setLocation("/modules")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {/* Module Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {module.title}
          </h1>
          {module.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {module.description}
            </p>
          )}
        </div>

        {/* Weeks Grid */}
        {weeks && weeks.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Semanas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weeks.map((week) => (
                <ContentCard
                  key={week.id}
                  title={`Semana ${week.weekNumber}: ${week.title}`}
                  onClick={() => setLocation(`/week/${week.id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Nenhuma semana disponível neste módulo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
