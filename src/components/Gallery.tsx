
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, FileText, Mail, Camera } from "lucide-react";

type ImageCategory = "frontline" | "documents" | "letters";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: ImageCategory;
};

const images: GalleryImage[] = [
  // Фотографии с фронтов
  {
    id: 1,
    src: "/placeholder.svg",
    alt: "Солдаты на передовой",
    title: "Передовая, 1943",
    description: "Группа солдат во время короткой передышки между боями на Курской дуге.",
    category: "frontline",
  },
  {
    id: 2,
    src: "/placeholder.svg",
    alt: "Танки Т-34 перед наступлением",
    title: "Подготовка к наступлению",
    description: "Танковая дивизия готовится к решающему сражению, 1944 год.",
    category: "frontline",
  },
  {
    id: 3,
    src: "/placeholder.svg",
    alt: "Медсестра оказывает помощь раненому",
    title: "Полевой госпиталь",
    description: "Медицинские работники спасали жизни солдат в тяжелейших условиях.",
    category: "frontline",
  },

  // Документы
  {
    id: 4,
    src: "/placeholder.svg",
    alt: "Приказ о наступлении",
    title: "Секретный приказ",
    description: "Документ с грифом 'Совершенно секретно' о подготовке к наступательной операции.",
    category: "documents",
  },
  {
    id: 5,
    src: "/placeholder.svg",
    alt: "Военный билет",
    title: "Военный билет",
    description: "Военный билет рядового Иванова И.И., участника битвы за Москву.",
    category: "documents",
  },
  {
    id: 6,
    src: "/placeholder.svg",
    alt: "Наградной лист",
    title: "Наградной лист",
    description: "Наградной лист к ордену Красной Звезды за проявленное мужество в бою.",
    category: "documents",
  },

  // Фронтовые письма
  {
    id: 7,
    src: "/placeholder.svg",
    alt: "Треугольное письмо с фронта",
    title: "Письмо домой",
    description: "Треугольное письмо солдата своей семье, отправленное в 1942 году.",
    category: "letters",
  },
  {
    id: 8,
    src: "/placeholder.svg",
    alt: "Благодарственное письмо",
    title: "Благодарственное письмо",
    description: "Письмо с благодарностью от командования родителям героя.",
    category: "letters",
  },
  {
    id: 9,
    src: "/placeholder.svg",
    alt: "Последнее письмо",
    title: "Последнее письмо",
    description: "Письмо, написанное накануне решающего сражения. Автор погиб на следующий день.",
    category: "letters",
  },
];

const ImageHandler = ({ image }: { image: GalleryImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-64">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-pulse h-8 w-8 rounded-full bg-muted-foreground/30"></div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
          <Camera className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Ошибка загрузки</p>
        </div>
      )}
      
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="frontline" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="frontline" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Фотографии</span> с фронтов
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Военные</span> документы
          </TabsTrigger>
          <TabsTrigger value="letters" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Фронтовые</span> письма
          </TabsTrigger>
        </TabsList>
        
        {["frontline", "documents", "letters"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images
                .filter((img) => img.category === category as ImageCategory)
                .map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <CardContent className="p-0 relative group">
                      <ImageHandler image={image} />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                        <h3 className="font-bold">{image.title}</h3>
                        <p className="text-sm line-clamp-2">{image.description}</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2 bg-transparent border-white text-white hover:bg-white/20"
                              onClick={() => setSelectedImage(image)}
                            >
                              <Maximize2 className="h-4 w-4 mr-2" />
                              Увеличить
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            {selectedImage && (
                              <div className="space-y-4">
                                <div className="relative w-full max-h-[70vh]">
                                  <ImageHandler image={selectedImage} />
                                </div>
                                <div>
                                  <h2 className="text-xl font-bold">{selectedImage.title}</h2>
                                  <p className="text-muted-foreground">{selectedImage.description}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Gallery;
