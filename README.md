# Sybot AI - Enhanced AI-Powered Answer Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A fully open-source, modern, and feature-rich AI-powered answer engine with a generative UI. Built with cutting-edge technology and designed for the best user experience.

## 🚀 Features

### 🤖 AI-Powered Chat
- **Advanced Conversational AI** with context awareness and natural language processing
- **Real-time Web Search** integration for up-to-date information and answers
- **Smart Responses** with reasoning, citations, and multiple perspectives
- **Multi-Modal Support** for text, images, files, and various content types

### 🎨 Modern UI/UX
- **Contemporary Design** with glass morphism and modern aesthetics
- **Responsive Layout** optimized for all devices and screen sizes
- **Interactive Components** with smooth animations and transitions
- **Accessibility First** with WCAG compliance and screen reader support

### 🔧 Enhanced Components
- **8 Spinner Variants** with customizable sizes, colors, and speeds
- **Comprehensive UI Library** with reusable components
- **Interactive Demo** with real-time customization options
- **Specialized Components** for common use cases

### 📊 Advanced Features
- **Real-time Statistics** and performance metrics
- **Quick Prompts** for easy conversation starters
- **Enhanced Navigation** with comprehensive sidebar
- **Mobile-First Design** with touch-optimized interactions

## 🎯 Key Improvements

### ✨ Visual Enhancements
- Modern layout with improved spacing and visual hierarchy
- Background patterns and gradient overlays for visual depth
- Glass morphism effects with backdrop blur
- Enhanced typography with gradient text effects
- Refined color palette with better contrast

### 🎨 UI Components
- **8 Animation Variants**: default, dots, pulse, logo, ring, bars, grid, wave
- **6 Size Options**: xs, sm, md, lg, xl, 2xl
- **7 Color Themes**: primary, secondary, muted, white, success, warning, error
- **3 Speed Settings**: slow, normal, fast
- **Accessibility**: Built-in ARIA labels and screen reader support

### 📱 Responsive Design
- Mobile-first responsive design
- Touch-optimized interactions
- Adaptive layouts for all screen sizes
- Smooth animations and transitions

### 🔒 Security & Performance
- Optimized performance and loading times
- Secure input validation and sanitization
- Proper error handling and user feedback
- Comprehensive logging and monitoring

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **AI Integration**: AI SDK
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sybot-ai.git
   cd sybot-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
sybot-ai/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # UI component library
│   ├── chat.tsx          # Chat interface
│   ├── header.tsx        # Header component
│   ├── sidebar.tsx       # Sidebar navigation
│   └── footer.tsx        # Footer component
├── lib/                  # Utility libraries
│   ├── actions/          # Server actions
│   ├── config/           # Configuration
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🎨 Component Library

### Spinner Components
```tsx
import { Spinner, LoadingSpinner, FullScreenSpinner } from '@/components/ui/spinner'

// Basic usage
<Spinner />

// With customization
<Spinner 
  variant="ring" 
  size="lg" 
  color="primary" 
  speed="fast" 
  text="Loading..." 
/>

// Specialized components
<ButtonSpinner />
<DataSpinner />
<SuccessSpinner />
<ErrorSpinner />
```

### UI Components
```tsx
import { Button, Card, Badge } from '@/components/ui'

// Modern button with variants
<Button variant="default" size="lg">
  Get Started
</Button>

// Card with enhanced styling
<Card>
  <CardHeader>
    <CardTitle>Feature Title</CardTitle>
  </CardHeader>
  <CardContent>
    Feature description
  </CardContent>
</Card>
```

## 🎯 Usage Examples

### Chat Interface
```tsx
import { Chat } from '@/components/chat'

export default function ChatPage() {
  return (
    <Chat 
      id="unique-chat-id"
      models={availableModels}
    />
  )
}
```

### Spinner Demo
```tsx
import { SpinnerDemo } from '@/components/spinner-demo'

export default function DemoPage() {
  return <SpinnerDemo />
}
```

## 🔧 Configuration

### Environment Variables
```bash
# AI Configuration
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Database
DATABASE_URL=your_database_url

# Redis (Optional)
REDIS_URL=your_redis_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Customization
- **Themes**: Customize colors and themes in `app/globals.css`
- **Components**: Modify UI components in `components/ui/`
- **Styling**: Update Tailwind configuration in `tailwind.config.ts`

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic code splitting for optimal loading
- **Image Optimization**: Built-in image optimization with Next.js
- **Caching**: Efficient caching strategies
- **Bundle Analysis**: Optimized bundle sizes

### Metrics
- **First Load JS**: ~101 kB
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics

## 🔒 Security

### Security Features
- **Input Validation**: Comprehensive input validation and sanitization
- **XSS Protection**: Cross-site scripting protection
- **CSRF Protection**: Cross-site request forgery protection
- **Secure Headers**: Proper security headers implementation

### Best Practices
- **TypeScript**: Full type safety
- **Error Handling**: Graceful error handling and user feedback
- **Logging**: Comprehensive error logging and monitoring
- **Testing**: Proper testing setup and coverage

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Prettier for code formatting
- Follow ESLint rules
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible UI components
- **AI SDK** for AI integration capabilities

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/sybot-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/sybot-ai/discussions)
- **Email**: support@sybot.ai

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with Netlify deployment
- **Railway**: Easy deployment with Railway
- **Docker**: Docker containerization supported

---

**Made with ❤️ by the Sybot Team**

*Transform your AI experience with Sybot - The intelligent answer engine for the modern web.* 
