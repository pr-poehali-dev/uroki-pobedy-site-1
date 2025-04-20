
import { Book, Medal, Users, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Интерактивные уроки",
    description: "Современные мультимедийные материалы для глубокого погружения в историю",
    icon: <Book />
  },
  {
    title: "Живые истории",
    description: "Рассказы о подвигах и героях, сохраняющие историческую память",
    icon: <Medal />
  },
  {
    title: "Видеоархив",
    description: "Уникальные кадры и документальные фильмы о ключевых моментах",
    icon: <Video />
  },
  {
    title: "Сообщество",
    description: "Объединение педагогов и учеников для обмена опытом",
    icon: <Users />
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Особенности проекта</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Наш образовательный проект предлагает уникальные возможности для изучения истории Победы
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
