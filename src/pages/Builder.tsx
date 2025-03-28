
import { useState } from "react";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/TemplateSelector";
import { ResumeActions } from "@/components/resume/ResumeActions";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LayoutGrid, Eye, FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const Builder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    workExperience: [
      { 
        title: "", 
        company: "", 
        location: "", 
        startDate: "", 
        endDate: "", 
        description: "" 
      }
    ],
    education: [
      { 
        institution: "", 
        degree: "", 
        startYear: "", 
        endYear: "" 
      }
    ],
    skills: [""]
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [activeView, setActiveView] = useState<"form" | "preview" | "both">("both");
  
  const handleUpdateResume = (data: any) => {
    setResumeData(data);
  };
  
  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    toast.success("Your resume has been downloaded!");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold font-display">Resume Builder</h1>
            
            <div className="flex items-center gap-2">
              <div className="bg-secondary rounded-lg p-1 hidden md:flex">
                <Button 
                  variant={activeView === "form" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("form")}
                  className="rounded-md gap-1"
                >
                  <FilePenLine className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
                <Button 
                  variant={activeView === "preview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("preview")}
                  className="rounded-md gap-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </Button>
                <Button 
                  variant={activeView === "both" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("both")}
                  className="rounded-md gap-1"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Both</span>
                </Button>
              </div>
              
              <ThemeToggle />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Mobile view switcher */}
            <div className="lg:hidden flex items-center bg-secondary rounded-lg p-1 w-full mb-4">
              <Button 
                variant={activeView === "form" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView("form")}
                className="flex-1 rounded-md gap-1"
              >
                <FilePenLine className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              <Button 
                variant={activeView === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView("preview")}
                className="flex-1 rounded-md gap-1"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </Button>
            </div>
            
            {/* Form column */}
            {(activeView === "form" || activeView === "both") && (
              <div className={`${activeView === "both" ? "lg:col-span-7" : "lg:col-span-12"}`}>
                <ResumeForm onUpdateResume={handleUpdateResume} />
              </div>
            )}
            
            {/* Preview column */}
            {(activeView === "preview" || activeView === "both") && (
              <div className={`${activeView === "both" ? "lg:col-span-5" : "lg:col-span-12"}`}>
                <div className="space-y-6">
                  <div className="bg-secondary/50 p-6 rounded-lg flex items-center justify-center">
                    <ResumePreview 
                      personalInfo={resumeData.personalInfo}
                      workExperience={resumeData.workExperience}
                      education={resumeData.education}
                      skills={resumeData.skills}
                      selectedTemplate={selectedTemplate}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TemplateSelector 
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                    <ResumeActions onDownload={handleDownload} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Builder;
