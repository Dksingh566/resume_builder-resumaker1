
import { HeroSection } from "@/components/ui/landing/HeroSection";
import { FeaturesSection } from "@/components/ui/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/ui/landing/TestimonialsSection";
import { CtaSection } from "@/components/ui/landing/CtaSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
