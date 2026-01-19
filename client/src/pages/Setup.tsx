import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { CheckCircle, Activity, Watch } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Setup() {
  const [, setLocation] = useLocation();
  const [garminConnected, setGarminConnected] = useState(false);

  // Check Strava connection status
  const { data: stravaStatus, refetch: refetchStatus } = trpc.integrations.strava.getStatus.useQuery();
  const stravaConnected = stravaStatus?.connected || false;

  // Get Strava auth URL
  const { data: authData } = trpc.integrations.strava.getAuthUrl.useQuery();

  // Handle OAuth callback
  const handleCallbackMutation = trpc.integrations.strava.handleCallback.useMutation({
    onSuccess: () => {
      toast.success("Strava conectado com sucesso!");
      refetchStatus();
    },
    onError: (error) => {
      toast.error("Erro ao conectar Strava: " + error.message);
    },
  });

  // Check for OAuth callback in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const scope = params.get("scope");

    if (code) {
      handleCallbackMutation.mutate({ code, scope: scope || undefined });
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStravaConnect = () => {
    if (authData?.url) {
      // Open Strava OAuth in same window
      window.location.href = authData.url;
    } else {
      toast.error("Erro ao obter URL de autorização do Strava");
    }
  };

  const handleGarminConnect = () => {
    // TODO: Implementar OAuth flow real do Garmin
    // Por agora, simulamos conexão
    setGarminConnected(true);
  };

  const handleContinue = () => {
    // Redirecionar para homepage após setup
    setLocation("/");
  };

  const isSetupComplete = stravaConnected || garminConnected;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-12 px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Configuração Inicial
          </h1>
          <p className="text-lg text-muted-foreground">
            Conecta as tuas contas de treino para sincronizar dados físicos com o teu treino mental.
            Isto permite-nos criar insights personalizados e otimizar a tua preparação.
          </p>
        </div>

        {/* Integration Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strava Card */}
          <Card className="p-8 bg-card border-2 border-border hover:border-orange-500/50 transition-all">
            <div className="flex flex-col items-center text-center">
              {/* Strava Logo/Icon */}
              <div className={`p-4 rounded-full mb-4 ${
                stravaConnected 
                  ? "bg-orange-500/20 text-orange-500" 
                  : "bg-orange-500/10 text-orange-400"
              }`}>
                <Activity className="h-12 w-12" />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Strava
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sincroniza corridas, ciclismo e natação para análise integrada de performance.
              </p>

              {stravaConnected ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Conectado</span>
                </div>
              ) : (
                <Button
                  onClick={handleStravaConnect}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Conectar Strava
                </Button>
              )}

              {/* Benefits */}
              <div className="mt-6 text-left w-full space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  O que sincronizamos:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Atividades e distâncias</li>
                  <li>✓ Ritmo e frequência cardíaca</li>
                  <li>✓ Calendário de provas</li>
                  <li>✓ Recordes pessoais</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Garmin Card */}
          <Card className="p-8 bg-card border-2 border-border hover:border-blue-500/50 transition-all">
            <div className="flex flex-col items-center text-center">
              {/* Garmin Logo/Icon */}
              <div className={`p-4 rounded-full mb-4 ${
                garminConnected 
                  ? "bg-blue-500/20 text-blue-500" 
                  : "bg-blue-500/10 text-blue-400"
              }`}>
                <Watch className="h-12 w-12" />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Garmin
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Acede a métricas avançadas como VO2max, carga de treino e recuperação.
              </p>

              {garminConnected ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Conectado</span>
                </div>
              ) : (
                <Button
                  onClick={handleGarminConnect}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Conectar Garmin
                </Button>
              )}

              {/* Benefits */}
              <div className="mt-6 text-left w-full space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  O que sincronizamos:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Métricas avançadas (VO2max)</li>
                  <li>✓ Carga de treino e recuperação</li>
                  <li>✓ Qualidade de sono</li>
                  <li>✓ Stress score e Body Battery</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Skip Option */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Podes conectar mais tarde nas definições do teu perfil.
          </p>
          
          {isSetupComplete ? (
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Continuar para o Programa
            </Button>
          ) : (
            <Button
              onClick={handleContinue}
              variant="outline"
              size="lg"
            >
              Saltar por Agora
            </Button>
          )}
        </div>

        {/* Info Box */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-6 bg-blue-500/5 border-blue-500/20">
            <h4 className="font-bold text-foreground mb-2">
              🔒 Privacidade e Segurança
            </h4>
            <p className="text-sm text-muted-foreground">
              Os teus dados são encriptados e nunca partilhados com terceiros. 
              Usamos apenas para criar insights personalizados que te ajudam a melhorar. 
              Podes desconectar a qualquer momento.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
