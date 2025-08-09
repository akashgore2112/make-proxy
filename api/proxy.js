export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Yaha apna Make.com webhook ka exact URL dalna
    const webhookUrl = "https://hook.eu2.make.com/ik3wo488gl7eeqh5uzo97fks1myos34m";

    // Make.com ko request bhejna
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json().catch(() => ({}));

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}
