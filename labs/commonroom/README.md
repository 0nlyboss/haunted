# CommonRoom

A compact Luau multiplayer-systems prototype. The goal is to demonstrate server-side game architecture rather than present a fake finished game.

## Current slice
`ProfileService.lua` owns player progression state, inventory quantities and snapshots. `MatchService.lua` owns queue membership and deterministic match formation. Mutations live on the service side so a future Roblox client can request actions without becoming authoritative over state.

## Planned integration boundary
A Roblox server bootstrap can create/remove profiles on player lifecycle events and expose a narrow set of validated RemoteEvents/RemoteFunctions for queueing and profile reads. Persistence can then sit behind `ProfileService` rather than leaking DataStore calls throughout gameplay code.