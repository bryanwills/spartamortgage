# AI Chatbot Feature Documentation

## Overview

The AI Chatbot is a comprehensive customer service solution integrated across all pages of the Sparta Mortgage website. It provides intelligent, context-aware responses to visitor inquiries while maintaining conversation persistence and enabling seamless contact with real estate agents.

## Key Features

### 🎯 **Universal Accessibility**
- **Global Integration**: Available on every page of the website
- **Persistent State**: Conversations are saved in localStorage and persist across page navigation
- **Responsive Design**: Optimized for all device sizes and screen orientations

### 💬 **Intelligent Conversation Management**
- **Context-Aware Responses**: Bot understands and responds to website-specific content
- **Conversation Persistence**: Messages are saved locally and persist until cache/cookies are cleared
- **Professional Messaging**: Default responses for off-topic questions guide users appropriately

### 🤖 **Smart Response System**
The chatbot is trained to respond to specific categories of questions:

#### **Mortgage Calculator**
- Questions about payment calculations
- Interest rate analysis
- Extra payment benefits
- Amortization charts

#### **Loan Programs**
- Conventional loans (3-20% down)
- FHA loans (3.5% minimum down)
- VA loans (0% down for veterans)
- USDA loans (0% down for rural areas)
- Jumbo loans for high-value properties
- Refinance options

#### **Application Process**
- Online application procedures
- Document requirements
- Credit check information
- Rate lock details
- Closing coordination

#### **Company Information**
- Sparta Mortgage services
- Professional credentials
- Service areas
- Contact information

#### **Rates and Costs**
- Current rate information
- Cost breakdowns
- Rate comparison tools
- Personalized quotes

### 📞 **Contact Integration**
- **Seamless Handoff**: "Contact Agent" button transfers conversation context
- **Context Preservation**: Full conversation history included in contact form
- **Professional Form**: Comprehensive contact form with conversation summary
- **CRM Ready**: Structured for Active Hosted CRM integration

## Technical Implementation

### Component Architecture

```
src/components/
├── AIChatbot.tsx          # Main chatbot interface with OpenAI integration
├── ContactForm.tsx         # Contact form with context
├── ChatbotProvider.tsx     # Global state management
└── layout.tsx             # Global integration

src/app/api/
├── chat/route.ts          # OpenAI API integration
└── contact/route.ts       # Contact form API
```

### State Management

#### **Local Storage Persistence**
```javascript
// Conversation saved automatically
localStorage.setItem('sparta-chatbot-conversation', JSON.stringify(messages));

// Conversation loaded on page load
const savedMessages = localStorage.getItem('sparta-chatbot-conversation');
```

#### **AI-Powered Response System**
```javascript
// OpenRouter AI Integration with fallback
const callOpenRouter = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      }),
    });

    if (!response.ok) throw new Error('OpenRouter API failed');
    const data = await response.json();
    return data.response;
  } catch (error) {
    // Fallback to rule-based responses
    return getContextualResponse(userMessage);
  }
};
```

### UI/UX Features

#### **Visual Design**
- **Brand Consistency**: Red-to-yellow gradient matching website theme
- **Dark Mode Support**: Full dark/light theme compatibility
- **Smooth Animations**: Hover effects, loading states, transitions
- **Professional Styling**: Modern, clean interface with proper spacing

#### **User Experience**
- **Floating Button**: Fixed position, always accessible
- **Auto-scroll**: Messages automatically scroll to bottom
- **Loading States**: Animated typing indicators
- **Keyboard Support**: Enter key to send messages
- **Focus Management**: Automatic input focus when opened

## OpenRouter AI Integration

### **AI-Powered Responses**
The chatbot now uses OpenRouter's Claude 3.5 Sonnet model to provide intelligent, context-aware responses while maintaining focus on mortgage-related topics.

#### **System Prompt**
The AI is trained with a comprehensive system prompt that includes:
- **Company Information**: Sparta Mortgage services and capabilities
- **Loan Programs**: All available mortgage options and requirements
- **Professional Guidelines**: Tone, accuracy, and scope limitations
- **Fallback Instructions**: How to handle off-topic questions

#### **Key Features**
- **Intelligent Responses**: Natural language understanding and generation
- **Context Awareness**: Maintains conversation history for better responses
- **Professional Tone**: Always maintains appropriate business communication
- **Scope Management**: Redirects off-topic questions appropriately
- **Fallback System**: Rule-based responses when OpenAI is unavailable

#### **API Configuration**
```javascript
// Environment variable required
OPENROUTER_API_KEY=your_openrouter_api_key_here

// API endpoint: /api/chat
// Model: anthropic/claude-3.5-sonnet
// Max tokens: 500
// System prompt: Comprehensive mortgage knowledge and guidelines
```

## Integration with Active Hosted CRM

### **Current Implementation**
The contact form is structured to integrate with Active Hosted CRM:

```javascript
// Form submission includes chatbot context
const formData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  message: formData.message,
  preferredContact: formData.preferredContact,
  chatbotContext: chatbotMessages // Full conversation history
};
```

### **Future CRM Integration Points**

#### **API Endpoints Needed**
```javascript
// Contact form submission
POST /api/contact
{
  "visitor": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "company": "ABC Corp"
  },
  "message": "Additional message from visitor",
  "preferredContact": "email",
  "chatbotContext": [
    {
      "role": "user",
      "content": "What are your current rates?",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Our rates vary based on...",
      "timestamp": "2024-01-15T10:30:05Z"
    }
  ]
}
```

#### **CRM Features to Implement**
1. **Lead Creation**: Automatically create leads from chatbot interactions
2. **Conversation Tracking**: Store full conversation history in CRM
3. **Agent Assignment**: Route leads to appropriate agents based on conversation context
4. **Follow-up Automation**: Trigger follow-up sequences based on visitor interests
5. **Analytics**: Track chatbot effectiveness and conversion rates

## Configuration

### **Environment Variables**
```env
# OpenAI API Key (for future AI integration)
OPENAI_API_KEY=your_openai_api_key_here

# CRM Integration (for Active Hosted CRM)
CRM_API_URL=https://api.activehosted.com
CRM_API_KEY=your_crm_api_key_here
```

### **Customization Options**

#### **Response Categories**
The chatbot can be easily extended with new response categories:

```javascript
// Add new response categories
if (lowerMessage.includes('refinance')) {
  return "Our refinance options include...";
}

if (lowerMessage.includes('first-time')) {
  return "First-time homebuyer programs include...";
}
```

#### **Styling Customization**
```css
/* Customize chatbot appearance */
.chatbot-button {
  background: linear-gradient(to right, #dc2626, #fbbf24);
}

.chatbot-window {
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

## Future Enhancements

### **Phase 1: AI Integration** ✅ **COMPLETED**
- **OpenRouter AI Integration**: ✅ Integrated with Claude 3.5 Sonnet for intelligent responses
- **Context Learning**: ✅ Trained on website content and mortgage knowledge
- **Natural Language Processing**: ✅ Better understanding of user intent
- **Fallback System**: ✅ Rule-based responses when OpenRouter is unavailable

### **Phase 2: Advanced Features**
- **Voice Integration**: Speech-to-text and text-to-speech
- **Multi-language Support**: Spanish and other languages
- **Video Calls**: Direct video chat with agents
- **Document Upload**: Allow file sharing in chat

### **Phase 3: Analytics & Optimization**
- **Conversation Analytics**: Track popular questions and pain points
- **A/B Testing**: Test different response strategies
- **Performance Metrics**: Measure conversion rates and satisfaction
- **Machine Learning**: Continuously improve responses based on data

## Security & Privacy

### **Data Protection**
- **Local Storage**: Conversations stored locally, not on server
- **No PII Collection**: No personal information collected without consent
- **GDPR Compliance**: Easy conversation clearing for privacy
- **Secure Transmission**: All data encrypted in transit

### **Privacy Controls**
- **Clear Chat**: Users can clear conversation history
- **Cookie Management**: Respects user cookie preferences
- **Opt-out Options**: Users can disable chatbot functionality

## Performance Considerations

### **Optimization Features**
- **Lazy Loading**: Chatbot loads only when needed
- **Minimal Bundle Size**: Efficient component structure
- **Caching Strategy**: Optimized localStorage usage
- **Responsive Design**: Fast loading on all devices

### **Monitoring**
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Load times and interaction tracking
- **User Analytics**: Usage patterns and engagement rates

## Testing Strategy

### **Unit Tests**
```javascript
// Test response generation
test('should return calculator response for calculator questions', () => {
  const response = getContextualResponse('How does the calculator work?');
  expect(response).toContain('mortgage calculator');
});

// Test conversation persistence
test('should save messages to localStorage', () => {
  const messages = [{ id: '1', role: 'user', content: 'test' }];
  saveConversation(messages);
  expect(localStorage.getItem('sparta-chatbot-conversation')).toBeTruthy();
});
```

### **Integration Tests**
- **Cross-browser Compatibility**: Chrome, Firefox, Safari, Edge
- **Mobile Responsiveness**: iOS Safari, Android Chrome
- **Accessibility Testing**: Screen readers, keyboard navigation
- **Performance Testing**: Load times, memory usage

## Deployment Checklist

### **Pre-deployment**
- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Error handling implemented
- [ ] Analytics tracking enabled
- [ ] Privacy policy updated

### **Post-deployment**
- [ ] Monitor error rates
- [ ] Track user engagement
- [ ] Gather feedback from agents
- [ ] Optimize response quality
- [ ] Plan CRM integration

## Support & Maintenance

### **Regular Maintenance**
- **Response Updates**: Keep responses current with business changes
- **Performance Monitoring**: Track and optimize loading times
- **Security Updates**: Regular dependency updates
- **User Feedback**: Collect and implement user suggestions

### **Troubleshooting**
- **Common Issues**: Document known problems and solutions
- **Debug Tools**: Console logging for development
- **Fallback Options**: Graceful degradation if chatbot fails
- **Support Documentation**: Agent training materials

---

*This documentation will be updated as the AI chatbot feature evolves and new capabilities are added.*