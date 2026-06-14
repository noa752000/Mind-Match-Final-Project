// Vercel serverless function — shared AI proxy used by the AI Tutor,
// weekly summary and recommendations features.
// GROQ_API_KEY must be set as an environment variable in the Vercel
// project settings (never committed to the repo). Every visitor to the
// deployed site shares this one key — no per-user API key needed.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } });
    return;
  }

  if (!process.env.GROQ_API_KEY) {
    res.status(500).json({ error: { message: 'GROQ_API_KEY is not configured on the server' } });
    return;
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await groqRes.json();
    res.status(groqRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: 'Proxy error: ' + err.message } });
  }
}
