# 🚀 Sybot AI - Complete Setup Guide

## ✨ **What You Get**

**Sybot AI** is a professional AI assistant with a **Grok-style interface** created by **Sycom Industry**. It features:

- 🎯 **Exact Grok Visual Design** - Black theme, large input field, action buttons
- 🎤 **Advanced Voice Assistant** - Speech recognition & text-to-speech
- 📁 **File Upload Support** - Drag & drop, multiple file types
- 🔍 **Web Search Integration** - Real-time information retrieval
- 🎨 **Image Generation** - AI-powered image creation
- 📰 **Latest News** - Current events and updates
- 👤 **Personas** - Multiple AI personality modes
- 🤖 **Multi-Model Support** - OpenAI, Anthropic, Google, Groq, and more

## 🛠️ **Quick Setup (5 Minutes)**

### **Step 1: Environment Variables**

Create a `.env.local` file in your project root:

```bash
# OpenAI API Key (GPT-4o mini as default)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic API Key (Claude models)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Google Generative AI API Key
GOOGLE_GENERATIVE_AI_API_KEY=AIza-your-google-key-here

# Groq API Key (Fast inference)
GROQ_API_KEY=gsk_your-groq-key-here

# DeepSeek API Key
DEEPSEEK_API_KEY=sk-your-deepseek-key-here

# Fireworks API Key
FIREWORKS_API_KEY=your-fireworks-key-here

# xAI API Key (Grok models)
XAI_API_KEY=xai-your-xai-key-here

# Base URL for the application
BASE_URL=http://localhost:3000
```

### **Step 2: Get API Keys**

#### **🔑 OpenAI (Recommended - Default)**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create account or sign in
3. Generate new API key
4. Copy to `OPENAI_API_KEY`

#### **🔑 Anthropic (Claude)**
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or sign in
3. Create API key
4. Copy to `ANTHROPIC_API_KEY`

#### **🔑 Google AI**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Create API key
4. Copy to `GOOGLE_GENERATIVE_AI_API_KEY`

#### **🔑 Groq (Fast Inference)**
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or sign in
3. Generate API key
4. Copy to `GROQ_API_KEY`

### **Step 3: Install & Run**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### **Step 4: Access Sybot AI**

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Landing Page**: Professional presentation with "Start Now for Free" button
- **Chat Interface**: Grok-style dark theme with full AI functionality
- **Voice Features**: Click microphone button for speech input
- **File Upload**: Click paperclip or drag & drop files

## 🎯 **Key Features Working**

### ✅ **Chat Interface**
- **Large Central Input** - "What do you want to know?" placeholder
- **Left Controls** - Microphone, Paperclip, Rocket (Auto)
- **Right Control** - Volume button for text-to-speech
- **Dark Theme** - Professional black background

### ✅ **Action Buttons**
- **DeepSearch** - Web search with blue accent
- **Create Images** - AI image generation with green accent
- **Latest News** - Current events with yellow accent
- **Personas** - AI personality modes with purple accent

### ✅ **Voice Assistant**
- **Speech Recognition** - Click mic to speak
- **Text-to-Speech** - Click volume to hear responses
- **Multi-language** - Support for 50+ languages
- **Auto-speak** - Optional automatic response reading

### ✅ **File Upload**
- **Drag & Drop** - Visual feedback during upload
- **Multiple Formats** - PDF, DOC, images, text files
- **Size Validation** - 10MB limit with user feedback
- **Progress Indication** - Upload status and success messages

## 🔧 **Advanced Configuration**

### **Custom Models**

Edit `lib/config/default-models.json` to add/remove models:

```json
{
  "id": "your-model-id",
  "name": "Your Model Name",
  "provider": "Provider Name",
  "providerId": "provider-id",
  "enabled": true,
  "toolCallType": "native"
}
```

### **Voice Settings**

Access voice controls in the chat interface:
- Click microphone for speech input
- Click volume for text-to-speech
- Click settings (gear icon) for voice preferences

### **Theme Customization**

Edit `public/config/sybot-config.json` for UI customization:

```json
{
  "ui": {
    "theme": "dark",
    "primaryColor": "#3B82F6",
    "accentColor": "#8B5CF6"
  }
}
```

## 🚨 **Troubleshooting**

### **API Key Issues**
- Ensure `.env.local` file exists in project root
- Restart development server after adding API keys
- Check browser console for error messages

### **Voice Not Working**
- Ensure microphone permissions are granted
- Check if browser supports Web Speech API
- Try different browsers (Chrome recommended)

### **File Upload Issues**
- Check file size (max 10MB)
- Ensure file format is supported
- Check browser console for errors

## 🌟 **Why Sybot AI?**

### **Professional Design**
- **Grok-style Interface** - Modern, clean, professional
- **Dark Theme** - Easy on eyes, professional appearance
- **Responsive Layout** - Works on all devices

### **Advanced Features**
- **Multi-Model AI** - Choose from top AI providers
- **Voice Integration** - Natural conversation experience
- **File Processing** - Upload and analyze documents
- **Web Search** - Real-time information access

### **Enterprise Ready**
- **Scalable Architecture** - Built with Next.js 15
- **TypeScript** - Type-safe development
- **Modern Stack** - Latest React and AI technologies
- **Production Ready** - Docker support, deployment guides

## 📞 **Support**

For technical support or feature requests:
- **Company**: Sycom Industry
- **Project**: Sybot AI
- **Version**: 1.0.0

---

**🎉 Congratulations!** You now have a fully functional Sybot AI with Grok-style interface and advanced AI capabilities.




