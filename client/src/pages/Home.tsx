import { useAuth } from "@/_core/hooks/useAuth";
import { HeroBanner } from "@/components/HeroBanner";
import { WeekSection } from "@/components/WeekSection";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: weeksWithContents, isLoading: weeksLoading } = trpc.weeks.listAllWithContents.useQuery();

  const handlePlayClick = () => {
    if (isAuthenticated) {
      // Scroll to first week
      const firstWeek = document.getElementById("week-1");
      if (firstWeek) {
        firstWeek.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = getLoginUrl();
    }
  };

  if (authLoading || weeksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <HeroBanner
        title="IRON MIND Training Lab"
        description="O treino mental que acompanha o teu treino físico. Desenvolve foco, resiliência e performance máxima através de técnicas avançadas de hipnose desportiva e psicologia do desporto."
        backgroundImage="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070"
        onPlayClick={handlePlayClick}
        onInfoClick={() => setLocation("/dashboard")}
      />

      {/* Main Content - Weeks and Contents */}
      <div className="relative -mt-32 z-20">
        <div className="container py-12">
          {isAuthenticated && weeksWithContents && weeksWithContents.length > 0 ? (
            <>
              <h1 className="text-4xl font-bold mb-8 text-foreground">
                Programa de Treino Mental
              </h1>
              
              {weeksWithContents.map((week, index) => (
                <div key={week.id} id={`week-${index + 1}`}>
                  <WeekSection
                    weekNumber={week.weekNumber}
                    title={week.title}
                    description={week.description}
                    contents={week.contents}
                  />
                </div>
              ))}
            </>
          ) : !isAuthenticated ? (
            <div className="py-20 text-center">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Bem-vindo ao IRON MIND Training Lab
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Aceda a um programa completo de treino mental para triatletas, com sessões
                semanais, exercícios práticos e acompanhamento personalizado.
              </p>
              <Button size="lg" onClick={() => (window.location.href = getLoginUrl())}>
                Começar Agora
              </Button>
            </div>
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Nenhum conteúdo disponível
              </h2>
              <p className="text-lg text-muted-foreground">
                Os conteúdos do programa estarão disponíveis em breve.
              </p>
            </div>
          )}

          {/* Features Section */}
          {!isAuthenticated && (
            <div className="py-20">
              <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
                O Que Vais Aprender
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Hipnose Desportiva",
                    description:
                      "Técnicas avançadas para superar bloqueios mentais e maximizar o potencial",
                  },
                  {
                    title: "Auto-hipnose",
                    description:
                      "Ferramentas práticas para autocontrolo mental durante a competição",
                  },
                  {
                    title: "Psicologia do Desporto",
                    description:
                      "Estratégias científicas para foco e resiliência mental",
                  },
                  {
                    title: "Performance Máxima",
                    description:
                      "Integração completa entre corpo e mente para resultados excepcionais",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
