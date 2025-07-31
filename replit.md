# Overview

This is a full-stack AI Website Generator application built with React, Express, and TypeScript. The app allows users to generate complete websites (frontend + backend code) using multiple AI providers like OpenAI, Google Gemini, Anthropic Claude, and OpenRouter. Users can describe their website requirements in natural language, and the AI generates both HTML/CSS/JavaScript frontend code and Python FastAPI backend code, which can be downloaded as a ZIP file.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful endpoints with JSON request/response format
- **Development**: Vite middleware integration for hot reloading in development
- **Error Handling**: Global error middleware with structured error responses
- **Request Logging**: Custom middleware for API request logging and performance monitoring

## Data Storage
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema changes
- **Connection**: Neon serverless PostgreSQL driver for database connectivity
- **In-Memory Fallback**: Memory-based storage implementation for development/testing

## AI Integration
- **Multi-Provider Support**: Modular AI provider system supporting OpenAI, Google Gemini, Anthropic Claude, and OpenRouter
- **Request Structure**: Standardized interface for different AI providers with model selection
- **Code Generation**: Structured prompts to generate both frontend (HTML/CSS/JS) and backend (Python FastAPI) code
- **Response Processing**: JSON-based responses parsed into frontend and backend code components

## File Generation & Download
- **ZIP Creation**: JSZip library for creating downloadable website packages
- **File Structure**: Organized output with separate frontend and backend folders plus documentation
- **Download Endpoint**: Streaming response for ZIP file downloads with proper headers

# External Dependencies

## AI Services
- **OpenAI**: GPT-4 and GPT-4o models for code generation
- **Google Gemini**: Gemini 2.0 and 1.5 Pro models via @google/genai SDK
- **Anthropic**: Claude Sonnet 4 (latest) and 3.5 models via @anthropic-ai/sdk
- **OpenRouter**: Multi-model access through unified API

## Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple

## Development Tools
- **TypeScript**: Full-stack type safety with shared schema definitions
- **Vite**: Fast development server with HMR and optimized production builds
- **ESBuild**: Fast bundling for server-side code in production
- **Replit Integration**: Development environment plugins for Replit hosting

## UI & Styling
- **Radix UI**: Headless component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **PostCSS**: CSS processing with autoprefixer for browser compatibility