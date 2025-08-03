# Voice Features Documentation

## Overview

Sybot now includes comprehensive voice capabilities that allow users to interact with the AI using speech recognition and have responses read back using text-to-speech. The voice features support multiple languages and provide a seamless hands-free experience.

## Features

### 🎤 Speech Recognition
- **Voice Input**: Click the microphone button to start voice recognition
- **Multi-language Support**: Supports 80+ languages for speech recognition
- **Real-time Processing**: Converts speech to text in real-time
- **Auto-submit**: Voice input is automatically submitted after recognition

### 🔊 Text-to-Speech
- **Voice Output**: Click the speaker button to test voice output
- **Multi-language Support**: Supports 80+ languages for text-to-speech
- **Customizable Settings**: Adjust speech rate and pitch
- **Auto-speak Responses**: Option to automatically speak AI responses

### ⚙️ Voice Settings
- **Language Selection**: Choose different languages for input and output
- **Speech Rate Control**: Adjust how fast the AI speaks (0.5x to 2x)
- **Speech Pitch Control**: Adjust the pitch of the AI voice (0.5x to 2x)
- **Auto-speak Toggle**: Enable/disable automatic speaking of responses

## How to Use

### Basic Voice Input
1. Click the microphone button (🎤) in the chat interface
2. Speak your question or message clearly
3. The recognized text will appear in the input field
4. The message will be automatically submitted

### Voice Output Testing
1. Click the speaker button (🔊) to test voice output
2. The AI will speak a test message: "Hello! I'm ready to help you."

### Configuring Voice Settings
1. Click the settings button (⚙️) next to the voice controls
2. Configure the following options:
   - **Speech Recognition Language**: Choose your preferred language for voice input
   - **Text-to-Speech Language**: Choose your preferred language for voice output
   - **Speech Rate**: Adjust how fast the AI speaks
   - **Speech Pitch**: Adjust the pitch of the AI voice
   - **Auto-speak Responses**: Toggle automatic speaking of AI responses

### Auto-speak Responses
When enabled, the AI will automatically speak its responses after they are generated. This feature:
- Cleans up the text (removes markdown formatting)
- Only speaks responses with substantial content (>10 characters)
- Respects the selected language and voice settings

## Supported Languages

The voice features support a comprehensive list of languages including:

### Major Languages
- **English** (US, UK)
- **Spanish** (Spain, Latin America)
- **French** (France, Canada)
- **German** (Germany, Austria, Switzerland)
- **Italian** (Italy)
- **Portuguese** (Brazil, Portugal)
- **Russian** (Russia)
- **Japanese** (Japan)
- **Korean** (South Korea)
- **Chinese** (Simplified, Traditional)

### European Languages
- **Dutch** (Netherlands)
- **Polish** (Poland)
- **Swedish** (Sweden)
- **Danish** (Denmark)
- **Norwegian** (Norway)
- **Finnish** (Finland)
- **Czech** (Czech Republic)
- **Hungarian** (Hungary)
- **Romanian** (Romania)
- **Bulgarian** (Bulgaria)
- **Croatian** (Croatia)
- **Slovak** (Slovakia)
- **Slovenian** (Slovenia)
- **Estonian** (Estonia)
- **Latvian** (Latvia)
- **Lithuanian** (Lithuania)
- **Greek** (Greece)
- **Hebrew** (Israel)

### Asian Languages
- **Arabic** (Saudi Arabia)
- **Hindi** (India)
- **Turkish** (Turkey)
- **Thai** (Thailand)
- **Vietnamese** (Vietnam)
- **Indonesian** (Indonesia)
- **Malay** (Malaysia)
- **Filipino** (Philippines)
- **Korean** (South Korea)
- **Japanese** (Japan)
- **Chinese** (Simplified, Traditional)

### African Languages
- **Swahili** (Kenya)
- **Amharic** (Ethiopia)
- **Hausa** (Nigeria)
- **Yoruba** (Nigeria)
- **Igbo** (Nigeria)
- **Kinyarwanda** (Rwanda)
- **Afrikaans** (South Africa)
- **Zulu** (South Africa)
- **Xhosa** (South Africa)

### Regional Languages
- **Catalan** (Spain)
- **Basque** (Spain)
- **Galician** (Spain)
- **Welsh** (UK)
- **Irish** (Ireland)
- **Maltese** (Malta)
- **Icelandic** (Iceland)
- **Faroese** (Faroe Islands)
- **Albanian** (Albania)
- **Macedonian** (North Macedonia)
- **Serbian** (Serbia)
- **Bosnian** (Bosnia and Herzegovina)
- **Montenegrin** (Montenegro)

## Browser Compatibility

### Supported Browsers
- **Chrome** (Version 25+)
- **Edge** (Version 79+)
- **Safari** (Version 14.1+)
- **Firefox** (Version 44+)

### Requirements
- **HTTPS Connection**: Voice features require a secure connection
- **Microphone Permission**: Browser must have permission to access microphone
- **Modern Browser**: Must support Web Speech API

## Troubleshooting

### Voice Recognition Not Working
1. **Check Browser Support**: Ensure you're using a supported browser
2. **Microphone Permission**: Allow microphone access when prompted
3. **HTTPS Connection**: Ensure you're on a secure connection
4. **Language Settings**: Verify the recognition language is set correctly

### Voice Output Not Working
1. **Browser Support**: Check if your browser supports speech synthesis
2. **Volume Settings**: Ensure your device volume is turned on
3. **Language Settings**: Verify the synthesis language is set correctly
4. **Auto-speak**: Check if auto-speak is enabled in settings

### Poor Recognition Accuracy
1. **Clear Speech**: Speak clearly and at a normal pace
2. **Quiet Environment**: Reduce background noise
3. **Microphone Quality**: Use a good quality microphone
4. **Language Selection**: Ensure the correct language is selected

### Voice Settings Not Saving
1. **Browser Storage**: Check if browser storage is enabled
2. **Private Mode**: Voice settings may not persist in private/incognito mode
3. **Browser Cache**: Clear browser cache if settings aren't updating

## Technical Details

### Web Speech API
The voice features use the Web Speech API, which includes:
- **SpeechRecognition**: For converting speech to text
- **SpeechSynthesis**: For converting text to speech

### Implementation
- **React Context**: Voice state is managed globally using React Context
- **TypeScript**: Full type safety for voice-related functionality
- **Responsive Design**: Voice controls adapt to different screen sizes
- **Accessibility**: Voice features include proper ARIA labels and keyboard navigation

### Performance
- **Efficient Processing**: Voice recognition and synthesis are handled efficiently
- **Memory Management**: Proper cleanup of voice resources
- **Error Handling**: Comprehensive error handling for voice operations

## Future Enhancements

Planned improvements for voice features:
- **Voice Commands**: Support for voice commands to control the interface
- **Voice Profiles**: Save and switch between different voice settings
- **Offline Support**: Basic voice features that work without internet
- **Voice Training**: Improve recognition accuracy through user feedback
- **Multi-language Conversations**: Support for mixed-language conversations 