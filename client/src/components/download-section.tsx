import { Button } from "@/components/ui/button";
import { Download, Archive, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadSectionProps {
  generationId: string | null;
  isCompleted: boolean;
}

export default function DownloadSection({ generationId, isCompleted }: DownloadSectionProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!generationId) return;

    try {
      const response = await fetch(`/api/download/${generationId}`);
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'website.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: "Your website ZIP file is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the website ZIP file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2 text-primary" />
        Download Your Website
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Complete Website Package</div>
              <div className="text-sm text-gray-500">Frontend + Backend + Documentation</div>
            </div>
          </div>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2"
            disabled={!isCompleted}
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            <span>Download ZIP</span>
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 mt-0.5 text-blue-500" />
            <div>
              The ZIP file includes frontend HTML/CSS/JS, backend Python FastAPI code, requirements.txt, and setup instructions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
