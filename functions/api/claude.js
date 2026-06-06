export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { messages } = body;
    const systemPrompt = `You are the Cool Springs at Charlestown HOA Assistant — helpful and friendly. You help with: HOA rules, CC&Rs, bylaws, assessments (portal: https://tidewater.cincwebaxis.com/account/dashboard), snow removal, parking, architectural requests, board meetings, Maryland HOA law, and Cecil County resources. Managed by Tidewater Property Management. Website: clshoa.org. Be warm, professional, concise. If unsure of specific rules or amounts, say so and direct to the board or portal.`;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 1024, system: systemPrompt, messages })
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
export async function onRequestOptions() {
  return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
