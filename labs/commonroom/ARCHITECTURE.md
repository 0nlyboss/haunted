# CommonRoom architecture

CommonRoom is a Luau multiplayer-systems study rather than a finished game. The goal is to keep authority over progression, inventory, economy and interactions on the server-facing service layer.

## Services

- `ProfileService` owns level and XP state and returns copies for snapshots.
- `InventoryService` owns item quantities and validates mutations.
- `EconomyService` owns balances, debits, credits and transfers.
- `MatchService` owns queue membership and creates match records only after enough players are queued.
- `RateLimiter` provides a lightweight per-user/per-action request budget.
- `InteractionService` is a validated entry boundary that accepts client intent and delegates mutations to authoritative services.

## Request flow

Client intent -> request shape validation -> rate limit -> authoritative service mutation -> snapshot/event back to client.

The client never submits a final balance, level, inventory quantity or other authoritative result. For example, a purchase asks to buy an item; server code validates the request, debits currency and updates inventory. Failed inventory mutation rolls the debit back.

## Trust boundary

This LAB intentionally demonstrates structure rather than pretending to solve Roblox security with obscurity. Client-visible names and code are not treated as secrets. Important state and validation live on the server side.

## Persistence boundary

Persistence is intentionally not faked here. A production implementation would place a DataStore/ProfileStore adapter behind the services, use session locking/retry handling, and expose narrow RemoteEvent/RemoteFunction contracts around `InteractionService`.