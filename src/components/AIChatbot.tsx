'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, Mail } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  onContactRequest?: (messages: Message[]) => void;
}

const AIChatbot: React.FC<ChatbotProps> = ({ onContactRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('sparta-chatbot-conversation');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(
          parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      } catch (error) {
        console.error('Error loading saved conversation:', error);
      }
    }
  }, []);

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        'sparta-chatbot-conversation',
        JSON.stringify(messages)
      );
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const websiteContent = {
    mortgageCalculator: {
      title: 'Mortgage Calculator',
      description:
        'Interactive calculator to estimate monthly payments, total interest, and see how extra payments can save thousands.',
      features: [
        'Loan amount calculation',
        'Interest rate analysis',
        'Extra payment benefits',
        'Amortization charts',
        'Payment comparison',
      ],
    },
    loanPrograms: {
      title: 'Loan Programs',
      description:
        'Comprehensive mortgage solutions including conventional, FHA, VA, USDA, and jumbo loans.',
      programs: [
        'Conventional Loans (3-20% down)',
        'FHA Loans (3.5% minimum down)',
        'VA Loans (0% down for veterans)',
        'USDA Loans (0% down for rural areas)',
        'Jumbo Loans (high-value properties)',
        'Refinance options',
      ],
    },
    application: {
      title: 'Mortgage Application',
      description:
        'Streamlined application process with access to multiple loan programs and competitive rates.',
      process: [
        'Online application',
        'Document upload',
        'Credit check',
        'Rate lock',
        'Closing coordination',
      ],
    },
    company: {
      name: 'Sparta Mortgage',
      description:
        'Professional mortgage services with competitive rates and personalized solutions.',
      services: [
        'Residential mortgages',
        'Refinancing',
        'First-time homebuyer assistance',
        'Veteran benefits',
        'Rural development loans',
      ],
    },
  };

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Mortgage calculator related questions
    if (
      lowerMessage.includes('calculator') ||
      lowerMessage.includes('calculate') ||
      lowerMessage.includes('payment')
    ) {
      return `Our mortgage calculator is a powerful tool that helps you estimate your monthly payments, total interest costs, and see how extra payments can save you thousands over the life of your loan. You can find it on our Apply page where you can input your home price, down payment, interest rate, and loan term to get detailed calculations and interactive charts.`;
    }

    // Loan programs
    if (
      lowerMessage.includes('loan') ||
      lowerMessage.includes('program') ||
      lowerMessage.includes('fha') ||
      lowerMessage.includes('va') ||
      lowerMessage.includes('conventional')
    ) {
      return `We offer a comprehensive range of loan programs to meet your needs: Conventional loans (3-20% down), FHA loans (3.5% minimum down), VA loans (0% down for veterans), USDA loans (0% down for rural areas), and jumbo loans for high-value properties. Each program has different requirements and benefits. Would you like to learn more about a specific program?`;
    }

    // Application process
    if (
      lowerMessage.includes('apply') ||
      lowerMessage.includes('application') ||
      lowerMessage.includes('process')
    ) {
      return `Our application process is designed to be simple and stress-free. You can start your application online through our secure portal, upload required documents, and we'll guide you through each step including credit checks, rate locks, and closing coordination. We're here to help make your homebuying journey smooth and successful.`;
    }

    // Rates and costs
    if (
      lowerMessage.includes('rate') ||
      lowerMessage.includes('interest') ||
      lowerMessage.includes('cost')
    ) {
      return `Interest rates vary based on your credit score, loan type, down payment, and market conditions. Our rates are competitive and we work with multiple lenders to find the best options for your situation. Use our calculator to see current rate estimates, and we can provide personalized quotes during the application process.`;
    }

    // Company information
    if (
      lowerMessage.includes('company') ||
      lowerMessage.includes('sparta') ||
      lowerMessage.includes('about')
    ) {
      return `Sparta Mortgage is a professional mortgage company dedicated to helping you achieve your homeownership goals. We offer personalized service, competitive rates, and access to a wide range of loan programs. Our experienced team is here to guide you through every step of the mortgage process.`;
    }

    // Contact information
    if (
      lowerMessage.includes('contact') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('email') ||
      lowerMessage.includes('call')
    ) {
      return `You can reach us through our contact page or by calling our office directly. We're here to answer your questions and help you with your mortgage needs. Would you like me to connect you with a real estate agent for more personalized assistance?`;
    }

    // Default response for off-topic questions
    return `I'm here to help with questions about our mortgage services, loan programs, application process, and company information. For other inquiries, please contact our office directly or visit our contact page. I'm specifically designed to assist with mortgage-related questions and our website content.`;
  };

  const callOpenRouter = async (
    userMessage: string,
    conversationHistory: Message[]
  ): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenRouter');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('OpenRouter API error:', error);
      // Fallback to contextual response if OpenRouter fails
      return getContextualResponse(userMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Try OpenRouter first, fallback to contextual response
      const response = await callOpenRouter(userMessage.content, messages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      // Fallback to contextual response
      const fallbackResponse = getContextualResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('sparta-chatbot-conversation');
  };

  const handleContactRequest = () => {
    if (onContactRequest) {
      onContactRequest(messages);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-yellow-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">Sparta Mortgage Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/90 mt-1">
              Ask me about our mortgage services, loan programs, or application
              process
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <Bot className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">
                  Hello! I'm here to help with your mortgage questions.
                </p>
                <p className="text-xs mt-1">
                  Ask about our loan programs, calculator, or application
                  process.
                </p>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our mortgage services..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg hover:from-red-700 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={clearConversation}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Clear chat
              </button>
              <button
                onClick={handleContactRequest}
                className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Contact Agent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
