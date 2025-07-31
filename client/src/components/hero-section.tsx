import { Zap, Download, Code } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Generate Full-Stack Websites with 
          <span className="text-primary"> AI Magic</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Describe your website idea in plain English and watch as AI creates complete frontend and backend code. 
          Supports OpenAI, Gemini, Claude, and OpenRouter.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Instant Generation</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center space-x-2">
            <Download className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">ZIP Download</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center space-x-2">
            <Code className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Full-Stack Code</span>
          </div>
        </div>
      </div>
    </section>
  );
}
