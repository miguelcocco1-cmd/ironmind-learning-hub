import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Perguntas placeholder genéricas sobre treino mental
const quizQuestions = [
  {
    id: 1,
    question: "Qual é o principal objetivo do treino mental no desporto?",
    options: [
      "Aumentar a força física",
      "Melhorar o foco e a concentração",
      "Reduzir o tempo de treino",
      "Aumentar a velocidade"
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Qual técnica é mais eficaz para reduzir a ansiedade pré-competição?",
    options: [
      "Exercício físico intenso",
      "Respiração controlada",
      "Comer muito",
      "Dormir menos"
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "O que é visualização mental?",
    options: [
      "Ver vídeos de treino",
      "Imaginar mentalmente a execução perfeita",
      "Ler sobre técnicas",
      "Observar outros atletas"
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Qual é o benefício principal das âncoras mentais?",
    options: [
      "Melhorar a memória",
      "Aceder rapidamente a estados mentais desejados",
      "Aumentar a força",
      "Reduzir o peso"
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Quantos minutos por dia são recomendados para prática de treino mental?",
    options: [
      "2-5 minutos",
      "10-15 minutos",
      "30-60 minutos",
      "2-3 horas"
    ],
    correctAnswer: 1,
  },
];

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:contentId");
  const [, setLocation] = useLocation();
  const contentId = params?.contentId ? parseInt(params.contentId) : 0;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quizQuestions.length,
      percentage: Math.round((correct / quizQuestions.length) * 100),
    };
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-20 md:pt-24 pb-8 md:pb-12 px-4">
          <Button
            variant="ghost"
            className="mb-4 md:mb-6 touch-manipulation"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Voltar
          </Button>

          <Card className="max-w-2xl mx-auto p-6 md:p-8">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Resultado do Quiz
              </h1>
              
              <div className="my-8">
                <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
                  {score.percentage}%
                </div>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {score.correct} de {score.total} respostas corretas
                </p>
              </div>

              {score.percentage >= 80 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    🎉 Excelente! Demonstraste um ótimo conhecimento do tema!
                  </p>
                </div>
              )}

              {score.percentage >= 60 && score.percentage < 80 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                  <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
                    👍 Bom trabalho! Continua a estudar para melhorar ainda mais!
                  </p>
                </div>
              )}

              {score.percentage < 60 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    📚 Revê o conteúdo e tenta novamente. A prática leva à perfeição!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleRestart} size="lg" className="touch-manipulation">
                  Tentar Novamente
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="touch-manipulation"
                >
                  Voltar ao Conteúdo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-20 md:pt-24 pb-8 md:pb-12 px-4">
        <Button
          variant="ghost"
          className="mb-4 md:mb-6 touch-manipulation"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Voltar
        </Button>

        <Card className="max-w-2xl mx-auto p-6 md:p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all touch-manipulation",
                  selectedAnswer === index
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      selectedAnswer === index
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}
                  >
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm md:text-base text-foreground">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="touch-manipulation"
            >
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              className="touch-manipulation"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Ver Resultado" : "Próxima"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
