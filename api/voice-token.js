// Vercel auto-detects any file under /api as a serverless function —
// no framework needed. This is the ONLY place the real
// ASSEMBLYAI_API_KEY is used; the browser only ever sees the
// short-lived, one-time-use token this returns.

export default async function handler(req, res) {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    res.status(501).json({
      error: "ASSEMBLYAI_API_KEY is not set. Add it in your Vercel project's Environment Variables.",
    });
    return;
  }

  try {
    const url = new URL("https://agents.assemblyai.com/v1/token");
    url.searchParams.set("expires_in_seconds", "300");

    const response = await fetch(url, {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: `AssemblyAI token request failed: ${text}` });
      return;
    }

    const data = await response.json();
    res.status(200).json({ token: data.token });
  } catch (err) {
    res.status(500).json({ error: String(err && err.message ? err.message : err) });
  }
}
