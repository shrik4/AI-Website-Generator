import { Monitor, Eye } from "lucide-react";

interface WebsitePreviewProps {
  generationStatus?: any;
}

export default function WebsitePreview({ generationStatus }: WebsitePreviewProps) {
  const hasCode = generationStatus?.status === "completed" && generationStatus?.generatedCode;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-primary" />
          Live Preview
        </h3>
      </div>
      <div className="aspect-video bg-gray-100">
        {hasCode ? (
          <iframe 
            srcDoc={generationStatus.generatedCode.frontend}
            className="w-full h-full border-0"
            title="Website Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Website preview will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
