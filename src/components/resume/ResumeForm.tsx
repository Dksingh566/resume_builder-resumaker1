
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Plus,
  Trash2,
  User,
  Building, 
  GraduationCap, 
  Bookmark,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface ResumeFormProps {
  onUpdateResume: (data: any) => void;
}

export function ResumeForm({ onUpdateResume }: ResumeFormProps) {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: ""
  });
  
  const [workExperience, setWorkExperience] = useState([
    { 
      title: "", 
      company: "", 
      location: "", 
      startDate: "", 
      endDate: "", 
      description: "" 
    }
  ]);
  
  const [education, setEducation] = useState([
    { 
      institution: "", 
      degree: "", 
      startYear: "", 
      endYear: "" 
    }
  ]);
  
  const [skills, setSkills] = useState<string[]>([""]);
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
    
    // Update parent component
    onUpdateResume({
      personalInfo: {
        ...personalInfo,
        [name]: value
      },
      workExperience,
      education,
      skills
    });
  };
  
  const handleWorkExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [name]: value
    };
    
    setWorkExperience(updatedWorkExperience);
    
    // Update parent component
    onUpdateResume({
      personalInfo,
      workExperience: updatedWorkExperience,
      education,
      skills
    });
  };
  
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value
    };
    
    setEducation(updatedEducation);
    
    // Update parent component
    onUpdateResume({
      personalInfo,
      workExperience,
      education: updatedEducation,
      skills
    });
  };
  
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    
    setSkills(updatedSkills);
    
    // Update parent component
    onUpdateResume({
      personalInfo,
      workExperience,
      education,
      skills: updatedSkills
    });
  };
  
  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { 
        title: "", 
        company: "", 
        location: "", 
        startDate: "", 
        endDate: "", 
        description: "" 
      }
    ]);
  };
  
  const removeWorkExperience = (index: number) => {
    if (workExperience.length > 1) {
      const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
      setWorkExperience(updatedWorkExperience);
      
      // Update parent component
      onUpdateResume({
        personalInfo,
        workExperience: updatedWorkExperience,
        education,
        skills
      });
    }
  };
  
  const addEducation = () => {
    setEducation([
      ...education,
      { 
        institution: "", 
        degree: "", 
        startYear: "", 
        endYear: "" 
      }
    ]);
  };
  
  const removeEducation = (index: number) => {
    if (education.length > 1) {
      const updatedEducation = education.filter((_, i) => i !== index);
      setEducation(updatedEducation);
      
      // Update parent component
      onUpdateResume({
        personalInfo,
        workExperience,
        education: updatedEducation,
        skills
      });
    }
  };
  
  const addSkill = () => {
    setSkills([...skills, ""]);
  };
  
  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      const updatedSkills = skills.filter((_, i) => i !== index);
      setSkills(updatedSkills);
      
      // Update parent component
      onUpdateResume({
        personalInfo,
        workExperience,
        education,
        skills: updatedSkills
      });
    }
  };
  
  const enhanceWithAI = (section: string) => {
    // In a real implementation, this would call an AI API
    setTimeout(() => {
      if (section === "summary") {
        const enhancedSummary = "Experienced professional with a proven track record of success in delivering results through strategic thinking and collaborative leadership. Adept at analyzing complex problems and developing innovative solutions.";
        setPersonalInfo({
          ...personalInfo,
          summary: enhancedSummary
        });
        
        onUpdateResume({
          personalInfo: {
            ...personalInfo,
            summary: enhancedSummary
          },
          workExperience,
          education,
          skills
        });
        
        toast.success("AI has enhanced your summary!");
      } else if (section === "workExperience") {
        // Example AI enhancement for first work experience
        if (workExperience[0].title) {
          const updatedExperiences = [...workExperience];
          updatedExperiences[0] = {
            ...updatedExperiences[0],
            description: `Led cross-functional teams to deliver key initiatives, resulting in a 15% increase in efficiency and $200K in cost savings. Implemented innovative strategies that improved customer satisfaction ratings by 20%.`
          };
          
          setWorkExperience(updatedExperiences);
          
          onUpdateResume({
            personalInfo,
            workExperience: updatedExperiences,
            education,
            skills
          });
          
          toast.success("AI has enhanced your work experience description!");
        } else {
          toast.error("Please fill in basic job details first.");
        }
      }
    }, 1500);
  };
  
  return (
    <div className="bg-card h-full overflow-y-auto p-6 rounded-lg shadow-sm border border-border">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={personalInfo.fullName} 
                  onChange={handlePersonalInfoChange} 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  name="jobTitle" 
                  value={personalInfo.jobTitle} 
                  onChange={handlePersonalInfoChange} 
                  placeholder="Software Engineer" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={personalInfo.email} 
                  onChange={handlePersonalInfoChange} 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={personalInfo.phone} 
                  onChange={handlePersonalInfoChange} 
                  placeholder="(123) 456-7890" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={personalInfo.location} 
                  onChange={handlePersonalInfoChange} 
                  placeholder="New York, NY" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="summary">Professional Summary</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs gap-1"
                  onClick={() => enhanceWithAI("summary")}
                >
                  <Sparkles className="h-3 w-3" />
                  Enhance with AI
                </Button>
              </div>
              <Textarea 
                id="summary" 
                name="summary" 
                value={personalInfo.summary} 
                onChange={handlePersonalInfoChange} 
                placeholder="A brief summary of your professional background and key strengths..." 
                className="min-h-[120px]"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6">
          {workExperience.map((job, index) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Work Experience {index + 1}</h3>
                {workExperience.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeWorkExperience(index)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Job Title</Label>
                  <Input 
                    id={`title-${index}`} 
                    name="title" 
                    value={job.title} 
                    onChange={(e) => handleWorkExperienceChange(index, e)} 
                    placeholder="Software Engineer" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input 
                    id={`company-${index}`} 
                    name="company" 
                    value={job.company} 
                    onChange={(e) => handleWorkExperienceChange(index, e)} 
                    placeholder="Acme Inc." 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input 
                    id={`location-${index}`} 
                    name="location" 
                    value={job.location} 
                    onChange={(e) => handleWorkExperienceChange(index, e)} 
                    placeholder="New York, NY" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input 
                    id={`startDate-${index}`} 
                    name="startDate" 
                    value={job.startDate} 
                    onChange={(e) => handleWorkExperienceChange(index, e)} 
                    placeholder="Jan 2020" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input 
                    id={`endDate-${index}`} 
                    name="endDate" 
                    value={job.endDate} 
                    onChange={(e) => handleWorkExperienceChange(index, e)} 
                    placeholder="Present" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`description-${index}`}>Job Description</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs gap-1"
                    onClick={() => enhanceWithAI("workExperience")}
                  >
                    <Sparkles className="h-3 w-3" />
                    Enhance with AI
                  </Button>
                </div>
                <Textarea 
                  id={`description-${index}`} 
                  name="description" 
                  value={job.description} 
                  onChange={(e) => handleWorkExperienceChange(index, e)} 
                  placeholder="Describe your responsibilities and achievements..." 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addWorkExperience}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Position
          </Button>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Education {index + 1}</h3>
                {education.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeEducation(index)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input 
                    id={`institution-${index}`} 
                    name="institution" 
                    value={edu.institution} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    placeholder="University of Example" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input 
                    id={`degree-${index}`} 
                    name="degree" 
                    value={edu.degree} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    placeholder="B.S. Computer Science" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startYear-${index}`}>Start Year</Label>
                  <Input 
                    id={`startYear-${index}`} 
                    name="startYear" 
                    value={edu.startYear} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    placeholder="2016" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endYear-${index}`}>End Year</Label>
                  <Input 
                    id={`endYear-${index}`} 
                    name="endYear" 
                    value={edu.endYear} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    placeholder="2020" 
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addEducation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Education
          </Button>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Add relevant skills that showcase your expertise. Be specific and prioritize skills mentioned in the job description.
          </p>
          
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={skill} 
                onChange={(e) => handleSkillChange(index, e.target.value)} 
                placeholder={`Skill ${index + 1} (e.g., JavaScript, Project Management)`} 
              />
              {skills.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeSkill(index)}
                  className="h-10 w-10 text-destructive flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addSkill}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Skill
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
