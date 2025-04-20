
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Header = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-10 w-10" />
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-primary" 
                style={{display: isOnline ? "block" : "none"}} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Уроки Победы</h1>
              <p className="text-xs text-primary-foreground/80">2025</p>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">Главная</Link>
          <Link to="/gallery" className="hover:underline">Галерея</Link>
          <Link to="/lessons" className="hover:underline">Уроки</Link>
          <Link to="/materials" className="hover:underline">Материалы</Link>
          <Link to="/about" className="hover:underline">О проекте</Link>
        </nav>
        <Button variant="secondary" size="sm">
          Войти
        </Button>
      </div>
    </header>
  );
};

export default Header;
