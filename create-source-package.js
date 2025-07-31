import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

const zip = new JSZip();

// Add main config files
const configFiles = [
  'package.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'tsconfig.json',
  'postcss.config.js',
  'components.json',
  'drizzle.config.ts'
];

configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    zip.file(file, fs.readFileSync(file, 'utf8'));
  }
});

// Add README
zip.file('README.md', `# AI Website Generator

A full-stack TypeScript application that generates complete websites using multiple AI providers.

## Features
- Multiple AI providers: OpenAI, Google Gemini, Anthropic Claude, OpenRouter
- User-provided API keys (no server-side secrets)
- Real-time generation progress tracking
- Complete website packages (frontend + backend)
- ZIP download of generated websites

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open http://localhost:5000

## Usage

1. Enter a description of the website you want to create
2. Select an AI provider and model
3. Enter your API key for the chosen provider
4. Click "Generate Website"
5. Wait for generation to complete
6. Download the ZIP file with your complete website

## API Keys

You'll need an API key from one of these providers:
- OpenAI: https://platform.openai.com/api-keys
- Google Gemini: https://ai.google.dev/
- Anthropic Claude: https://console.anthropic.com/
- OpenRouter: https://openrouter.ai/

## Architecture

- Frontend: React 18 + TypeScript + Vite
- Backend: Express.js + TypeScript
- UI: Shadcn/ui + Tailwind CSS
- State Management: TanStack Query
- AI Integration: Multiple provider SDKs
- File Generation: JSZip for download packages
`);

// Add shared schema
const sharedDir = zip.folder('shared');
if (fs.existsSync('shared/schema.ts')) {
  sharedDir.file('schema.ts', fs.readFileSync('shared/schema.ts', 'utf8'));
}

// Add server files
const serverDir = zip.folder('server');
const serverFiles = [
  'index.ts',
  'routes.ts', 
  'storage.ts',
  'vite.ts'
];

serverFiles.forEach(file => {
  const filePath = path.join('server', file);
  if (fs.existsSync(filePath)) {
    serverDir.file(file, fs.readFileSync(filePath, 'utf8'));
  }
});

// Add server services
const servicesDir = serverDir.folder('services');
const serviceFiles = ['ai-providers.ts', 'website-generator.ts'];
serviceFiles.forEach(file => {
  const filePath = path.join('server/services', file);
  if (fs.existsSync(filePath)) {
    servicesDir.file(file, fs.readFileSync(filePath, 'utf8'));
  }
});

// Add client files
const clientDir = zip.folder('client');
if (fs.existsSync('client/index.html')) {
  clientDir.file('index.html', fs.readFileSync('client/index.html', 'utf8'));
}

const clientSrcDir = clientDir.folder('src');
const clientSrcFiles = ['App.tsx', 'main.tsx', 'index.css'];
clientSrcFiles.forEach(file => {
  const filePath = path.join('client/src', file);
  if (fs.existsSync(filePath)) {
    clientSrcDir.file(file, fs.readFileSync(filePath, 'utf8'));
  }
});

// Add client pages
const pagesDir = clientSrcDir.folder('pages');
const pageFiles = ['home.tsx', 'not-found.tsx'];
pageFiles.forEach(file => {
  const filePath = path.join('client/src/pages', file);
  if (fs.existsSync(filePath)) {
    pagesDir.file(file, fs.readFileSync(filePath, 'utf8'));
  }
});

// Add client lib
const libDir = clientSrcDir.folder('lib');
const libFiles = ['utils.ts', 'queryClient.ts'];
libFiles.forEach(file => {
  const filePath = path.join('client/src/lib', file);
  if (fs.existsSync(filePath)) {
    libDir.file(file, fs.readFileSync(filePath, 'utf8'));
  }
});

// Add client hooks
const hooksDir = clientSrcDir.folder('hooks');
const hookFiles = ['use-toast.ts', 'use-mobile.tsx'];
hookFiles.forEach(file => {
  const filePath = path.join('client/src/hooks', file);
  if (fs.existsSync(filePath)) {
    hooksDir.file(file, fs.readFileSync(filePath, 'utf8'));
  }
});

// Add client components (we'll add the main ones manually)
const componentsDir = clientSrcDir.folder('components');

// Function to recursively add components
function addComponentsRecursively(dir, zipDir) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      const subDir = zipDir.folder(item.name);
      addComponentsRecursively(fullPath, subDir);
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      zipDir.file(item.name, fs.readFileSync(fullPath, 'utf8'));
    }
  });
}

addComponentsRecursively('client/src/components', componentsDir);

// Generate ZIP file
zip.generateAsync({type: 'nodebuffer'}).then(function(content) {
  fs.writeFileSync('ai-website-generator-source.zip', content);
  console.log('✅ Source code packaged successfully!');
  console.log('📁 File: ai-website-generator-source.zip');
  console.log('📝 Ready for download');
});