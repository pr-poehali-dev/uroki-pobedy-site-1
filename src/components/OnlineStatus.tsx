
import { useState, useEffect } from "react";
import { Check, WifiOff } from "lucide-react";

const OnlineStatus = () => {
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

  if (isOnline) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center shadow-md">
        <Check className="w-4 h-4 mr-1" />
        Онлайн
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm flex items-center shadow-md">
      <WifiOff className="w-4 h-4 mr-1" />
      Офлайн
    </div>
  );
};

export default OnlineStatus;
