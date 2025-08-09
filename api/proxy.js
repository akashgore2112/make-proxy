export default async function handler(req, res) {
  const targetUrl = "https://hook.eu2.make.com/ik3wo488gl7eeqh5uzo97fks1myos34m"; // apna Make.com webhook URL daalo

  try {
    const makeResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await makeResponse.json();
    res.status(makeResponse.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
