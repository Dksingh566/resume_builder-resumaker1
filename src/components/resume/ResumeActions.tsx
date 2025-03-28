
import { Download, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ResumeActionsProps {
  onDownload: () => void;
}

export function ResumeActions({ onDownload }: ResumeActionsProps) {
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    setTimeout(() => {
      toast.success("Resume downloaded successfully!");
      onDownload();
    }, 1000);
  };
  
  const handleShare = () => {
    // In a real implementation, this would share the resume
    toast.success("Shareable link copied to clipboard!");
  };
  
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
      <h3 className="font-medium mb-4">Actions</h3>
      
      <div className="space-y-3">
        <Button 
          variant="default" 
          className="w-full justify-start"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
        >
          <FileText className="h-4 w-4 mr-2" />
          Download DOCX
        </Button>
        
        <Button 
          variant="secondary" 
          className="w-full justify-start"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Resume
        </Button>
      </div>
    </div>
  );
}
