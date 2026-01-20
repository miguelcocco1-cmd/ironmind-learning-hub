import { useEffect, useState } from "react";

interface LiveCountdownProps {
  liveDate: Date | null;
  className?: string;
}

export function LiveCountdown({ liveDate, className = "" }: LiveCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [status, setStatus] = useState<"upcoming" | "live" | "ended">("ended");

  useEffect(() => {
    if (!liveDate) {
      setStatus("ended");
      setTimeLeft("");
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const liveTime = new Date(liveDate).getTime();
      const difference = liveTime - now;

      // Aula já passou (mais de 2 horas depois)
      if (difference < -7200000) {
        setStatus("ended");
        setTimeLeft("");
        return;
      }

      // Aula está ao vivo (até 2 horas depois do início)
      if (difference <= 0 && difference >= -7200000) {
        setStatus("live");
        setTimeLeft("AO VIVO AGORA");
        return;
      }

      // Aula ainda não começou
      setStatus("upcoming");

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`Falta ${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`Falta ${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`Falta ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`Falta ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [liveDate]);

  if (!liveDate || status === "ended") {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        📼 Gravação disponível
      </div>
    );
  }

  if (status === "live") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-sm font-bold text-red-500 uppercase">
          {timeLeft}
        </span>
      </div>
    );
  }

  return (
    <div className={`text-sm font-semibold text-primary ${className}`}>
      ⏰ {timeLeft}
    </div>
  );
}
