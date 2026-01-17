import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Loader2, BookOpen, CheckCircle, Clock, Trophy } from "lucide-react";

export default function Dashboard() {
  const { data: cycles, isLoading: cyclesLoading } = trpc.cycles.list.useQuery();
  const { data: progress, isLoading: progressLoading } = trpc.progress.getMyProgress.useQuery();
  const { data: submissions, isLoading: submissionsLoading } = trpc.exercises.mySubmissions.useQuery();

  if (cyclesLoading || progressLoading || submissionsLoading) {
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
