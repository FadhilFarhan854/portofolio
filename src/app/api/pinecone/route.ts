
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

export async function POST(req: NextRequest) {
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pc.index("biodatatest");

  try {
    const { vector } = await req.json();

    const queryResponse = await index.namespace('ns1').query({
      vector,
      topK: 1,
      includeMetadata: true,
    });

    return NextResponse.json(queryResponse);
  } catch (error: any) {
    console.error('Error querying Pinecone:', error);
    return NextResponse.json(
      { error: 'Error performing search.', detail: error.message },
      { status: 500 }
    );
  }
}
