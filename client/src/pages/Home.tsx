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

  // Filtrar apenas ciclos regulares (ordem >= 0)
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

        {/* Grupo Telegram - Card Destaque */}
        <div className="mb-8 md:mb-12">
          <Card
            onClick={() => window.open('https://t.me/+zw2pSZYWnjphMzU0', '_blank')}
            className="group cursor-pointer border-2 border-blue-500 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden touch-manipulation"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/20 rounded-full">
                  <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors">
                    🚀 Junta-te à Comunidade Telegram
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed">
                    Partilha experiências, desafios e conquistas com outros atletas. Recebe suporte diário, dicas práticas e mantém-te motivado com o grupo. Juntos somos mais fortes!
                  </p>
                </div>
                <ChevronRight className="h-8 w-8 text-blue-400 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Card>
        </div>

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
