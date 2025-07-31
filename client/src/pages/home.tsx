import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import DescriptionInput from "@/components/description-input";
import AIProviderSelection from "@/components/ai-provider-selection";
import CodePreview from "@/components/code-preview";
import WebsitePreview from "@/components/website-preview";
import DownloadSection from "@/components/download-section";
import ExampleProjects from "@/components/example-projects";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface GenerateRequest {
  description: string;
  provider: string;
  model: string;
  apiKey: string;
}

interface GenerationStatus {
  id: string;
  status: "pending" | "generating" | "completed" | "failed";
  generatedCode?: {
    frontend: string;
    backend: string;
    readme: string;
    requirements: string;
  };
  error?: string;
}

export default function Home() {
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o");
  const [apiKey, setApiKey] = useState("");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateRequest) => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response.json();
    },
    onSuccess: (data) => {
      setGenerationId(data.id);
      toast({
        title: "Generation Started",
        description: "AI is generating your website. This may take 30-60 seconds.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to start website generation",
        variant: "destructive",
      });
    },
  });

  const { data: generationStatus } = useQuery<GenerationStatus>({
    queryKey: ["/api/generation", generationId],
    enabled: !!generationId,
    refetchInterval: 2000,
    refetchIntervalInBackground: false,
  });

  const handleGenerate = () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a website description",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      description,
      provider,
      model,
      apiKey,
    });
  };

  const isGenerating = generateMutation.isPending || generationStatus?.status === "generating";
  const isCompleted = generationStatus?.status === "completed";
  const hasFailed = generationStatus?.status === "failed";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="space-y-6">
            <DescriptionInput 
              value={description}
              onChange={setDescription}
            />
            
            <AIProviderSelection
              provider={provider}
              model={model}
              apiKey={apiKey}
              onProviderChange={setProvider}
              onModelChange={setModel}
              onApiKeyChange={setApiKey}
            />

            <Button 
              className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Brain className="w-6 h-6 animate-spin" />
                  <span>AI is generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>Generate Website</span>
                </>
              )}
            </Button>

            {/* Loading State */}
            {isGenerating && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-900">AI is generating your website...</div>
                    <div className="text-sm text-gray-500">This may take 30-60 seconds</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasFailed && (
              <div className="bg-white rounded-xl border border-red-200 p-6">
                <div className="text-red-600">
                  <h3 className="font-semibold mb-2">Generation Failed</h3>
                  <p className="text-sm">{generationStatus?.error || "An error occurred during generation"}</p>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <CodePreview 
              generationStatus={generationStatus}
              isGenerating={isGenerating}
            />
            
            <WebsitePreview 
              generationStatus={generationStatus}
            />
            
            <DownloadSection 
              generationId={generationId}
              isCompleted={isCompleted}
            />
          </div>
        </div>

        <ExampleProjects onExampleSelect={setDescription} />
      </main>

      <Footer />
    </div>
  );
}
