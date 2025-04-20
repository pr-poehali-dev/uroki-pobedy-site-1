
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnlineStatus from "@/components/OnlineStatus";
import Gallery from "@/components/Gallery";
import { WifiOff } from "lucide-react";
import HolidayBanner from "@/components/HolidayBanner";

const GalleryPage = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <HolidayBanner />
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Архивные материалы</h1>
        
        {isOnline ? (
          <Gallery />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-muted rounded-lg">
            <WifiOff className="w-16 h-16 mb-4 text-destructive" />
            <h2 className="text-2xl font-bold mb-2">Нет подключения к сети</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Для просмотра галереи необходимо подключение к интернету
            </p>
            <p className="text-sm text-muted-foreground">
              Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова
            </p>
          </div>
        )}
      </main>
      <Footer />
      <OnlineStatus />
    </div>
  );
};

export default GalleryPage;
