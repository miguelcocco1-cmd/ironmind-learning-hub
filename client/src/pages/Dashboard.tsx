import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Loader2, BookOpen, CheckCircle, Clock, Trophy, Award, Star, Flame, Target, Compass, Brain, Crown } from "lucide-react";

export default function Dashboard() {
  const { data: cycles, isLoading: cyclesLoading } = trpc.cycles.list.useQuery();
  const { data: progress, isLoading: progressLoading } = trpc.progress.getMyProgress.useQuery();
  const { data: submissions, isLoading: submissionsLoading } = trpc.exercises.mySubmissions.useQuery();
  const { data: allBadges, isLoading: badgesLoading } = trpc.badges.list.useQuery();
  const { data: userBadges, isLoading: userBadgesLoading } = trpc.badges.getUserBadges.useQuery(
    { userId: 1 }, // TODO: usar ctx.user.id quando autenticação estiver ativa
    { enabled: true }
  );
  
  // Mapa de ícones para badges
  const badgeIcons: Record<string, any> = {
    star: Star,
    fire: Flame,
    trophy: Trophy,
    crown: Crown,
    target: Target,
    flame: Flame,
    compass: Compass,
    brain: Brain,
  };
  
  // Mapa de cores para badges
  const badgeColors: Record<string, string> = {
    gold: "text-yellow-500 bg-yellow-500/10",
    orange: "text-orange-500 bg-orange-500/10",
    green: "text-green-500 bg-green-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    red: "text-red-500 bg-red-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    indigo: "text-indigo-500 bg-indigo-500/10",
  };

  if (cyclesLoading || progressLoading || submissionsLoading || badgesLoading || userBadgesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const completedContents = progress?.filter((p) => p.completed).length || 0;
  const totalContents = progress?.length || 0;
  const completionPercentage = totalContents > 0 ? (completedContents / totalContents) * 100 : 0;

  const totalCycles = cycles?.length || 0;
  const totalExercises = submissions?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
          Meu Progresso
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ciclos Disponíveis</p>
                <p className="text-3xl font-bold text-foreground">{totalCycles}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conteúdos Concluídos</p>
                <p className="text-3xl font-bold text-foreground">
                  {completedContents}/{totalContents}
                </p>
              </div>
              <div className="p-3 bg-green-600/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Exercícios Submetidos</p>
                <p className="text-3xl font-bold text-foreground">{totalExercises}</p>
              </div>
              <div className="p-3 bg-blue-600/10 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Progresso Total</p>
                <p className="text-3xl font-bold text-foreground">
                  {Math.round(completionPercentage)}%
                </p>
              </div>
              <div className="p-3 bg-yellow-600/10 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Badges/Conquistas */}
        <Card className="p-6 mb-12 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-foreground">Minhas Conquistas</h2>
          </div>
          
          {allBadges && allBadges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allBadges.map((badge) => {
                const earned = userBadges?.some(ub => ub.badgeId === badge.id);
                const Icon = badgeIcons[badge.icon] || Award;
                const colorClass = badgeColors[badge.color] || "text-gray-500 bg-gray-500/10";
                
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      earned 
                        ? `${colorClass} border-current` 
                        : "bg-gray-900/20 border-gray-800 opacity-40"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`p-3 rounded-full ${
                        earned ? colorClass : "bg-gray-800 text-gray-600"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${
                          earned ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {badge.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {badge.description}
                        </p>
                      </div>
                      {earned && (
                        <div className="mt-2">
                          <span className="text-xs font-semibold text-green-500">✓ Conquistado</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Nenhum badge disponível ainda.
            </p>
          )}
        </Card>

        {/* Overall Progress */}
        <Card className="p-6 mb-12 bg-card border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Progresso Geral</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Conclusão do Programa</span>
              <span className="font-semibold text-foreground">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
        </Card>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Atividade Recente</h2>
          {progress && progress.length > 0 ? (
            <div className="space-y-4">
              {progress
                .filter((p) => p.completed)
                .slice(0, 5)
                .map((item) => (
                  <Card key={item.id} className="p-4 bg-card border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-600/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          Conteúdo #{item.contentId} concluído
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.completedAt
                            ? new Date(item.completedAt).toLocaleDateString("pt-PT")
                            : "Data desconhecida"}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-card border-border">
              <p className="text-muted-foreground">
                Ainda não há atividade registada. Comece a explorar os módulos!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
