import { Navbar } from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: cycles, isLoading } = trpc.cycles.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Cores dos ciclos baseadas no documento
  const cycleColors: Record<number, { bg: string; border: string; icon: string }> = {
    1: { bg: "bg-blue-500/10", border: "border-blue-500/50", icon: "text-blue-500" },
    2: { bg: "bg-green-500/10", border: "border-green-500/50", icon: "text-green-500" },
    3: { bg: "bg-orange-500/10", border: "border-orange-500/50", icon: "text-orange-500" },
    4: { bg: "bg-red-500/10", border: "border-red-500/50", icon: "text-red-500" },
    5: { bg: "bg-gray-500/10", border: "border-gray-500/50", icon: "text-gray-400" },
    6: { bg: "bg-cyan-500/10", border: "border-cyan-500/50", icon: "text-cyan-500" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            IRON MIND Training Lab
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            O treino mental que acompanha o teu treino físico. Desenvolve foco, resiliência e performance máxima através de técnicas avançadas de hipnose desportiva e psicologia do desporto.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                const cyclesSection = document.getElementById('cycles');
                cyclesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2"
            >
              Começar
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cycles Section */}
      <div id="cycles" className="container py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            6 Ciclos Progressivos
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Programa completo de 6 meses estruturado em ciclos mensais. Cada ciclo contém 12 tópicos teóricos e 6 exercícios práticos das 6 áreas mentais fundamentais.
          </p>
        </div>

        {cycles && cycles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cycles.map((cycle) => {
              const colors = cycleColors[cycle.order] || cycleColors[1];
              
              return (
                <Card
                  key={cycle.id}
                  onClick={() => setLocation(`/cycle/${cycle.id}`)}
                  className={`group cursor-pointer border-2 ${colors.border} ${colors.bg} hover:scale-105 transition-all duration-300 overflow-hidden`}
                >
                  <div className="p-8">
                    {/* Cycle Number */}
                    <div className={`text-6xl font-bold mb-4 ${colors.icon} opacity-20 group-hover:opacity-30 transition-opacity`}>
                      {cycle.order}
                    </div>

                    {/* Cycle Title */}
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {cycle.title}
                    </h3>

                    {/* Cycle Description */}
                    {cycle.description && (
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {cycle.description}
                      </p>
                    )}

                    {/* Call to Action */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      Explorar Ciclo
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Nenhum ciclo disponível no momento.
            </p>
          </div>
        )}
      </div>

      {/* Program Overview */}
      <div className="bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">Ciclos Mensais</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">108</div>
              <div className="text-muted-foreground">Itens Totais</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">72</div>
              <div className="text-muted-foreground">Tópicos Teóricos</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">36</div>
              <div className="text-muted-foreground">Exercícios Práticos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
