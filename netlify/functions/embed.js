import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { input } = JSON.parse(event.body || '{}');
  if (!input) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing input' }) };
  }

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embedding: embeddingResponse.data[0].embedding })
  };
};
