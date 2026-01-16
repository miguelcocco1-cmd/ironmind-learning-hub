import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Modules() {
  const [, setLocation] = useLocation();
  const { data: modules, isLoading } = trpc.modules.list.useQuery();

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

      <div className="container pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
          Todos os Módulos
        </h1>

        {modules && modules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module) => (
              <ContentCard
                key={module.id}
                title={module.title}
                thumbnail={module.thumbnailUrl || undefined}
                onClick={() => setLocation(`/module/${module.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Nenhum módulo disponível no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
