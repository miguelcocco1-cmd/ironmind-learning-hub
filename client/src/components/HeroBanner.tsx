import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

interface HeroBannerProps {
  title: string;
  description: string;
  backgroundImage?: string;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

export function HeroBanner({
  title,
  description,
  backgroundImage,
  onPlayClick,
  onInfoClick,
}: HeroBannerProps) {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : "linear-gradient(135deg, oklch(0.25 0.15 0) 0%, oklch(0.15 0.01 264) 100%)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-center items-start z-10 px-8 md:px-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-4 max-w-3xl animate-fade-in">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 text-shadow mb-8 max-w-2xl animate-slide-up">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-slide-up">
          {onPlayClick && (
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8"
              onClick={onPlayClick}
            >
              <Play className="mr-2 h-5 w-5" />
              Começar
            </Button>
          )}
          {onInfoClick && (
            <Button
              size="lg"
              variant="secondary"
              className="bg-gray-500/70 hover:bg-gray-500/50 text-white font-semibold px-8"
              onClick={onInfoClick}
            >
              <Info className="mr-2 h-5 w-5" />
              Mais Informações
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
