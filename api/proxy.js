export default async function handler(req, res) {
  // ✅ Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Make.com webhook URL (replace with your actual webhook)
    const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/ik3wo488gl7eeqh5uzo97fks1myos34m";

    // Forward the request body to Make.com webhook
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    // If Make.com returns a non-OK status
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    // Parse the response from Make.com
    const data = await response.json();

    // ✅ Send Make.com response back to GPT
    return res.status(200).json(data);

  } catch (error) {
    console.error("Proxy request failed:", error);
    return res.status(500).json({ error: "Proxy request failed" });
  }
}
