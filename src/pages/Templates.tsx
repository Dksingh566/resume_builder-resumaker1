
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  premium: boolean;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a touch of color",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
    category: "Professional",
    tags: ["minimalist", "clean", "corporate"],
    premium: false
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout focused on readability",
    thumbnail: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
    category: "Traditional",
    tags: ["corporate", "formal", "traditional"],
    premium: false
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative fields",
    thumbnail: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
    category: "Creative",
    tags: ["design", "colorful", "unique"],
    premium: true
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior professionals",
    thumbnail: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
    category: "Professional",
    tags: ["executive", "leadership", "corporate"],
    premium: true
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, simple layout that focuses on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
    category: "Minimalist",
    tags: ["minimalist", "simple", "clean"],
    premium: false
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern design for technology professionals",
    thumbnail: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
    category: "Technical",
    tags: ["tech", "developer", "IT"],
    premium: true
  }
];

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  const categories = ["All", "Professional", "Creative", "Traditional", "Minimalist", "Technical"];
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeFilter === "All" || template.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">Resume Templates</h1>
            <p className="text-lg text-muted-foreground">
              Choose from our collection of professionally designed templates to create your perfect resume
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search templates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex overflow-x-auto pb-2 gap-2 md:pb-0">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="group relative bg-card rounded-lg overflow-hidden border border-border transition-all hover:shadow-md">
                <div className="aspect-[210/297] relative overflow-hidden">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                
                {template.premium && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    Premium
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-white/90 mb-3">{template.description}</p>
                  
                  <div className="flex gap-2 mt-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-white/20 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button asChild size="lg">
                    <Link to={template.premium ? "/pricing" : `/builder?template=${template.id}`}>
                      {template.premium ? "Upgrade to Use" : "Use This Template"}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No templates match your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
