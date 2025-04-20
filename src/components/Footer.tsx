
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Уроки Победы</h3>
            <p className="text-muted-foreground text-sm">
              Образовательный проект, посвященный сохранению исторической памяти о Великой Отечественной войне
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Разделы</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary">Главная</Link></li>
              <li><Link to="/lessons" className="hover:text-primary">Уроки</Link></li>
              <li><Link to="/materials" className="hover:text-primary">Материалы</Link></li>
              <li><Link to="/about" className="hover:text-primary">О проекте</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Ресурсы</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/gallery" className="hover:text-primary">Галерея</Link></li>
              <li><Link to="/documents" className="hover:text-primary">Документы</Link></li>
              <li><Link to="/faq" className="hover:text-primary">Вопросы и ответы</Link></li>
              <li><Link to="/contacts" className="hover:text-primary">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Связаться с нами</h4>
            <p className="text-sm text-muted-foreground mb-2">Электронная почта: info@pobeda2025.ru</p>
            <p className="text-sm text-muted-foreground">Телефон: +7 (XXX) XXX-XX-XX</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Образовательный проект "Уроки Победы". Все права защищены.
          </p>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">К 80-летию Победы 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
