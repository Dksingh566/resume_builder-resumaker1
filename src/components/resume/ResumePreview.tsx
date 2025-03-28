
import { useState, useEffect } from "react";

interface ResumePreviewProps {
  personalInfo: any;
  workExperience: any[];
  education: any[];
  skills: string[];
  selectedTemplate: string;
}

export function ResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
  selectedTemplate = "modern"
}: ResumePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full">
          <div className="h-32 bg-muted rounded-lg w-full"></div>
          <div className="h-16 bg-muted rounded-lg w-3/4"></div>
          <div className="h-48 bg-muted rounded-lg w-full"></div>
          <div className="h-32 bg-muted rounded-lg w-full"></div>
          <div className="h-24 bg-muted rounded-lg w-3/4"></div>
        </div>
      </div>
    );
  }
  
  if (selectedTemplate === "modern") {
    return (
      <div className="bg-white text-black p-8 shadow-sm rounded-lg border border-border min-h-[842px] w-full relative" style={{ maxWidth: "595px" }}>
        {/* Header */}
        <div className="border-b border-primary/20 pb-4 mb-6">
          <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-primary">{personalInfo.jobTitle || "Your Job Title"}</p>
          
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            {personalInfo.email && (
              <span className="inline-flex items-center">
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="inline-flex items-center">
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="inline-flex items-center">
                {personalInfo.location}
              </span>
            )}
          </div>
        </div>
        
        {/* Profile Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-primary/90">Summary</h2>
            <p className="text-sm">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-primary/90">Experience</h2>
            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{job.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{job.company} • {job.location}</p>
                  <p className="text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-primary/90">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <span className="text-xs text-muted-foreground">
                      {edu.startYear} - {edu.endYear || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-primary/90">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-primary/10 px-2 py-1 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Default/fallback template
  return (
    <div className="bg-white text-black p-8 shadow-sm rounded-lg border border-border">
      <h1>No Preview Available</h1>
      <p>Please select a template.</p>
    </div>
  );
}
