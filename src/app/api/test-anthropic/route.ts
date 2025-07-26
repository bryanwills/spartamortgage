import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not found' },
        { status: 500 }
      );
    }

    console.log('Testing Anthropic API with key:', apiKey.substring(0, 10) + '...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 50,
        messages: [
          { role: 'user', content: 'Hello, please respond with just "Test successful" if you can read this.' }
        ]
      }),
    });

    console.log('Anthropic test response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic test error:', errorData);
      return NextResponse.json(
        {
          error: 'Anthropic API test failed',
          status: response.status,
          details: errorData
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Anthropic test success:', data);

    return NextResponse.json({
      success: true,
      response: data.content[0]?.text,
      usage: data.usage
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to test Anthropic API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}