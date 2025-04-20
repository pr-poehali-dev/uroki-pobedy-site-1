
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Holiday {
  date: Date;
  name: string;
  description: string;
}

const holidays: Holiday[] = [
  { 
    date: new Date(2025, 0, 1), // 1 января
    name: "Новый год",
    description: "Традиционный праздник, отмечаемый во многих странах мира."
  },
  { 
    date: new Date(2025, 0, 7), // 7 января
    name: "Рождество Христово",
    description: "Один из главных христианских праздников."
  },
  { 
    date: new Date(2025, 1, 23), // 23 февраля
    name: "День защитника Отечества",
    description: "Праздник, посвящённый защитникам Отечества."
  },
  { 
    date: new Date(2025, 2, 8), // 8 марта
    name: "Международный женский день",
    description: "Праздник весны и внимания к женщинам."
  },
  { 
    date: new Date(2025, 3, 12), // 12 апреля
    name: "День космонавтики",
    description: "В этот день в 1961 году Юрий Гагарин совершил первый полёт в космос."
  },
  { 
    date: new Date(2025, 4, 1), // 1 мая
    name: "Праздник Весны и Труда",
    description: "Праздник, отмечаемый во многих странах мира 1 мая."
  },
  { 
    date: new Date(2025, 4, 9), // 9 мая
    name: "День Победы",
    description: "День победы советского народа в Великой Отечественной войне 1941—1945 годов."
  },
  { 
    date: new Date(2025, 5, 12), // 12 июня
    name: "День России",
    description: "Государственный праздник Российской Федерации."
  },
  { 
    date: new Date(2025, 10, 4), // 4 ноября
    name: "День народного единства",
    description: "Праздник, учреждённый в память о событиях 1612 года."
  }
];

const HolidayBanner = () => {
  const [currentHolidayIndex, setCurrentHolidayIndex] = useState(0);
  const [timeUntilHoliday, setTimeUntilHoliday] = useState("");
  
  // Сортировка праздников по ближайшей дате
  useEffect(() => {
    const getNearestHolidays = () => {
      const now = new Date();
      const thisYear = now.getFullYear();
      
      // Создаем копии праздников с датами текущего года
      const holidaysThisYear = holidays.map(holiday => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setFullYear(thisYear);
        return { ...holiday, date: holidayDate };
      });
      
      // Если праздник уже прошел, добавляем его на следующий год
      const upcomingHolidays = holidaysThisYear.map(holiday => {
        const holidayDate = new Date(holiday.date);
        if (holidayDate < now) {
          holidayDate.setFullYear(thisYear + 1);
        }
        return { ...holiday, date: holidayDate };
      });
      
      // Сортируем по дате
      upcomingHolidays.sort((a, b) => a.date.getTime() - b.date.getTime());
      
      return upcomingHolidays;
    };
    
    const sortedHolidays = getNearestHolidays();
    setCurrentHolidayIndex(0);
  }, []);

  // Обновление времени до праздника
  useEffect(() => {
    const updateTimeUntilHoliday = () => {
      const now = new Date();
      const thisYear = now.getFullYear();
      
      let holidayDate = new Date(holidays[currentHolidayIndex].date);
      holidayDate.setFullYear(thisYear);
      
      // Если праздник уже прошел в этом году, берем дату на следующий год
      if (holidayDate < now) {
        holidayDate.setFullYear(thisYear + 1);
      }
      
      const diff = holidayDate.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilHoliday(`${days} дн. ${hours} ч. ${minutes} мин.`);
    };
    
    updateTimeUntilHoliday();
    const interval = setInterval(updateTimeUntilHoliday, 60000); // Обновление каждую минуту
    
    return () => clearInterval(interval);
  }, [currentHolidayIndex]);

  const nextHoliday = () => {
    setCurrentHolidayIndex((prev) => (prev + 1) % holidays.length);
  };

  const prevHoliday = () => {
    setCurrentHolidayIndex((prev) => (prev - 1 + holidays.length) % holidays.length);
  };

  const currentHoliday = holidays[currentHolidayIndex];
  const holidayDate = new Date(currentHoliday.date);
  const formattedDate = holidayDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevHoliday}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-center flex-1 px-2">
          <div className="font-bold text-primary">{currentHoliday.name}</div>
          <div className="text-sm">{formattedDate}</div>
          <div className="text-xs text-muted-foreground mt-1">До праздника: {timeUntilHoliday}</div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextHoliday}
          className="h-8 w-8"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HolidayBanner;
