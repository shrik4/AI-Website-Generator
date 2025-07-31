import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const templates = [
  {
    emoji: "🍕",
    name: "Restaurant Website",
    description: "Create a modern restaurant website with menu display, online reservation system, customer reviews, photo gallery, and contact information. Include a hero section with appetizing food images."
  },
  {
    emoji: "📸",
    name: "Portfolio Site",
    description: "Build a professional photography portfolio website with image galleries, client testimonials, service packages, and contact form. Make it visually stunning and mobile-responsive."
  },
  {
    emoji: "🛍️",
    name: "E-commerce Store",
    description: "Create a complete e-commerce website for handmade jewelry with product catalog, shopping cart, user authentication, payment integration, and order management."
  },
  {
    emoji: "📝",
    name: "Blog Platform",
    description: "Build a modern blog platform with article management, user authentication, comment system, categories, tags, and search functionality."
  }
];

export default function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Edit3 className="w-5 h-5 mr-2 text-primary" />
        Describe Your Website
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website Description</label>
          <Textarea 
            className="w-full h-32 resize-none"
            placeholder="Example: Create a modern restaurant website with menu display, online ordering system, customer reviews, and contact information. Include a hero section with beautiful food images..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {templates.map((template) => (
            <Button
              key={template.name}
              variant="ghost"
              size="sm"
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              onClick={() => onChange(template.description)}
            >
              {template.emoji} {template.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
