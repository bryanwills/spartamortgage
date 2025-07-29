'use client';

import React, { createContext, useContext, useState } from 'react';
import AIChatbot from './AIChatbot';
import ContactForm from './ContactForm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotContextType {
  showContactForm: (messages: Message[]) => void;
  hideContactForm: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: React.ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
}) => {
  const [contactFormMessages, setContactFormMessages] = useState<
    Message[] | null
  >(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleContactRequest = (messages: Message[]) => {
    setContactFormMessages(messages);
    setShowContactForm(true);
  };

  const hideContactForm = () => {
    setShowContactForm(false);
    setContactFormMessages(null);
  };

  const contextValue: ChatbotContextType = {
    showContactForm: handleContactRequest,
    hideContactForm,
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
      <AIChatbot onContactRequest={handleContactRequest} />
      {showContactForm && (
        <ContactForm
          chatbotMessages={contactFormMessages || undefined}
          onClose={hideContactForm}
        />
      )}
    </ChatbotContext.Provider>
  );
};
