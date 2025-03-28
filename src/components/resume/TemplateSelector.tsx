
import { useState } from "react";
import { Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a touch of color",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout focused on readability",
    thumbnail: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative fields",
    thumbnail: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
  }
];

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
      <h3 className="font-medium mb-4">Choose a Template</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {templates.map(template => (
          <div
            key={template.id}
            className={`relative rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
              selectedTemplate === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="aspect-[210/297] relative overflow-hidden">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                <Check className="h-4 w-4" />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h4 className="font-medium mb-1">{template.name}</h4>
              <p className="text-xs text-white/80">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
