# CatMemer

A small Node.js economy domain core based on an earlier Discord community-bot concept. The core is deliberately independent from Discord so its state rules can be tested without a bot token or external service.

## Implemented
- Lazy user profiles
- Balance and XP rewards
- Per-action cooldowns
- Purchases and inventory
- User-to-user transfers
- Runnable demo

## Run
```bash
npm run demo
```

The next integration layer can map Discord slash/message commands onto this service and replace the in-memory profile store with persistent storage.