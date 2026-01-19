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

  // Separar Ciclo -1 (Setup) dos outros ciclos
  const setupCycle = cycles?.find(c => c.order === -1);
  const regularCycles = cycles?.filter(c => c.order >= 0) || [];

  // Cores dos ciclos baseadas no documento
  const cycleColors: Record<number, { bg: string; border: string; icon: string }> = {
    [-1]: { bg: "bg-purple-500/10", border: "border-purple-500/50", icon: "text-purple-500" }, // Setup
    0: { bg: "bg-yellow-500/10", border: "border-yellow-500/50", icon: "text-yellow-500" }, // Introdução
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
      <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white px-4">
            IRON MIND Training Lab
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-6 md:mb-8 px-4 leading-relaxed">
            O treino mental que acompanha o teu treino físico. Desenvolve foco, resiliência e performance máxima através de técnicas avançadas de hipnose desportiva e psicologia do desporto.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                const cyclesSection = document.getElementById('cycles');
                cyclesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all flex items-center gap-2 touch-manipulation"
            >
              Começar
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cycles Section */}
      <div id="cycles" className="container py-8 md:py-16 px-4">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            6 Ciclos Progressivos
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Programa completo de 6 meses estruturado em ciclos mensais. Cada ciclo contém 12 tópicos teóricos e 6 exercícios práticos das 6 áreas mentais fundamentais.
          </p>
        </div>

        {/* Setup Card (Ciclo -1) - Destaque especial */}
        {setupCycle && (
          <div className="mb-8 md:mb-12">
            <Card
              onClick={() => setLocation(`/setup`)}
              className="group cursor-pointer border-2 border-purple-500 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden touch-manipulation"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-purple-500/20 rounded-full">
                    <svg className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors">
                      {setupCycle.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {setupCycle.description}
                    </p>
                  </div>
                  <ChevronRight className="h-8 w-8 text-purple-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {regularCycles && regularCycles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {regularCycles.map((cycle) => {
              const colors = cycleColors[cycle.order] || cycleColors[1];
              
              return (
                <Card
                  key={cycle.id}
                  onClick={() => setLocation(`/cycle/${cycle.id}`)}
                  className={`group cursor-pointer border-2 ${colors.border} ${colors.bg} hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden touch-manipulation`}
                >
                  <div className="p-6 md:p-8">
                    {/* Cycle Number */}
                    <div className={`text-5xl md:text-6xl font-bold mb-3 md:mb-4 ${colors.icon} opacity-20 group-hover:opacity-30 transition-opacity`}>
                      {cycle.order}
                    </div>

                    {/* Cycle Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                      {cycle.title}
                    </h3>

                    {/* Cycle Description */}
                    {cycle.description && (
                      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-3 leading-relaxed">
                        {cycle.description}
                      </p>
                    )}

                    {/* Call to Action */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all text-sm md:text-base">
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
      <div className="bg-muted/30 py-8 md:py-16">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-1 md:mb-2">6</div>
              <div className="text-sm md:text-base text-muted-foreground">Ciclos Mensais</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-1 md:mb-2">108</div>
              <div className="text-sm md:text-base text-muted-foreground">Itens Totais</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-1 md:mb-2">72</div>
              <div className="text-sm md:text-base text-muted-foreground">Tópicos Teóricos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-1 md:mb-2">36</div>
              <div className="text-sm md:text-base text-muted-foreground">Exercícios Práticos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
