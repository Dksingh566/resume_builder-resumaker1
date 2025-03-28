
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "The AI suggestions helped me highlight skills I didn't realize were important. I received callbacks for 3 out of 5 jobs I applied to!",
    author: "Sarah Johnson",
    role: "Marketing Specialist"
  },
  {
    quote: "As someone who struggles with writing, this tool was a game-changer. The real-time feedback made crafting my resume so much easier.",
    author: "David Chen",
    role: "Software Engineer"
  },
  {
    quote: "I was able to create a professional-looking resume in under 30 minutes. The templates are clean and modern - exactly what recruiters want to see.",
    author: "Michelle Rodriguez",
    role: "HR Professional"
  },
  {
    quote: "The customization options allowed me to create a resume that matched my personal brand. I'm now confident my resume stands out from the crowd.",
    author: "James Wilson",
    role: "Graphic Designer"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };
  
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);
  
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have successfully improved their job prospects.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div 
            ref={testimonialRef}
            className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Quote className="h-8 w-8 text-primary" />
            </div>
            
            <div className="min-h-[160px] md:min-h-[120px] relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : direction === 'right' && index === (currentIndex - 1 + testimonials.length) % testimonials.length
                      ? "opacity-0 -translate-x-20"
                      : direction === 'left' && index === (currentIndex + 1) % testimonials.length
                      ? "opacity-0 translate-x-20"
                      : "opacity-0 translate-x-0"
                  }`}
                >
                  <p className="text-xl md:text-2xl font-medium mb-6 text-balance">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrev}
                    className="rounded-full"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="rounded-full"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
