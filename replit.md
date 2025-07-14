# EduConnect - Educational Communication Platform

## Overview

EduConnect is a comprehensive educational communication platform designed to connect students, parents, and educators through intuitive and engaging digital experiences. The platform serves as a centralized hub for school communication, bringing together academic progress tracking, community engagement, event management, and real-time messaging in one cohesive platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: React Context API with React Query for server state
- **Responsive Design**: Mobile-first approach with adaptive layouts (mobile, tablet, desktop)

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Not yet implemented (marked as open in roadmap)
- **Real-time Features**: WebSocket support planned but currently disabled due to Replit environment issues

### Key Components

1. **Navigation System**
   - Bottom navigation bar for mobile devices
   - Side navigation for desktop
   - Responsive navigation that adapts to screen size

2. **Messaging System**
   - Real-time chat interface with conversation management
   - Message bubbles with sender/receiver styling
   - Mock data implementation for development

3. **Event Management**
   - Academic and extracurricular event tracking
   - Calendar integration capabilities
   - Event categorization and filtering

4. **User Management**
   - User profiles with avatar generation
   - Role-based access (students, parents, educators)
   - Mock user data for development

5. **Content Management**
   - Social feed with stories and interactions
   - Academic progress tracking
   - Community engagement features

## Data Flow

### Database Schema
The application uses a PostgreSQL database with the following main tables:
- `users`: Store user profiles and authentication data
- `conversations`: Manage chat conversations and group messaging
- `messages`: Store individual messages with sender and timestamp information

### State Management
- React Context provides global state for chat functionality
- React Query handles server state management and caching
- Local state for UI interactions and form handling

### Data Access Pattern
- Drizzle ORM provides type-safe database queries
- Mock data implementation for development and testing
- RESTful API endpoints for data operations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connection for Neon PostgreSQL
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **drizzle-kit**: Database migrations and schema management
- **tsx**: TypeScript execution for server development
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 22+
- **Development Server**: Next.js development server on port 5000
- **Database**: PostgreSQL (configured for Neon Database)
- **Environment**: Optimized for Replit deployment

### Production Considerations
- Static asset optimization with Next.js
- Database migrations handled through Drizzle Kit
- Environment variable configuration for database connections
- WebSocket functionality to be implemented when environment supports it

### Build Process
1. TypeScript compilation and type checking
2. Vite build for client-side assets
3. esbuild bundling for server-side code
4. Database schema push for migrations

## Architecture Decisions

### Mobile-First Design
- **Problem**: Need to serve users across various devices with emphasis on mobile usage
- **Solution**: Implemented responsive design with mobile-first approach
- **Benefits**: Better user experience on mobile devices, progressive enhancement for larger screens

### Mock Data Implementation
- **Problem**: Need to develop and test features without full backend implementation
- **Solution**: Comprehensive mock data system with realistic user interactions
- **Benefits**: Faster development iteration, easier testing, clear data structure definition

### Component-Based Architecture
- **Problem**: Need maintainable and reusable UI components
- **Solution**: Modular component system with Radix UI primitives and custom components
- **Benefits**: Consistent design system, accessibility features, easier maintenance

### Context-Based State Management
- **Problem**: Need to share chat and user state across components
- **Solution**: React Context API with custom providers
- **Benefits**: Avoids prop drilling, centralized state management, easier testing

### Drizzle ORM Choice
- **Problem**: Need type-safe database operations with PostgreSQL
- **Solution**: Drizzle ORM with TypeScript integration
- **Benefits**: Type safety, better developer experience, migration management