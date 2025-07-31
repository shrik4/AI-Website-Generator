import { Button } from "@/components/ui/button";
import { Code2, Github, Star } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Website Generator</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Github className="w-5 h-5" />
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Star on GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
