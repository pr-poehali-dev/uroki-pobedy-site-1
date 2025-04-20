
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Образовательный проект <br />
              <span className="text-primary">"Уроки Победы"</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Вдохновляющие уроки истории и патриотизма, посвященные великим подвигам нашего народа
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button>
                Начать обучение <ArrowRight className="ml-2" />
              </Button>
              <Button variant="outline">Узнать больше</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative rounded-full bg-white/10 border border-white/20 p-8 shadow-2xl">
              <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full"></div>
              <div className="relative flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <span className="text-5xl font-bold">2025</span>
                    </div>
                  </div>
                  <p className="mt-4 font-medium text-xl">80 лет Победы</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
