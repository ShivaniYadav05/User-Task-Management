// uses OpenAI official node client
const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateBio(name, role) {
  if (!process.env.OPENAI_API_KEY) return '';

  const prompt = `Write a short (one-sentence) professional bio for a person named ${name} who works as a ${role}. Keep it concise and professional.`;

  try {
    // Using the Chat Completions API (adjust if the library version differs)
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that writes concise professional bios.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 60,
      temperature: 0.2
    });

    const text = response.choices?.[0]?.message?.content?.trim();
    return text || '';
  } catch (err) {
    console.error('AI generateBio error:', err.message || err);
    return '';
  }
}

module.exports = { generateBio };
