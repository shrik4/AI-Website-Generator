import { Button } from "@/components/ui/button";
import { Code, FileCode } from "lucide-react";
import { useState } from "react";

interface CodePreviewProps {
  generationStatus?: any;
  isGenerating: boolean;
}

export default function CodePreview({ generationStatus, isGenerating }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");

  const hasCode = generationStatus?.status === "completed" && generationStatus?.generatedCode;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Code className="w-5 h-5 mr-2 text-primary" />
            Generated Code
          </h3>
          {hasCode && (
            <div className="flex items-center space-x-2">
              <Button 
                variant={activeTab === "frontend" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("frontend")}
              >
                Frontend
              </Button>
              <Button 
                variant={activeTab === "backend" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("backend")}
              >
                Backend
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        {!hasCode && !isGenerating && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCode className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No code generated yet</h4>
            <p className="text-gray-500 mb-6">Enter a website description and click generate to see your code here.</p>
            <div className="text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center">
                  <Code className="w-4 h-4 mr-1" />
                  Frontend HTML/CSS/JS
                </span>
                <span className="flex items-center">
                  <Code className="w-4 h-4 mr-1" />
                  Backend Python/FastAPI
                </span>
              </div>
            </div>
          </div>
        )}

        {hasCode && (
          <div className="bg-slate-800 rounded-lg p-4 text-sm font-mono text-gray-100 overflow-x-auto max-h-96 overflow-y-auto">
            <div className="text-green-400 mb-2">
              // Generated {activeTab === "frontend" ? "Frontend" : "Backend"} Code
            </div>
            <pre className="whitespace-pre-wrap">
              {activeTab === "frontend" 
                ? generationStatus.generatedCode.frontend 
                : generationStatus.generatedCode.backend
              }
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
