# Technology Stack and Development Setup

## Core Technologies

### Frontend Framework
- **React 19.2.0**: Latest React with concurrent features
- **TypeScript 5.9.3**: Static typing and enhanced developer experience
- **Vite 7.2.4**: Fast build tool and development server

### State Management
- **Redux Toolkit 2.11.2**: Modern Redux with simplified API
- **React Redux 9.2.0**: React bindings for Redux

### Routing
- **React Router DOM 7.11.0**: Client-side routing and navigation

### Styling
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **Tailwind Vite Plugin**: Vite integration for Tailwind
- **PostCSS 8.5.6**: CSS processing and autoprefixer

### Development Tools
- **ESLint 9.39.1**: Code linting and style enforcement
- **TypeScript ESLint 8.46.4**: TypeScript-specific linting rules
- **Vite React Plugin 5.1.1**: React support for Vite

### Testing
- **Playwright 1.57.0**: End-to-end testing framework

## Build System

### Package Manager
- **npm**: Standard Node.js package manager
- **package-lock.json**: Dependency version locking

### Build Configuration
- **vite.config.ts**: Vite build configuration
- **tsconfig.json**: TypeScript project references
- **tsconfig.app.json**: Application TypeScript config
- **tsconfig.node.json**: Node.js TypeScript config

### Code Quality
- **eslint.config.js**: ESLint configuration
- **TypeScript strict mode**: Enhanced type checking

## Development Commands

### Core Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run test        # Run Playwright tests
```

### Development Workflow
1. **Development**: `npm run dev` starts Vite dev server
2. **Type Checking**: TypeScript compilation with `tsc -b`
3. **Linting**: ESLint with React and TypeScript rules
4. **Testing**: Playwright for E2E test automation
5. **Building**: Vite production build with optimization

## Project Configuration

### TypeScript Setup
- Project references for modular compilation
- Strict type checking enabled
- Path mapping for clean imports

### ESLint Configuration
- React hooks rules
- React refresh rules
- TypeScript integration
- Modern JavaScript globals

### Vite Configuration
- React plugin integration
- TypeScript support
- Development server optimization
- Production build optimization

## Environment Requirements
- **Node.js**: Modern version supporting ES modules
- **npm**: Package management and script execution
- **Modern Browser**: For development and testing