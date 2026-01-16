import { useAuth } from "@/_core/hooks/useAuth";
import { HeroBanner } from "@/components/HeroBanner";
import { ModuleRow } from "@/components/ModuleRow";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: modules, isLoading: modulesLoading } = trpc.modules.list.useQuery();
  const { data: progress } = trpc.progress.getMyProgress.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handlePlayClick = () => {
    if (isAuthenticated) {
      setLocation("/modules");
    } else {
      window.location.href = getLoginUrl();
    }
  };

  const handleContentClick = (contentId: number) => {
    setLocation(`/content/${contentId}`);
  };

  // Create a map of content progress
  const progressMap = new Map(
    progress?.map((p) => [p.contentId, p.completed]) || []
  );

  if (authLoading || modulesLoading) {
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
        onInfoClick={() => setLocation("/about")}
      />

      {/* Main Content */}
      <div className="relative -mt-32 z-20">
        {isAuthenticated && modules && modules.length > 0 ? (
          <>
            {/* Featured Module */}
            <div className="mb-16">
              <ModuleRow
                title="Continue Assistindo"
                contents={
                  modules
                    .slice(0, 1)
                    .flatMap((module) => [
                      {
                        id: module.id,
                        title: module.title,
                        thumbnailUrl: module.thumbnailUrl,
                        duration: null,
                        completed: false,
                      },
                    ]) || []
                }
                onContentClick={(id) => setLocation(`/module/${id}`)}
              />
            </div>

            {/* All Modules */}
            <div className="mb-16">
              <ModuleRow
                title="Todos os Módulos"
                contents={
                  modules.map((module) => ({
                    id: module.id,
                    title: module.title,
                    thumbnailUrl: module.thumbnailUrl,
                    duration: null,
                    completed: false,
                  })) || []
                }
                onContentClick={(id) => setLocation(`/module/${id}`)}
                onViewAll={() => setLocation("/modules")}
              />
            </div>
          </>
        ) : (
          <div className="container py-20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Bem-vindo ao IRON MIND Training Lab
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aceda a um programa completo de treino mental para triatletas, com sessões
              semanais, exercícios práticos e acompanhamento personalizado.
            </p>
            {!isAuthenticated && (
              <Button size="lg" onClick={() => (window.location.href = getLoginUrl())}>
                Começar Agora
              </Button>
            )}
          </div>
        )}

        {/* Features Section */}
        <div className="container py-20">
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
      </div>
    </div>
  );
}
