
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import OnlineStatus from "@/components/OnlineStatus";
import HolidayBanner from "@/components/HolidayBanner";
import MusicPlayer from "@/components/MusicPlayer";
import ProjectInfo from "@/components/ProjectInfo";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Features />
              <ProjectInfo />
            </div>
            <div className="space-y-6">
              <HolidayBanner />
              <MusicPlayer />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <OnlineStatus />
    </div>
  );
};

export default HomePage;
