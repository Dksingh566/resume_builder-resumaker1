
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Ready to Create Your Professional Resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of job seekers who have successfully landed interviews with resumes created using our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="rounded-full px-6">
                <Link to="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-6">
                <Link to="/templates">View Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
