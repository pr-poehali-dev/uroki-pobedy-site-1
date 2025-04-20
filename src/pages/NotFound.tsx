
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Страница не найдена</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Извините, запрашиваемая вами страница не существует или была перемещена.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">
          <Home className="mr-2" />
          Вернуться на главную
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
