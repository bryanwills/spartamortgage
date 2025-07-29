import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  preferredContact: 'email' | 'phone';
  chatbotContext?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Log the contact form submission (for development)
    console.log('Contact form submission:', {
      visitor: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
      },
      message: body.message,
      preferredContact: body.preferredContact,
      chatbotContext: body.chatbotContext,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with Active Hosted CRM
    // This is where you would make API calls to your CRM system
    // Example integration points:
    // 1. Create lead in CRM
    // 2. Store conversation context
    // 3. Assign to appropriate agent
    // 4. Trigger follow-up sequences

    // Simulate CRM integration delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        leadId: `LEAD_${Date.now()}`, // Mock lead ID
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit contact form',
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
