# Sybot AI - Professional AI Assistant

A modern, professional AI-powered chat application built with Next.js, featuring voice interaction, web search capabilities, and a beautiful user interface.

![Sybot AI](https://img.shields.io/badge/Sybot-AI%20Assistant-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### 🤖 AI Capabilities
- **Multi-Model Support**: OpenAI, Anthropic, Google, Groq, Ollama, and more
- **Web Search**: Real-time information retrieval from the internet
- **Voice Interaction**: Speech recognition and text-to-speech
- **Multi-language Support**: 50+ languages for voice and text
- **File Upload**: Support for documents, images, and more
- **Demo Mode**: Works without API keys for testing

### 🎨 User Interface
- **Modern Design**: Beautiful gradient UI with smooth animations
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching
- **Voice Controls**: Intuitive voice input/output interface
- **Chat History**: Persistent conversation management
- **Search Functionality**: Find and filter chat history

### 🔧 Technical Features
- **Next.js 15**: Latest App Router with Server Components
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first styling with custom design system
- **AI SDK**: Vercel AI SDK for streaming responses
- **Voice API**: Web Speech API integration
- **Error Handling**: Robust error management and fallbacks

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sybot-ai.git
   cd sybot-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   # OpenAI
   OPENAI_API_KEY=your_openai_key_here
   
   # Anthropic
   ANTHROPIC_API_KEY=your_anthropic_key_here
   
   # Google
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_key_here
   
   # Groq
   GROQ_API_KEY=your_groq_key_here
   
   # Ollama (for local models)
   OLLAMA_BASE_URL=http://localhost:11434
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Chat
1. Type your message in the input field
2. Press Enter or click the send button
3. Get instant AI responses with streaming

### Voice Features
1. Click the microphone button to start voice input
2. Speak your question clearly
3. Click the speaker button to hear responses
4. Adjust voice settings in the settings panel

### Web Search
1. Toggle to "Search Mode" in the header
2. Ask questions that require current information
3. Get real-time results from the web

### File Upload
1. Click the upload button or drag files
2. Supported formats: PDF, DOC, TXT, JPG, PNG
3. Ask questions about your uploaded content

## 🏗️ Project Structure

```
sybot-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── chat.tsx          # Main chat component
│   ├── voice-controls.tsx # Voice interaction
│   └── ...
├── lib/                  # Utility functions
│   ├── actions/          # Server actions
│   ├── config/           # Configuration
│   ├── streaming/        # AI streaming logic
│   └── utils.ts          # Helper functions
├── contexts/             # React contexts
├── types/                # TypeScript types
└── public/               # Static assets
```

## 🔧 Configuration

### AI Models
The application supports multiple AI providers. Configure them in your environment variables:

- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Anthropic**: Claude-3, Claude-2
- **Google**: Gemini Pro, Gemini Flash
- **Groq**: Fast inference models
- **Ollama**: Local models (Mistral, Llama, etc.)

### Voice Settings
- **Speech Recognition**: 50+ languages
- **Text-to-Speech**: Adjustable rate and pitch
- **Auto-speak**: Automatically read AI responses

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment variables
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vercel AI SDK** for streaming AI responses
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Web Speech API** for voice features

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/sybot-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/sybot-ai/discussions)
- **Email**: support@sycomindustrials.com

## 🏢 About

Built with ❤️ by [Sycom Industrials](https://sycomindustrials.com)

---

**Star this repository if you find it helpful! ⭐** 
