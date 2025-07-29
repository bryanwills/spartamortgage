# Real Estate Website Enhancement Project Documentation

## Project Overview

This document contains the complete conversation and implementation guide for enhancing a real estate broker's website with modern features including a mortgage calculator, AI chatbot, and property search functionality.

## Original Requirements

The project involves designing a comprehensive real estate website enhancement with the following features:
For options 1 through 4 below, they will all be completely separate websites, based on the completion of #1. I want to give the customer multiple options to choose from in the event he does not want to go with all the options. But for the final option, I do want to show what all the features would look like in a single finished website, to entice him to go with all the options.

1. **Redesigned website** (from separate chat)
2. **Mortgage calculator** with visual graphs and extra payment analysis
3. **AI-powered chatbot** for mortgage-related questions
4. **Property search functionality** (future implementation)
5. **Integrate all requirements into one completed website**

### Technology Stack

- React
- TypeScript
- TailwindCSS/ShadCN UI
- Recharts (for visualization)
- OpenAI API (for chatbot)

### Implementation Stages

1. Stage 1: Base redesign (from separate chat)
2. Stage 2: + Mortgage Calculator with visual graphs
3. Stage 3: + AI Chatbot Integration
4. Stage 4: + Property Search Functionality

## Stage 2: Mortgage Calculator Implementation

### Features Implemented

- **Loan Details Input**: Home price, down payment, interest rate, loan term, credit score
- **Extra Payment Analysis**: Optional extra monthly payment field
- **Interactive Visualization**: Line chart showing loan balance over time
- **Savings Calculation**: Shows interest saved, time reduced, and new loan term
- **Real-time Updates**: Calculations update as user modifies inputs

### Mortgage Calculator Component Code

```jsx
import React, { useState, useEffect } from 'react';
import {
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  PlusCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: 300000,
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30,
    creditScore: 'excellent',
    extraPayment: 0,
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    downPaymentAmount: 0,
    extraPaymentResults: null,
    chartData: [],
  });

  const creditScoreRanges = [
    { value: 'excellent', label: 'Excellent (750+)', rate: 6.0 },
    { value: 'good', label: 'Good (700-749)', rate: 6.5 },
    { value: 'fair', label: 'Fair (650-699)', rate: 7.0 },
    { value: 'poor', label: 'Poor (600-649)', rate: 8.0 },
  ];

  const loanTermOptions = [10, 15, 20, 25, 30];

  const calculateMortgage = () => {
    const principal =
      formData.homePrice - (formData.homePrice * formData.downPayment) / 100;
    const monthlyRate = formData.interestRate / 100 / 12;
    const numberOfPayments = formData.loanTerm * 12;

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - principal;
    const downPaymentAmount = (formData.homePrice * formData.downPayment) / 100;

    // Calculate amortization schedule for chart
    let balance = principal;
    const chartData = [];
    let totalInterestPaid = 0;

    // Standard loan calculations
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;

      if (month % 12 === 0 || month === numberOfPayments) {
        // Show yearly data points
        chartData.push({
          year: Math.ceil(month / 12),
          standardBalance: Math.max(0, balance),
          standardInterest: totalInterestPaid,
        });
      }
    }

    // Extra payment calculations
    let extraPaymentResults = null;
    if (formData.extraPayment > 0) {
      let extraBalance = principal;
      let extraTotalInterest = 0;
      let extraMonthsPaid = 0;
      const extraChartData = [];

      for (let month = 1; month <= numberOfPayments; month++) {
        if (extraBalance <= 0) break;

        const interestPayment = extraBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        const totalPayment = principalPayment + formData.extraPayment;

        extraBalance -= totalPayment;
        extraTotalInterest += interestPayment;
        extraMonthsPaid = month;

        if (month % 12 === 0 || extraBalance <= 0) {
          const yearIndex = chartData.findIndex(
            item => item.year === Math.ceil(month / 12)
          );
          if (yearIndex !== -1) {
            chartData[yearIndex].extraBalance = Math.max(0, extraBalance);
            chartData[yearIndex].extraInterest = extraTotalInterest;
          }
        }

        if (extraBalance <= 0) break;
      }

      const interestSaved = totalInterest - extraTotalInterest;
      const timeSaved = numberOfPayments - extraMonthsPaid;

      extraPaymentResults = {
        monthsPaid: extraMonthsPaid,
        yearsPaid: Math.ceil(extraMonthsPaid / 12),
        totalInterest: extraTotalInterest,
        interestSaved: interestSaved,
        timeSavedMonths: timeSaved,
        timeSavedYears: Math.floor(timeSaved / 12),
        timeSavedRemainingMonths: timeSaved % 12,
      };
    }

    setResults({
      monthlyPayment: monthlyPayment || 0,
      totalInterest: totalInterest || 0,
      totalAmount: totalAmount || 0,
      downPaymentAmount,
      extraPaymentResults,
      chartData,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreditScoreChange = creditScore => {
    const selectedScore = creditScoreRanges.find(
      score => score.value === creditScore
    );
    setFormData(prev => ({
      ...prev,
      creditScore,
      interestRate: selectedScore.rate,
    }));
  };

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">
          Mortgage Calculator
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Loan Details
            </h3>

            {/* Home Price */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <DollarSign className="w-4 h-4" />
                Home Price
              </label>
              <input
                type="number"
                value={formData.homePrice}
                onChange={e =>
                  handleInputChange(
                    'homePrice',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="300,000"
              />
            </div>

            {/* Down Payment */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <Percent className="w-4 h-4" />
                Down Payment (%)
              </label>
              <input
                type="number"
                value={formData.downPayment}
                onChange={e =>
                  handleInputChange(
                    'downPayment',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="20"
                min="0"
                max="100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Amount: {formatCurrency(results.downPaymentAmount)}
              </p>
            </div>

            {/* Interest Rate */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <TrendingUp className="w-4 h-4" />
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.interestRate}
                onChange={e =>
                  handleInputChange(
                    'interestRate',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6.5"
              />
            </div>

            {/* Loan Term */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                Loan Term (Years)
              </label>
              <select
                value={formData.loanTerm}
                onChange={e =>
                  handleInputChange('loanTerm', parseInt(e.target.value))
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {loanTermOptions.map(term => (
                  <option key={term} value={term}>
                    {term} years
                  </option>
                ))}
              </select>
            </div>

            {/* Credit Score */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Credit Score Range
              </label>
              <select
                value={formData.creditScore}
                onChange={e => handleCreditScoreChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {creditScoreRanges.map(score => (
                  <option key={score.value} value={score.value}>
                    {score.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Extra Payment */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <PlusCircle className="w-4 h-4" />
                Extra Monthly Payment (Optional)
              </label>
              <input
                type="number"
                value={formData.extraPayment}
                onChange={e =>
                  handleInputChange(
                    'extraPayment',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Additional amount paid toward principal each month
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Monthly Payment
            </h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatCurrency(results.monthlyPayment)}
            </div>
            <p className="text-gray-600">Principal & Interest</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Loan Amount</h4>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(formData.homePrice - results.downPaymentAmount)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">
                Total Interest
              </h4>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">
                Total Amount Paid
              </h4>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(results.totalAmount)}
              </p>
            </div>

            {results.extraPaymentResults && (
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-3">
                  Extra Payment Benefits
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Interest Saved:</span>
                    <span className="font-bold text-green-800">
                      {formatCurrency(
                        results.extraPaymentResults.interestSaved
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Time Saved:</span>
                    <span className="font-bold text-green-800">
                      {results.extraPaymentResults.timeSavedYears} years,{' '}
                      {results.extraPaymentResults.timeSavedRemainingMonths}{' '}
                      months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">New Loan Term:</span>
                    <span className="font-bold text-green-800">
                      {results.extraPaymentResults.yearsPaid} years
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This calculator provides estimates only.
              Actual payments may vary based on taxes, insurance, and other
              factors.
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {results.chartData.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Loan Balance Over Time
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{
                    value: 'Year',
                    position: 'insideBottom',
                    offset: -5,
                  }}
                />
                <YAxis
                  tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                  label={{
                    value: 'Remaining Balance',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  formatter={(value, name) => [formatCurrency(value), name]}
                  labelFormatter={year => `Year ${year}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="standardBalance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Standard Payment"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                {formData.extraPayment > 0 && (
                  <Line
                    type="monotone"
                    dataKey="extraBalance"
                    stroke="#10b981"
                    strokeWidth={3}
                    name={`With $${formData.extraPayment} Extra`}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {formData.extraPayment > 0 && results.extraPaymentResults && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                Impact of ${formData.extraPayment} Extra Monthly Payment:
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.extraPaymentResults.interestSaved)}
                  </div>
                  <div className="text-green-700">Interest Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {results.extraPaymentResults.timeSavedYears}.
                    {results.extraPaymentResults.timeSavedRemainingMonths}
                  </div>
                  <div className="text-green-700">Years Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {results.extraPaymentResults.yearsPaid}
                  </div>
                  <div className="text-green-700">New Loan Term (Years)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
```

## Stage 3: AI Chatbot Integration

### Features Implemented

- **Floating Chat Interface**: Minimizable chat widget
- **Mortgage-Focused AI**: Responses limited to mortgage and real estate topics
- **Professional UI**: Clean message design with timestamps
- **OpenAI Integration**: GPT-3.5-turbo for cost-effective responses

### AI Chatbot Component Code

```jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
} from 'lucide-react';

const MortgageChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content:
        "Hello! I'm your mortgage assistant. I can help you with questions about mortgages, home loans, interest rates, and the buying process. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // This is where you'll integrate with OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          context: 'mortgage',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);

      // Fallback response for demo purposes
      const fallbackResponses = [
        "I'd be happy to help with your mortgage question. For specific rates and terms, I recommend speaking with one of our loan specialists.",
        "That's a great question about mortgages! Generally, factors like credit score, down payment, and loan term affect your mortgage options.",
        "For the most accurate mortgage information, I'd suggest contacting our office directly. In the meantime, feel free to use our mortgage calculator above.",
        'Mortgage requirements can vary based on many factors. Would you like me to connect you with one of our mortgage specialists?',
      ];

      const randomResponse =
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = timestamp => {
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border z-50 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">Mortgage Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-blue-700 p-1 rounded"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-blue-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.type === 'user' ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs opacity-70 ${
                        message.type === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-gray-400">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border shadow-sm p-3 rounded-lg">
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

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about mortgages, rates, or buying process..."
                className="flex-1 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MortgageChatbot;
```

### Backend API Setup

#### OpenAI Integration (`/pages/api/chat.js` or `/app/api/chat/route.js`)

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful mortgage and real estate assistant. Only answer questions related to mortgages, home loans, real estate buying process, interest rates, down payments, credit scores, and home buying. If asked about unrelated topics, politely redirect the conversation back to mortgage and real estate topics. Keep responses concise and helpful.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    res.status(200).json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({
      response:
        "I'm having trouble connecting right now. Please try again later or contact our office directly.",
    });
  }
}
```

#### Environment Variables (`.env.local`)

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Stage 4: Property Search (Future Implementation)

### Low-Cost Property Search Options

#### Option 1: RentSpree API

- **Cost**: Free tier with limited requests
- **Features**: Basic property listings
- **Implementation**: REST API integration

#### Option 2: RealtyMole API

- **Cost**: $49/month for 1000 requests
- **Features**: Comprehensive property data
- **Implementation**: JSON API responses

#### Option 3: Mock Data for Demo

```javascript
// Mock property data for demonstration
const mockProperties = [
  {
    id: 1,
    address: '123 Oak Street, Winchester, KY',
    price: 285000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    image: '/api/placeholder/300/200',
    listingDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    address: '456 Maple Drive, Lexington, KY',
    price: 340000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    image: '/api/placeholder/300/200',
    listingDate: '2024-01-10',
    status: 'Active',
  },
  {
    id: 3,
    address: '789 Pine Lane, Louisville, KY',
    price: 195000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    image: '/api/placeholder/300/200',
    listingDate: '2024-01-20',
    status: 'Pending',
  },
];

// Property Search Component Example
const PropertySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [bedrooms, setBedrooms] = useState('any');

  const handleSearch = () => {
    let filtered = mockProperties.filter(property => {
      const matchesQuery = property.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        property.price >= priceRange.min && property.price <= priceRange.max;
      const matchesBedrooms =
        bedrooms === 'any' || property.bedrooms >= parseInt(bedrooms);

      return matchesQuery && matchesPrice && matchesBedrooms;
    });

    setFilteredProperties(filtered);
  };

  return (
    <div className="property-search-container">
      {/* Search filters and results would go here */}
    </div>
  );
};
```

## Installation and Setup Instructions

### Required Dependencies

```bash
# Core dependencies
npm install react typescript @types/react @types/node

# UI and Styling
npm install tailwindcss @headlessui/react lucide-react

# Charts and Visualization
npm install recharts

# AI Integration
npm install openai

# Additional utilities
npm install clsx class-variance-authority
```

### Project Structure

```
src/
├── components/
│   ├── MortgageCalculator.tsx
│   ├── MortgageChatbot.tsx
│   └── PropertySearch.tsx (future)
├── pages/
│   └── api/
│       └── chat.js
├── styles/
│   └── globals.css
└── utils/
    └── calculations.ts
```

### Environment Setup

1. **Create OpenAI Account**:
   - Visit https://platform.openai.com
   - Create account and verify email
   - Navigate to API Keys section
   - Generate new API key
   - Add billing information (required for API usage)

2. **Environment Configuration**:

   ```env
   # .env.local
   OPENAI_API_KEY=sk-your-openai-api-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **TailwindCSS Configuration**:
   ```javascript
   // tailwind.config.js
   module.exports = {
     content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

## Cost Analysis

### OpenAI API Costs

- **GPT-3.5-turbo**: $0.0015 per 1K input tokens, $0.002 per 1K output tokens
- **Estimated monthly cost**: $10-30 for moderate usage (100-300 conversations)
- **Cost per conversation**: Approximately $0.05-0.15

### Property API Costs

- **RealtyMole**: $49/month (1000 requests)
- **RentSpree**: Free tier (limited requests)
- **Estimated monthly cost**: $0-49 depending on chosen service

### Total Monthly Operating Costs

- **Minimal setup**: $10-30 (OpenAI + mock property data)
- **Full implementation**: $60-80 (OpenAI + RealtyMole)

## Demo Presentation Strategy

### Four-Stage Demonstration

1. **Stage 1: Base Redesign**
   - Show current website vs. new design
   - Highlight modern styling and improved UX
   - Focus on professional appearance and mobile responsiveness

2. **Stage 2: Mortgage Calculator**
   - Demonstrate real-time calculations
   - Show interactive chart functionality
   - Highlight extra payment analysis features
   - **Key selling points**:
     - Visual impact of extra payments
     - Professional calculator rivals major bank websites
     - Helps customers understand loan options

3. **Stage 3: AI Chatbot Integration**
   - Show natural language mortgage questions
   - Demonstrate mortgage-specific responses
   - Highlight 24/7 availability
   - **Key selling points**:
     - Immediate customer engagement
     - Reduces initial inquiry load
     - Professional AI assistance

4. **Stage 4: Property Search**
   - Show search functionality (mock or real data)
   - Demonstrate filtering capabilities
   - Integration with mortgage calculator
   - **Key selling points**:
     - Complete real estate solution
     - Keeps visitors on site longer
     - Generates more qualified leads

### Presentation Tips

1. **Start with Impact**: Begin each demo by showing the end result
2. **Interactive Demo**: Let the client try features themselves
3. **Real Scenarios**: Use realistic home prices for your local market
4. **Mobile Testing**: Show responsiveness on phone/tablet
5. **Performance**: Emphasize fast loading and smooth interactions

## Technical Implementation Timeline

### Week 1: Foundation

- Set up development environment
- Implement mortgage calculator base functionality
- Create responsive layout

### Week 2: Enhanced Features

- Add chart visualization
- Implement extra payment calculations
- Polish UI/UX

### Week 3: AI Integration

- Set up OpenAI account and API
- Implement chatbot frontend
- Create backend API endpoint
- Test and refine responses

### Week 4: Final Integration

- Combine all components
- Property search mockup/integration
- Testing and optimization
- Demo preparation

## Maintenance and Updates

### Regular Maintenance Tasks

1. **Monthly**:
   - Monitor OpenAI usage and costs
   - Update interest rate defaults based on market conditions
   - Review chatbot conversation logs for improvements

2. **Quarterly**:
   - Update property search API (if using real data)
   - Review and update mortgage calculation formulas
   - Performance optimization

3. **Annually**:
   - Evaluate API provider costs and alternatives
   - Update credit score ranges and default values
   - Technology stack updates

### Monitoring and Analytics

```javascript
// Basic usage tracking
const trackCalculatorUsage = calculationType => {
  // Google Analytics or similar
  gtag('event', 'calculator_used', {
    event_category: 'engagement',
    event_label: calculationType,
  });
};

const trackChatbotUsage = messageCount => {
  gtag('event', 'chatbot_conversation', {
    event_category: 'engagement',
    value: messageCount,
  });
};
```

## Security Considerations

### API Key Protection

- Never expose OpenAI API key in frontend code
- Use environment variables for all sensitive data
- Implement rate limiting on chat API endpoint

### Input Validation

```javascript
// Input sanitization example
const sanitizeInput = input => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim()
    .slice(0, 1000); // Limit input length
};
```

### Error Handling

- Implement graceful fallbacks for API failures
- Log errors for monitoring
- Provide helpful error messages to users

## Performance Optimization

### Code Splitting

```javascript
// Lazy load components
const MortgageCalculator = lazy(
  () => import('./components/MortgageCalculator')
);
const MortgageChatbot = lazy(() => import('./components/MortgageChatbot'));

// Use Suspense for loading states
<Suspense fallback={<div>Loading...</div>}>
  <MortgageCalculator />
</Suspense>;
```

### Chart Optimization

- Use `useMemo` for expensive calculations
- Implement chart data caching
- Optimize re-renders with `useCallback`

```javascript
const chartData = useMemo(() => {
  return calculateAmortizationSchedule(formData);
}, [
  formData.homePrice,
  formData.interestRate,
  formData.loanTerm,
  formData.extraPayment,
]);
```

## Future Enhancements

### Phase 2 Features

1. **Advanced Calculator Features**:
   - PMI calculations
   - Property tax and insurance estimates
   - Refinancing analysis
   - ARM vs Fixed rate comparisons

2. **Enhanced Chatbot**:
   - Integration with calendar for appointment scheduling
   - Lead capture and CRM integration
   - Multi-language support
   - Voice message support

3. **Property Features**:
   - Saved searches and favorites
   - Email alerts for new listings
   - Virtual tour integration
   - Neighborhood data and statistics

### Phase 3 Features

1. **Client Portal**:
   - Document upload and management
   - Loan application progress tracking
   - Communication hub

2. **Advanced Analytics**:
   - Conversion tracking
   - A/B testing framework
   - User behavior analysis

## Troubleshooting Guide

### Common Issues and Solutions

#### OpenAI API Issues

```javascript
// Error handling for API failures
try {
  const response = await openai.chat.completions.create({...});
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    return { response: "I'm experiencing high demand. Please try again in a moment." };
  } else if (error.code === 'insufficient_quota') {
    return { response: "Please contact our office directly for assistance." };
  } else {
    console.error('OpenAI Error:', error);
    return { response: "I'm having technical difficulties. Please try again later." };
  }
}
```

#### Chart Rendering Issues

- Ensure `recharts` is properly installed
- Check for conflicting CSS styles
- Verify data format matches expected structure

#### Mobile Responsiveness

- Test on actual devices, not just browser dev tools
- Use appropriate breakpoints for chart sizing
- Ensure touch interactions work properly

## Conclusion

This comprehensive real estate website enhancement project provides a modern, interactive experience that will significantly differentiate your client's business from competitors. The combination of visual mortgage tools, AI assistance, and professional design creates a complete solution that addresses the primary needs of potential home buyers.

### Key Success Metrics

- **User Engagement**: Time spent on site, pages per session
- **Lead Generation**: Contact form submissions, chatbot conversations
- **Calculator Usage**: Frequency and depth of mortgage calculations
- **Conversion Rate**: Visitors to qualified leads ratio

### Implementation Priority

1. **High Priority**: Mortgage calculator with visualization (immediate value)
2. **Medium Priority**: AI chatbot (engagement and lead capture)
3. **Lower Priority**: Property search (nice-to-have, can use mock data initially)

The staged implementation approach allows for incremental value delivery and budget management while building toward a comprehensive real estate platform that rivals much larger competitors.

## Additional Resources

### Documentation Links

- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [OpenAI API Documentation](https://platform.openai.com/docs)

### Design Inspiration

- Modern real estate websites: Zillow, Redfin, Realtor.com
- Financial calculators: Bankrate, NerdWallet, Mortgage Calculator.net
- AI chat interfaces: Intercom, Drift, ChatGPT interface

### Testing Checklist

- [ ] Mortgage calculator accuracy verification
- [ ] Chart rendering across different screen sizes
- [ ] Chatbot response quality and relevance
- [ ] Mobile device compatibility
- [ ] API error handling
- [ ] Performance under load
- [ ] Cross-browser compatibility
- [ ] Accessibility compliance (WCAG guidelines)

This documentation provides everything needed to successfully implement and maintain the enhanced real estate website, positioning your client as a technology-forward leader in their market.
