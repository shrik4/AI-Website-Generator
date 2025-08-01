# AI Website Generator

A full-stack TypeScript application that generates complete websites using multiple AI providers (OpenAI, Google Gemini, Anthropic Claude, OpenRouter) from natural language descriptions.

![AI Website Generator](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Features

- **Multiple AI Providers**: Support for OpenAI, Google Gemini, Anthropic Claude, and OpenRouter
- **User-Provided API Keys**: No server-side secrets required - users enter their own API keys
- **Real-time Progress**: Live tracking of website generation with automatic updates
- **Complete Website Packages**: Generates both frontend (HTML/CSS/JS) and backend (Python FastAPI) code
- **ZIP Download**: Package complete websites for easy deployment
- **Modern Stack**: Built with React 18, TypeScript, Express.js, and Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices

## Demo

Visit the live demo: [AI Website Generator](https://your-deployment-url.com)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API key from one of the supported providers

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shrik4/AI-Website-Generator.git
   cd ai-website-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

### Usage

1. Enter a description of the website you want to create
2. Select an AI provider and model
3. Enter your API key for the chosen provider
4. Click "Generate Website"
5. Wait for generation to complete (30-60 seconds)
6. Download the ZIP file with your complete website

## API Keys

You'll need an API key from one of these providers:

- **OpenAI**: [Get API Key](https://platform.openai.com/api-keys)
- **Google Gemini**: [Get API Key](https://ai.google.dev/)
- **Anthropic Claude**: [Get API Key](https://console.anthropic.com/)
- **OpenRouter**: [Get API Key](https://openrouter.ai/)

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **UI Components**: Shadcn/ui + Radix UI + Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **AI Integration**: Multiple provider SDKs (@anthropic-ai/sdk, @google/generative-ai, openai)
- **File Generation**: JSZip for download packages
- **Development**: Hot reload with Vite

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express.js backend
│   ├── services/           # Business logic
│   ├── routes.ts           # API endpoints
│   └── index.ts            # Server entry point
├── shared/                 # Shared TypeScript types
└── package.json           # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking

## Deployment

### Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project
4. Deploy automatically

### Netlify

1. Fork this repository
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist/public`

### Railway/Render

1. Fork this repository
2. Connect to your deployment platform
3. Set start command: `npm start`

## Environment Variables

No environment variables are required for basic operation. Users provide their own API keys through the UI.

For production deployments, you may want to set:

```bash
NODE_ENV=production
PORT=5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

- Create an [issue](https://github.com/yourusername/ai-website-generator/issues)
- Check the [documentation](https://github.com/yourusername/ai-website-generator/wiki)
- Join our [discussions](https://github.com/yourusername/ai-website-generator/discussions)

## Acknowledgments

- [OpenAI](https://openai.com/) for GPT models
- [Google](https://ai.google.dev/) for Gemini models
- [Anthropic](https://anthropic.com/) for Claude models
- [OpenRouter](https://openrouter.ai/) for multi-model access
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vercel](https://vercel.com/) for hosting and deployment

---

Made with ❤️ by [Your Name](https://github.com/yourusername)# AI-Website-Generator-
# AI-Website-Generator-
