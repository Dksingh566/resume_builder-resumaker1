
import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  LayoutTemplate, 
  Download, 
  Eye, 
  Smartphone, 
  Palette 
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Intelligent recommendations to enhance your resume content based on industry standards and job descriptions.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description: "Choose from a variety of ATS-friendly templates designed to impress recruiters across industries.",
  },
  {
    icon: Eye,
    title: "Real-Time Preview",
    description: "See your changes instantly with a live preview that shows exactly how your resume will look.",
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Download your resume as PDF or DOCX, or share directly with potential employers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Build and edit your resume on any device with our fully responsive interface.",
  },
  {
    icon: Palette,
    title: "Customization Options",
    description: "Personalize your resume with custom colors, fonts, and layouts to match your style.",
  },
];

export function FeaturesSection() {
  const [activeFeatures, setActiveFeatures] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timeout = setTimeout(() => {
            const newActiveFeatures: number[] = [];
            
            for (let i = 0; i < features.length; i++) {
              setTimeout(() => {
                setActiveFeatures(prev => [...prev, i]);
              }, i * 150);
            }
            
            return () => clearTimeout(timeout);
          }, 300);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-24 bg-secondary/50 dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Powerful Features for Professional Resumes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive set of tools makes resume creation fast, easy, and effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card p-6 rounded-xl transition-all duration-500 ${
                activeFeatures.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
