# EmergencyTwin AI — Voice Agent Hackathon build

Single static `index.html` (the full digital twin: 3D building, routing,
emergency engine, what-if simulation, occupant guidance, report export)
plus one Vercel serverless function (`api/voice-token.js`) that mints a
short-lived AssemblyAI token so the real API key never reaches the browser.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
3. Vercel auto-detects it as a static site with an `/api` function — no
   build settings needed.
4. In Project Settings → Environment Variables, add:
   `ASSEMBLYAI_API_KEY = <your key from the AssemblyAI dashboard>`
5. Deploy. You'll get a URL like `emergencytwin.vercel.app`.

## Test the voice assistant

The voice feature **only works on the deployed URL** (or `vercel dev`
locally) — it needs a real server to mint the token, and a browser mic.
It will NOT work by opening index.html directly as a file, and it does
NOT work inside a Claude artifact preview (different network/security
sandbox).

1. Open the deployed URL.
2. Click **Voice** in the header, choose **Security** or **Occupant**
   mode.
3. Click **Start voice session**, allow microphone access.
4. Try saying:
   - Security: *"What's happening on floor 2?"* / *"Start a fire on
     floor 2"* / *"Block the west exit"*
   - Occupant: *"I'm near the food court, where should I go?"*

## Local test without deploying

```bash
npm install -g vercel
vercel dev
```

This runs the static file + the `/api/voice-token` function together on
`http://localhost:3000`, using a local `.env` (copy from `.env.example`).

## What's already wired

- `find_route`, `highlight`, `get_building_status`, `create_incident`,
  `block_exit` — all call the real digital twin/route engine, not a
  hallucinated answer.
- Barge-in: speaking while the agent is talking stops its playback.
- Every tool call that changes state also opens the Emergency panel so
  the visual change is obvious on screen (voice → visible 3D update).

## Still to come (see the hackathon brief)

Simulated occupants, corridor congestion, occupant voice reports →
digital twin updates, security dashboard alerts/timeline, what-if voice
simulation ("apply it" flow), full demo rehearsal.
