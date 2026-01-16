import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExerciseViewer() {
  const [, params] = useRoute("/exercise/:id");
  const [, setLocation] = useLocation();
  const exerciseId = params?.id ? parseInt(params.id) : 0;
  const [submissionContent, setSubmissionContent] = useState("");

  const { data: exercise, isLoading } = trpc.exercises.getById.useQuery(
    { id: exerciseId },
    { enabled: exerciseId > 0 }
  );

  const { data: submissions } = trpc.exercises.mySubmissions.useQuery();
  const submitMutation = trpc.exercises.submit.useMutation();
  const utils = trpc.useUtils();

  const existingSubmission = submissions?.find((s) => s.exerciseId === exerciseId);

  const handleSubmit = async () => {
    if (!submissionContent.trim()) {
      toast.error("Por favor, preencha a sua resposta.");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        exerciseId,
        content: submissionContent,
      });
      toast.success("Exercício submetido com sucesso!");
      utils.exercises.mySubmissions.invalidate();
      setSubmissionContent("");
    } catch (error) {
      toast.error("Erro ao submeter exercício. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center">
          <p className="text-lg text-muted-foreground">Exercício não encontrado.</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {/* Exercise Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {exercise.title}
          </h1>
          <p className="text-lg text-muted-foreground">{exercise.description}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Instructions */}
          {exercise.instructions && (
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-3 text-foreground">Instruções</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {exercise.instructions}
              </p>
            </Card>
          )}

          {/* Existing Submission */}
          {existingSubmission && (
            <Card className="p-6 bg-green-600/5 border-green-600/20">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Exercício já submetido
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Submetido em{" "}
                    {new Date(existingSubmission.submittedAt).toLocaleDateString("pt-PT")}
                  </p>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {existingSubmission.content}
                </p>
              </div>
            </Card>
          )}

          {/* Submission Form */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {existingSubmission ? "Nova Submissão" : "Sua Resposta"}
            </h2>
            <Textarea
              placeholder="Escreva a sua resposta aqui..."
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              className="min-h-[200px] mb-4"
            />
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || !submissionContent.trim()}
              className="w-full"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A submeter...
                </>
              ) : (
                "Submeter Exercício"
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
