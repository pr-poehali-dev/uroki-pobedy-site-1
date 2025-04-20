
import { Book, Medal, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectInfo = () => {
  return (
    <div className="space-y-8 py-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">О проекте "Уроки Победы"</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Образовательный проект, созданный для сохранения памяти о героях и событиях, которые изменили ход истории
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <Book className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Сохранение истории</CardTitle>
            <CardDescription>
              Мы собираем и систематизируем исторические материалы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Проект "Уроки Победы" направлен на сохранение исторических документов, фотографий и свидетельств о героических событиях. Мы создаем цифровой архив для будущих поколений.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Medal className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Чествование героев</CardTitle>
            <CardDescription>
              Каждая история героизма заслуживает быть рассказанной
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Мы рассказываем о подвигах больших и малых, известных и безымянных героев, чьи поступки и жертвы обеспечили нашу свободу. Память о них должна жить вечно.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Heart className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Патриотическое воспитание</CardTitle>
            <CardDescription>
              Прививаем любовь к Родине и уважение к её истории
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Через уроки истории мы помогаем молодому поколению понять ценность мира, важность единства и любви к своему Отечеству. Патриотизм — это то, что объединяет нас всех.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted p-6 rounded-lg mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="rounded-full bg-background p-4 flex-shrink-0">
            <img 
              src="/placeholder.svg" 
              alt="Блинов Антон Александрович" 
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">Создатель проекта</h3>
            <p className="text-lg">Блинов Антон Александрович</p>
            <p className="text-sm text-muted-foreground mt-2">
              "Наша задача — сохранить память о подвиге народа и передать её молодому поколению. 
              Через образование и просвещение мы строим будущее, основанное на уважении к истории и любви к Родине."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
