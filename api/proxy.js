import fetch from 'node-fetch';

export default async function handler(req, res) {
  console.log('📩 Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body);

  if (req.method !== 'POST') {
    console.log('❌ Invalid method');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const webhookUrl = 'https://hook.eu2.make.com/XXXXXXXXXXXX'; // Apna Make.com webhook URL yaha daalo

    console.log('🔗 Forwarding to Make Webhook:', webhookUrl);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // Body ko stringify karna zaruri hai
    });

    console.log('📤 Webhook Status:', response.status);

    const textData = await response.text(); // Pehle text lo taaki JSON error parse avoid ho
    console.log('📥 Webhook Response:', textData);

    let jsonData;
    try {
      jsonData = JSON.parse(textData);
    } catch (err) {
      jsonData = { raw: textData };
    }

    return res.status(response.status).json(jsonData);

  } catch (error) {
    console.error('🔥 Proxy Error:', error);
    return res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}
