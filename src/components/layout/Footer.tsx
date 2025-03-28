
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github, ExternalLink, Mail, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export function Footer() {
  const isMobile = useIsMobile();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com", name: "Facebook", hoverClass: "hover:bg-blue-100 hover:text-blue-600" },
    { icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com", name: "Twitter", hoverClass: "hover:bg-sky-100 hover:text-sky-500" },
    { icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com", name: "Instagram", hoverClass: "hover:bg-pink-100 hover:text-pink-600" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com", name: "LinkedIn", hoverClass: "hover:bg-blue-100 hover:text-blue-700" },
    { icon: <Github className="h-5 w-5" />, url: "https://github.com", name: "GitHub", hoverClass: "hover:bg-gray-100 hover:text-gray-800" },
  ];

  const handleShare = (platform: string, url: string) => {
    const websiteUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this amazing resume builder!");
    
    let shareUrl = "";
    
    switch(platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`;
        break;
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${websiteUrl}&text=${text}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`;
        break;
      default:
        window.open(url, "_blank");
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };
  
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold font-display mb-4 flex items-center">
              <span className="bg-primary text-white p-1.5 rounded-md mr-2 transform hover:rotate-12 transition-all duration-300">
                <HeartPulse className="h-4 w-4" />
              </span>
              Resumaker
            </h2>
            <p className="text-muted-foreground max-w-md">
              Craft professional resumes effortlessly with our AI-powered tools. Stand out to employers 
              and land your dream job with a resume that highlights your unique skills and experiences.
            </p>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Connect with us</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${social.hoverClass} transform hover:scale-110 transition-all duration-200 relative`}
                    aria-label={social.name}
                    onClick={() => handleShare(social.name, social.url)}
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    {social.icon}
                    {hoveredIcon === social.name && !isMobile && (
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded shadow-md whitespace-nowrap">
                        Share on {social.name}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 relative group">
              <span className="relative z-10">Product</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  <span>Templates</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  <span>Features</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  <span>Pricing</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 relative group">
              <span className="relative z-10">Company</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  <span>About</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  <span>Blog</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  <span>Contact</span>
                  <Mail className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Resumaker. All rights reserved.
          </p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
