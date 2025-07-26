import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GROK_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROK_API_KEY not found' },
        { status: 500 }
      );
    }

    console.log('Testing Grok API with key:', apiKey.substring(0, 10) + '...');

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta',
        max_tokens: 50,
        messages: [
          { role: 'user', content: 'Hello, please respond with just "Test successful" if you can read this.' }
        ]
      }),
    });

    console.log('Grok test response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Grok test error:', errorData);
      return NextResponse.json(
        {
          error: 'Grok API test failed',
          status: response.status,
          details: errorData
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Grok test success:', data);

    return NextResponse.json({
      success: true,
      response: data.choices[0]?.message?.content,
      usage: data.usage
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to test Grok API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}