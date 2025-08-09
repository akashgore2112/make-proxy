export default async function handler(req, res) {
  try {
    const makeWebhookUrl = "https://hook.eu2.make.com/ik3wo488gl7eeqh5uzo97fks1myos34m"; // Apna Make.com webhook URL

    const makeResponse = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await makeResponse.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
