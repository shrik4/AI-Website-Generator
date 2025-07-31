import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Brain, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface AIProviderSelectionProps {
  provider: string;
  model: string;
  apiKey: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  onApiKeyChange: (apiKey: string) => void;
}

const providers = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4, GPT-4o",
    bgColor: "border-primary bg-primary/5",
    textColor: "text-primary",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Gemini 2.0, 1.5 Pro",
    bgColor: "border-gray-200 bg-white hover:border-gray-300",
    textColor: "text-gray-700",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude Sonnet 4, 3.5",
    bgColor: "border-gray-200 bg-white hover:border-gray-300",
    textColor: "text-gray-700",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Access Multiple AI Models",
    bgColor: "border-gray-200 bg-white hover:border-gray-300",
    textColor: "text-gray-700",
  },
];

export default function AIProviderSelection({ 
  provider, 
  model, 
  apiKey, 
  onProviderChange, 
  onModelChange, 
  onApiKeyChange 
}: AIProviderSelectionProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  const { data: models } = useQuery({
    queryKey: ["/api/models"],
  });

  const currentProviderModels = (models as Record<string, any>)?.[provider] || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Brain className="w-5 h-5 mr-2 text-primary" />
        AI Provider Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Provider</label>
          <div className="grid grid-cols-2 gap-3">
            {providers.map((p) => (
              <Button
                key={p.id}
                variant="ghost"
                className={`p-3 border-2 transition-all hover:shadow-md ${
                  provider === p.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => {
                  onProviderChange(p.id);
                  // Reset model when provider changes
                  const newProviderModels = (models as Record<string, any>)?.[p.id] || [];
                  if (newProviderModels.length > 0) {
                    onModelChange(newProviderModels[0].id);
                  }
                }}
              >
                <div className="text-left w-full">
                  <div className={`text-sm font-medium ${provider === p.id ? "text-primary" : "text-gray-700"}`}>
                    {p.name}
                  </div>
                  <div className={`text-xs ${provider === p.id ? "text-primary/70" : "text-gray-500"}`}>
                    {p.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model Selection</label>
          <Select value={model} onValueChange={onModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {currentProviderModels.map((m: any) => (
                <SelectItem key={m.id} value={m.id}>
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
          <div className="relative">
            <Input 
              type={showApiKey ? "text" : "password"}
              className="w-full pr-12"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Your API key is stored securely and never saved permanently.</p>
        </div>
      </div>
    </div>
  );
}
