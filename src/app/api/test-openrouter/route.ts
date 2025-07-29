import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY not found' },
        { status: 500 }
      );
    }

    console.log(
      'Testing OpenRouter API with key:',
      apiKey.substring(0, 10) + '...'
    );

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
          max_tokens: 50,
          messages: [
            {
              role: 'user',
              content:
                'Hello, please respond with just "Test successful" if you can read this.',
            },
          ],
        }),
      }
    );

    console.log('OpenRouter test response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter test error:', errorData);
      return NextResponse.json(
        {
          error: 'OpenRouter API test failed',
          status: response.status,
          details: errorData,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('OpenRouter test success:', data);

    return NextResponse.json({
      success: true,
      response: data.choices[0]?.message?.content,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to test OpenRouter API',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
