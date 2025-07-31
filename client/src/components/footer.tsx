import { Code2, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">AI Website Generator</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Create complete full-stack websites using the power of AI. From simple landing pages to complex web applications.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Supported AI</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>OpenAI GPT-4</li>
              <li>Google Gemini</li>
              <li>Anthropic Claude</li>
              <li>OpenRouter</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Frontend Generation</li>
              <li>Backend APIs</li>
              <li>Code Preview</li>
              <li>ZIP Download</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 AI Website Generator. Made with ❤️ by shrikar</p>
        </div>
      </div>
    </footer>
  );
}
