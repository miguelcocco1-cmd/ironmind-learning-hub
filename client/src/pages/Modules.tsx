import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Cycles() {
  const [, setLocation] = useLocation();
  const { data: cycles, isLoading } = trpc.cycles.list.useQuery();

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
          Todos os Ciclos
        </h1>

        {cycles && cycles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cycles.map((cycle) => (
              <ContentCard
                key={cycle.id}
                title={cycle.title}
                thumbnail={cycle.thumbnailUrl || undefined}
                onClick={() => setLocation(`/cycle/${cycle.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Nenhum ciclo disponível no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
