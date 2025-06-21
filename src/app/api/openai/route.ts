/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/openai/route.ts (for Next.js 13+ App Router)
// or pages/api/openai.ts (for Next.js Pages Router)
import axios from 'axios';
import { NextResponse } from 'next/server';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    const { messages, model, endpoint, input } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not set in environment variables." },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Validate input
    if (!model) {
      return NextResponse.json(
        { error: "Model is required" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Default endpoint if not provided
    const apiEndpoint = endpoint || 'https://api.openai.com/v1/chat/completions';

    const payload: Record<string, any> = { model };
    if (messages) payload.messages = messages;
    if (input) payload.input = input;

    const response = await axios.post(apiEndpoint, payload, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error in OpenAI API:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error?.message || 'Error from OpenAI',
          status: error.response?.status,
        },
        {
          status: error.response?.status || 500,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}