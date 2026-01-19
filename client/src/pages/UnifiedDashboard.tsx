import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Activity, Brain, TrendingUp, Calendar, Heart, Zap } from "lucide-react";
import { toast } from "sonner";

export default function UnifiedDashboard() {
  // Get Strava connection status
  const { data: stravaStatus } = trpc.integrations.strava.getStatus.useQuery();
  
  // Get recent activities
  const { data: activities, refetch: refetchActivities } = trpc.integrations.strava.getActivities.useQuery(
    { limit: 5 },
    { enabled: stravaStatus?.connected }
  );

  // Get badges
  const { data: allBadges } = trpc.badges.list.useQuery();

  // Sync activities
  const syncMutation = trpc.integrations.strava.syncActivities.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.syncedCount} atividades sincronizadas!`);
      refetchActivities();
    },
    onError: (error) => {
      toast.error("Erro ao sincronizar: " + error.message);
    },
  });

  const handleSync = () => {
    syncMutation.mutate();
  };

  // Format duration (seconds to HH:MM:SS)
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Format distance (meters to km)
  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2) + " km";
  };

  // Calculate weekly stats
  const weeklyStats = activities ? {
    totalDistance: activities.reduce((sum, a) => sum + (Number(a.distance) || 0), 0),
    totalDuration: activities.reduce((sum, a) => sum + (a.duration || 0), 0),
    totalActivities: activities.length,
    avgHeartRate: activities.filter(a => a.avgHeartRate).length > 0
      ? activities.reduce((sum, a) => sum + (Number(a.avgHeartRate) || 0), 0) / activities.filter(a => a.avgHeartRate).length
      : 0,
  } : null;

  if (!stravaStatus?.connected) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard Unificado</h1>
          
          <Card className="p-8 text-center">
            <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Conecta o Strava</h2>
            <p className="text-muted-foreground mb-6">
              Para ver o teu dashboard unificado com dados de treino físico e mental,
              primeiro precisa conectar a tua conta Strava.
            </p>
            <Button onClick={() => window.location.href = "/setup"}>
              Ir para Configuração
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Unificado</h1>
            <p className="text-muted-foreground">
              Visão completa do teu treino físico e mental
            </p>
          </div>
          <Button 
            onClick={handleSync} 
            disabled={syncMutation.isPending}
          >
            {syncMutation.isPending ? "Sincronizando..." : "Sincronizar Strava"}
          </Button>
        </div>

        {/* Weekly Summary */}
        {weeklyStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">Atividades</span>
              </div>
              <p className="text-3xl font-bold">{weeklyStats.totalActivities}</p>
              <p className="text-xs text-muted-foreground mt-1">Últimas 5 registadas</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Distância</span>
              </div>
              <p className="text-3xl font-bold">{formatDistance(weeklyStats.totalDistance)}</p>
              <p className="text-xs text-muted-foreground mt-1">Total percorrido</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-muted-foreground">Tempo</span>
              </div>
              <p className="text-3xl font-bold">
                {Math.floor(weeklyStats.totalDuration / 3600)}h {Math.floor((weeklyStats.totalDuration % 3600) / 60)}m
              </p>
              <p className="text-xs text-muted-foreground mt-1">Tempo total</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-muted-foreground">FC Média</span>
              </div>
              <p className="text-3xl font-bold">
                {weeklyStats.avgHeartRate > 0 ? Math.round(weeklyStats.avgHeartRate) : "--"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Batimentos/min</p>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Physical Training */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Treino Físico</h2>
            </div>

            <div className="space-y-4">
              {activities && activities.length > 0 ? (
                activities.map((activity) => (
                  <Card key={activity.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{activity.name}</h3>
                        <p className="text-sm text-muted-foreground">{activity.type}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.startDate ? new Date(activity.startDate).toLocaleDateString("pt-PT") : ""}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Distância</p>
                        <p className="font-semibold">{formatDistance(Number(activity.distance) || 0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duração</p>
                        <p className="font-semibold">
                          {Math.floor((activity.duration || 0) / 60)}min
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">FC Média</p>
                        <p className="font-semibold">
                          {activity.avgHeartRate ? Math.round(Number(activity.avgHeartRate)) + " bpm" : "--"}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">Nenhuma atividade encontrada</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Clica em "Sincronizar Strava" para importar as tuas atividades
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Mental Training */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold">Treino Mental</h2>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Conquistas Recentes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {allBadges && allBadges.slice(0, 4).map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <p className="text-sm font-medium">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {badge.type === "streak" ? "Streak" : "Conquista"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Progresso Semanal</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sessões Completadas</span>
                    <span className="font-semibold">4/7</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "57%" }}></div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exercícios Práticos</span>
                    <span className="font-semibold">2/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-200">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Insight Inteligente</h3>
                    <p className="text-sm text-muted-foreground">
                      Detetámos treino intenso no Strava. Recomendamos a sessão de 
                      <span className="font-medium text-foreground"> Recuperação Mental</span> para 
                      otimizar a tua performance.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
