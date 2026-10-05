# CatMemer architecture

CatMemer separates economy rules from Discord transport code. The core can be tested without a token, network connection, or database.

## Layers

`commands.js` translates command intent into calls against `EconomyService`. `catalog.js` owns purchasable item definitions. `economy.js` owns balances, XP/levels, inventories, cooldowns, transfers, spending/earning statistics, and leaderboard ordering.

The service returns snapshots instead of exposing mutable internal state. Randomness and the clock can be injected, making reward and cooldown behavior deterministic in tests.

## Production boundary

The current public LAB uses in-memory storage intentionally. A production Discord implementation would place a repository/database adapter behind the economy service and wrap command handlers with Discord.js interactions. No token or credentials belong in this repository.