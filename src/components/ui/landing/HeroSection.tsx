
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AnimatedGradient = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-background">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)]">
      <div className="absolute left-[50%] top-0 -z-10 h-[600px] w-[600px] -translate-x-[30%] translate-y-[-10%] rounded-full bg-primary/20 opacity-20 blur-3xl"></div>
      <div className="absolute left-[40%] top-[40%] -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 opacity-20 blur-3xl"></div>
    </div>
  </div>
);

const FeaturePoint = ({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), parseInt(delay));
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`flex items-center gap-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
      <span className="flex items-center justify-center bg-primary/10 p-1 rounded-full">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate tabs
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const tabContent = [
    {
      title: "Create",
      description: "Build a professional resume in minutes with our simple editor.",
      color: "from-blue-500 to-cyan-400",
      icon: <ChevronRight className="h-5 w-5" />,
    },
    {
      title: "Customize",
      description: "Choose from multiple templates and tailor your resume for specific jobs.",
      color: "from-purple-500 to-pink-400",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "Impress",
      description: "Stand out with AI-enhanced content that highlights your strengths.",
      color: "from-emerald-500 to-green-400",
      icon: <ArrowRight className="h-5 w-5" />,
    }
  ];
  
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <AnimatedGradient />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div 
            className={`max-w-3xl transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-display mb-6">
              Craft the Perfect Resume with <span className="text-primary">AI-Powered</span> Simplicity
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Create professional, personalized resumes in minutes. Our AI assistant helps you highlight your strengths and stand out to employers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="rounded-full px-6">
                <Link to="/signup">
                  Start Building Your Resume
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-6">
                <Link to="/templates">
                  Explore Templates
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Powered by advanced AI to craft perfect resumes</span>
            </div>
          </div>
          
          <div 
            className={`mt-16 w-full max-w-4xl transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            {/* Interactive Feature Showcase */}
            <div className="bg-card shadow-lg rounded-xl p-6 md:p-8">
              <div className="flex justify-center mb-6">
                <div className="inline-flex bg-muted rounded-full p-1 shadow-md">
                  {tabContent.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        activeTab === index 
                          ? "bg-white dark:bg-secondary shadow-sm transform scale-105" 
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                    >
                      <span className={`${activeTab === index ? "text-primary" : ""}`}>
                        {tab.icon}
                      </span>
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-lg bg-muted/30">
                {tabContent.map((tab, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${
                      activeTab === index 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                  >
                    <div className={`text-white font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r ${tab.color} bg-clip-text text-transparent flex items-center gap-2`}>
                      <span className="inline-block bg-gradient-to-r from-primary to-primary/70 p-2 rounded-full text-white">
                        {tab.icon}
                      </span>
                      {tab.title}
                    </div>
                    <p className="text-center text-lg mb-6 max-w-md">
                      {tab.description}
                    </p>
                    
                    <div className="bg-card border border-border p-4 rounded-lg max-w-md w-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="space-y-3">
                        <FeaturePoint 
                          icon={<Sparkles className="h-4 w-4 text-primary" />} 
                          text="AI-powered content suggestions" 
                          delay="100" 
                        />
                        <FeaturePoint 
                          icon={<ArrowRight className="h-4 w-4 text-primary" />} 
                          text="Multiple professional templates" 
                          delay="300" 
                        />
                        <FeaturePoint 
                          icon={<ChevronRight className="h-4 w-4 text-primary" />} 
                          text="Easy export to PDF and DOCX" 
                          delay="500" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
