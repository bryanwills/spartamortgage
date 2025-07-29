import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not found in environment variables' },
        { status: 500 }
      );
    }

    const trimmedKey = apiKey.trim();

    return NextResponse.json({
      hasKey: true,
      keyLength: trimmedKey.length,
      keyStartsWith: trimmedKey.substring(0, 10) + '...',
      isValidFormat: trimmedKey.startsWith('sk-ant-'),
      // Don't return the full key for security
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check API key' },
      { status: 500 }
    );
  }
}
