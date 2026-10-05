# HAUNTED / LAB

Small public-facing engineering experiments used by the HAUNTED portfolio. These are intentionally scoped prototypes, not claims of long-running production products.

## Tracekit
A browser-environment inspector that runs entirely in the page and surfaces user-agent, display, storage, WebGL, canvas and environment information. It is an inspection/education tool, not a detection-bypass utility.

Open `tracekit/index.html` in a browser.

## Relay
A realtime monitoring-interface prototype. The current demo generates telemetry locally so the UI can be explored without a hosted backend. It demonstrates service state, latency changes and session uptime.

Open `relay/index.html` in a browser.

## CatMemer
A framework-agnostic Node.js economy core based on an earlier Discord bot concept. It implements profiles, rewards, cooldowns, purchases and transfers without requiring a Discord token.

Run: `cd labs/catmemer && npm run demo`

## CommonRoom
A Luau multiplayer-systems prototype for Roblox-style architecture. The current slice contains profile/progression and queue-based matchmaking services. It deliberately keeps client trust out of the core state mutations.

These labs will continue to grow as their portfolio case studies are expanded.