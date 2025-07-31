import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { websiteGeneratorService } from "./services/website-generator";
import { generateWebsiteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate website endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const validatedData = generateWebsiteSchema.parse(req.body);
      
      // Create generation record
      const generation = await storage.createWebsiteGeneration({
        description: validatedData.description,
        provider: validatedData.provider,
        model: validatedData.model,
      });

      // Update status to generating
      await storage.updateWebsiteGeneration(generation.id, { status: "generating" });

      // Generate website in background
      websiteGeneratorService.generateWebsite(validatedData)
        .then(async (result) => {
          await storage.updateWebsiteGeneration(generation.id, {
            status: "completed",
            generatedCode: result,
          });
        })
        .catch(async (error) => {
          await storage.updateWebsiteGeneration(generation.id, {
            status: "failed",
            error: error.message,
          });
        });

      res.json({ id: generation.id, status: "generating" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
        return;
      }
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Get generation status
  app.get("/api/generation/:id", async (req, res) => {
    try {
      const generation = await storage.getWebsiteGeneration(req.params.id);
      if (!generation) {
        res.status(404).json({ message: "Generation not found" });
        return;
      }
      res.json(generation);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Download generated website as ZIP
  app.get("/api/download/:id", async (req, res) => {
    try {
      const generation = await storage.getWebsiteGeneration(req.params.id);
      if (!generation || generation.status !== "completed" || !generation.generatedCode) {
        res.status(404).json({ message: "Generation not found or not completed" });
        return;
      }

      const zipBuffer = await websiteGeneratorService.createZipFile(generation.generatedCode as any);
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="website.zip"');
      res.send(zipBuffer);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Download page for source code
  app.get("/download", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Download AI Website Generator Source Code</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
          .download-btn { background: #3b82f6; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; text-decoration: none; display: inline-block; }
          .download-btn:hover { background: #2563eb; }
          .info { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>AI Website Generator - Source Code</h1>
        <div class="info">
          <h3>Complete source code package ready for download</h3>
          <p><strong>File size:</strong> 234 KB</p>
          <p><strong>Includes:</strong> All TypeScript/React frontend, Express.js backend, configuration files, and setup instructions</p>
        </div>
        
        <a href="/api/download-source" class="download-btn">Download Source Code ZIP</a>
        
        <div class="info">
          <h3>Setup Instructions:</h3>
          <ol>
            <li>Extract the ZIP file</li>
            <li>Run <code>npm install</code></li>
            <li>Run <code>npm run dev</code></li>
            <li>Open http://localhost:5000</li>
          </ol>
          <p>Get API keys from your chosen provider: OpenAI, Google Gemini, Anthropic Claude, or OpenRouter</p>
        </div>
      </body>
      </html>
    `);
  });

  // Download source code ZIP
  app.get("/api/download-source", (req, res) => {
    try {
      const fs = require('fs');
      const path = require('path');
      const zipPath = path.resolve('./ai-website-generator-source.zip');
      
      if (!fs.existsSync(zipPath)) {
        res.status(404).json({ message: "Source package not found" });
        return;
      }

      const zipBuffer = fs.readFileSync(zipPath);
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="ai-website-generator-source.zip"');
      res.setHeader('Content-Length', zipBuffer.length);
      res.setHeader('Cache-Control', 'no-cache');
      res.end(zipBuffer);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Get available models for each provider
  app.get("/api/models", (req, res) => {
    const models = {
      openai: [
        { id: "gpt-4o", name: "GPT-4o (Latest)", description: "Most capable model" },
        { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Fast and capable" },
        { id: "gpt-4", name: "GPT-4", description: "High quality" },
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" },
      ],
      gemini: [
        { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", description: "Latest and fastest" },
        { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", description: "Most capable" },
        { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "High quality" },
      ],
      anthropic: [
        { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", description: "Latest model" },
        { id: "claude-3-7-sonnet-20250219", name: "Claude 3.7 Sonnet", description: "High performance" },
        { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet", description: "Balanced" },
      ],
      openrouter: [
        { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", description: "Via OpenRouter" },
        { id: "openai/gpt-4o", name: "GPT-4o", description: "Via OpenRouter" },
        { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro", description: "Via OpenRouter" },
      ],
    };
    res.json(models);
  });

  const httpServer = createServer(app);
  return httpServer;
}
