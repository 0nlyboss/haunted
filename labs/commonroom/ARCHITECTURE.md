# CommonRoom architecture

CommonRoom is a small Luau systems study rather than a finished game. The goal is to keep authority over progression and inventory on the server-facing service layer.

## Services

- `ProfileService` owns level and XP state and returns copies for snapshots.
- `InventoryService` owns item quantities and validates mutations.
- `MatchService` owns queue membership and creates match records only after enough players are queued.
- `RateLimiter` provides a lightweight per-user/per-action request budget for server entry points.

## Intended request flow

Client intent -> validated server handler -> rate limit -> service mutation -> snapshot/event back to client.

The client should never submit a final balance, level, inventory quantity, or other authoritative result. It submits intent; server code decides whether the transition is valid.

## Next integration boundary

Persistence is intentionally not faked in this repository. A production Roblox implementation would put a DataStore/ProfileStore adapter behind these services and define RemoteEvent/RemoteFunction contracts around validated handlers.