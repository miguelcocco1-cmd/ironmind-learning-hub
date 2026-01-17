import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Home, User } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início", icon: Home },
    { href: "/dashboard", label: "Meu Progresso", icon: User },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/">
            <a className="text-xl md:text-2xl font-bold text-primary hover:text-primary/90 transition-colors touch-manipulation">
              IRON MIND
            </a>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-medium transition-colors hover:text-primary touch-manipulation ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </a>
                </Link>
              );
            })}
          </div>

          {/* User Avatar (Simplified) */}
          <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center font-semibold">
            M
          </div>
        </div>
      </div>
    </nav>
  );
}
