<<<<<<< HEAD
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
=======
# Sybotai

An AI-powered search engine with a generative UI.

![capture](/public/screenshot-2025-01-31.png)

## 🗂️ Overview

- 🛠 [Features](#-features)
- 🧱 [Stack](#-stack)
- 🚀 [Quickstart](#-quickstart)
- 🌐 [Deploy](#-deploy)
- 🔎 [Search Engine](#-search-engine)
- ✅ [Verified models](#-verified-models)
- ⚡ [AI SDK Implementation](#-ai-sdk-implementation)
- 📦 [Open Source vs Cloud Offering](#-open-source-vs-cloud-offering)
- 👥 [Contributing](#-contributing)

## 🛠 Features

### Core Features

- AI-powered search with GenerativeUI
- Natural language question understanding
- Multiple search providers support (Tavily, SearXNG, Exa)
- Model selection from UI (switch between available AI models)
  - Reasoning models with visible thought process

### Chat & History

- Chat history functionality (Optional)
- Share search results (Optional)
- Redis support (Local/Upstash)

### AI Providers

The following AI providers are supported:

- OpenAI (Default)
- Google Generative AI
- Azure OpenAI
- Anthropic
- Ollama
- Groq
- DeepSeek
- Fireworks
- xAI (Grok)
- OpenAI Compatible

Models are configured in `public/config/models.json`. Each model requires its corresponding API key to be set in the environment variables. See [Configuration Guide](docs/CONFIGURATION.md) for details.

### Search Capabilities

- URL-specific search
- Video search support (Optional)
- SearXNG integration with:
  - Customizable search depth (basic/advanced)
  - Configurable engines
  - Adjustable results limit
  - Safe search options
  - Custom time range filtering

### Additional Features

- Docker deployment ready
- Browser search engine integration

## 🧱 Stack

### Core Framework

- [Next.js](https://nextjs.org/) - App Router, React Server Components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - Text streaming / Generative UI

### AI & Search

- [OpenAI](https://openai.com/) - Default AI provider (Optional: Google AI, Anthropic, Groq, Ollama, Azure OpenAI, DeepSeek, Fireworks)
- [Tavily AI](https://tavily.com/) - Default search provider
- Alternative providers:
  - [SearXNG](https://docs.searxng.org/) - Self-hosted search
  - [Exa](https://exa.ai/) - Neural search

### Data Storage

- [Upstash](https://upstash.com/) - Serverless Redis
- [Redis](https://redis.io/) - Local Redis option

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

## 🚀 Quickstart

### 1. Fork and Clone repo

Fork the repo to your Github account, then run the following command to clone the repo:

```bash
git clone git@github.com:[YOUR_GITHUB_ACCOUNT]/sybot-ai.git
```

### 2. Install dependencies

```bash
cd sybotai
bun install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the required environment variables in `.env.local`:

```bash
# Required
OPENAI_API_KEY=     # Get from https://platform.openai.com/api-keys
TAVILY_API_KEY=     # Get from https://app.tavily.com/home
```

For optional features configuration (Redis, SearXNG, etc.), see [CONFIGURATION.md](./docs/CONFIGURATION.md)

### 4. Run app locally

#### Using Bun

```bash
bun dev
```

#### Using Docker

```bash
docker compose up -d
```

Visit http://localhost:3000 in your browser.

## 🌐 Deploy

Host your own live version of Morphic with Vercel, Cloudflare Pages, or Docker.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmiurla%2Fmorphic&env=OPENAI_API_KEY,TAVILY_API_KEY,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

### Docker Prebuilt Image

Prebuilt Docker images are available on GitHub Container Registry:

```bash
docker pull ghcr.io/miurla/sybotai:latest
```

You can use it with docker-compose:

```yaml
services:
  sybotai:
    image: ghcr.io/miurla/morphic:latest
    env_file: .env.local
    ports:
      - '3000:3000'
    volumes:
      - ./models.json:/app/public/config/models.json # Optional: Override default model configuration
```

The default model configuration is located at `public/config/models.json`. For Docker deployment, you can create `models.json` alongside `.env.local` to override the default configuration.

## 🔎 Search Engine

### Setting up the Search Engine in Your Browser

If you want to use Morphic as a search engine in your browser, follow these steps:

1. Open your browser settings.
2. Navigate to the search engine settings section.
3. Select "Manage search engines and site search".
4. Under "Site search", click on "Add".
5. Fill in the fields as follows:
   - **Search engine**: Morphic
   - **Shortcut**: morphic
   - **URL with %s in place of query**: `https://sybotai.it.com/search?q=%s`
6. Click "Add" to save the new search engine.
7. Find "Morphic" in the list of site search, click on the three dots next to it, and select "Make default".

This will allow you to use Morphic as your default search engine in the browser.

## ✅ Verified models

### List of models applicable to all

- OpenAI
  - gpt-4.1
  - gpt-4.1-mini
  - gpt-4.1-nano
  - o3-mini
  - gpt-4o
  - gpt-4o-mini
  - gpt-4-turbo
  - gpt-3.5-turbo
- Google
  - Gemini 2.5 Pro (Experimental)
  - Gemini 2.0 Flash Thinking (Experimental)
  - Gemini 2.0 Flash
- Anthropic
  - Claude 3.5 Sonnet
  - Claude 3.5 Hike
- Ollama
  - qwen2.5
  - deepseek-r1
- Groq
  - deepseek-r1-distill-llama-70b
  - Llama 4 Maverick 17B
- Fireworks
  - DeepSeek R1
  - Llama 4 Maverick
- DeepSeek
  - DeepSeek V3
  - DeepSeek R1
- xAI
  - grok-2
  - grok-2-vision
  - grok-3-beta

## ⚡ AI SDK Implementation

### Current Version: AI SDK UI

This version of Morphic uses the AI SDK UI implementation, which is recommended for production use. It provides better streaming performance and more reliable client-side UI updates.

### Previous Version: AI SDK RSC (v0.2.34 and earlier)

The React Server Components (RSC) implementation of AI SDK was used in versions up to [v0.2.34](https://github.com/freshblue1234/sybot-ai/releases/tag/v0.2.34) but is now considered experimental and not recommended for production. If you need to reference the RSC implementation, please check the v0.2.34 release tag.

> Note: v0.2.34 was the final version using RSC implementation before migrating to AI SDK UI.

For more information about choosing between AI SDK UI and RSC, see the [official documentation](https://sdk.vercel.ai/docs/getting-started/navigating-the-library#when-to-use-ai-sdk-rsc).

## 📦 Open Source vs Cloud Offering

Morphic is open source software available under the Apache-2.0 license.

To maintain sustainable development and provide cloud-ready features, we offer a hosted version of Morphic alongside our open-source offering. The cloud solution makes Morphic accessible to non-technical users and provides additional features while keeping the core functionality open and available for developers.

For our cloud service, visit [morphic.sh](https://sybotai.it.com).

## 👥 Contributing

We welcome contributions to Morphic! Whether it's bug reports, feature requests, or pull requests, all contributions are appreciated.

Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- How to submit issues
- How to submit pull requests
- Commit message conventions
- Development setup
"# Sybot-AI" 
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
