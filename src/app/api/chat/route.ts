import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory } = body;

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // Debug: Check API key format (only log first few characters for security)
    const apiKey = process.env.OPENROUTER_API_KEY.trim();
    console.log('API Key length:', apiKey.length);
    console.log('API Key starts with:', apiKey.substring(0, 10) + '...');

    // Ensure API key has reasonable length
    if (apiKey.length < 20) {
      console.error('API key seems too short for OpenRouter API');
      return NextResponse.json(
        { error: 'Invalid API key format' },
        { status: 500 }
      );
    }

    // Create system prompt with website context
    const systemPrompt = `You are a helpful AI assistant for Sparta Mortgage, a professional mortgage company. You should:

1. **Focus on mortgage-related topics**: Help with questions about loan programs, mortgage calculators, application processes, rates, and company services.

2. **Provide accurate information**: Base your responses on the website content and general mortgage knowledge.

3. **Be professional and helpful**: Always maintain a professional tone and provide actionable information.

4. **Guide to human contact**: When appropriate, suggest contacting a real estate agent for personalized assistance.

5. **Stay within scope**: For non-mortgage questions, politely redirect to mortgage-related topics or suggest contacting the office directly.

**Website Information:**
- Company: Sparta Mortgage
- Services: Residential mortgages, refinancing, first-time homebuyer assistance, veteran benefits, rural development loans
- Loan Programs: Conventional (3-20% down), FHA (3.5% minimum), VA (0% down for veterans), USDA (0% down for rural areas), Jumbo loans
- Features: Interactive mortgage calculator, online application process, competitive rates
- Contact: Available through contact page or direct office calls

**Important Guidelines:**
- Always be accurate about mortgage information
- Don't make up specific rates or terms
- Encourage users to use the calculator for estimates
- Suggest contacting agents for personalized quotes
- Be helpful but professional
- Redirect off-topic questions appropriately`;

    // Prepare conversation for OpenRouter
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory,
      { role: 'user' as const, content: message },
    ];

    console.log('Making request to OpenRouter API...');

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://spartamortgage.com',
          'X-Title': 'Sparta Mortgage Chatbot',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    console.log('OpenRouter API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenRouter');
    }

    return NextResponse.json({
      response: aiResponse,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to get AI response',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
