import JSZip from 'jszip';
import { getAIProvider } from './ai-providers';
import { type GeneratedWebsite, type GenerateWebsiteRequest } from '@shared/schema';

export class WebsiteGeneratorService {
  async generateWebsite(request: GenerateWebsiteRequest): Promise<GeneratedWebsite> {
    const provider = getAIProvider(request.provider);
    
    try {
      const result = await provider.generateWebsite(
        request.description,
        request.apiKey,
        request.model
      );
      
      return result;
    } catch (error) {
      throw new Error(`Failed to generate website: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async createZipFile(generatedWebsite: GeneratedWebsite): Promise<Buffer> {
    const zip = new JSZip();
    
    // Add frontend files
    const frontendFolder = zip.folder("frontend");
    frontendFolder?.file("index.html", generatedWebsite.frontend);
    
    // Add backend files
    const backendFolder = zip.folder("backend");
    backendFolder?.file("main.py", generatedWebsite.backend);
    backendFolder?.file("requirements.txt", generatedWebsite.requirements);
    
    // Add documentation
    zip.file("README.md", generatedWebsite.readme);
    
    // Generate and return the zip buffer
    return await zip.generateAsync({ type: "nodebuffer" });
  }
}

export const websiteGeneratorService = new WebsiteGeneratorService();
