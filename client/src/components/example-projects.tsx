import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ExampleProjectsProps {
  onExampleSelect: (description: string) => void;
}

const examples = [
  {
    title: "Restaurant Website",
    description: "Complete restaurant site with menu, reservations, and online ordering system.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    tags: ["React", "FastAPI", "Payment"],
    prompt: "Create a modern restaurant website with menu display, online reservation system, customer reviews, photo gallery, and contact information. Include a hero section with appetizing food images and integrate online ordering with payment processing."
  },
  {
    title: "Photography Portfolio",
    description: "Elegant portfolio with image galleries, client testimonials, and contact forms.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    tags: ["Gallery", "Contact", "Responsive"],
    prompt: "Build a professional photography portfolio website with image galleries, client testimonials, service packages, and contact form. Make it visually stunning and mobile-responsive with smooth animations."
  },
  {
    title: "E-commerce Store",
    description: "Full online store with product catalog, cart, and secure checkout system.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    tags: ["Shopping", "Payment", "Auth"],
    prompt: "Create a complete e-commerce website for handmade jewelry with product catalog, shopping cart, user authentication, payment integration, order management, and customer reviews."
  },
];

export default function ExampleProjects({ onExampleSelect }: ExampleProjectsProps) {
  return (
    <section className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Example Generated Websites</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">See what AI can create with just a simple description</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {examples.map((example) => (
          <div key={example.title} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={example.image} 
              alt={`${example.title} example`} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{example.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {example.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center p-0"
                onClick={() => onExampleSelect(example.prompt)}
              >
                Try this example <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
