# Maestro

The Discord bot for the Magical Maestros Discord server. Handles various tournament- and Magic: the Gathering-related functions.

This project uses the [Scryfall API](https://scryfall.com/docs/api) to fetch card details.

This project uses the [Discord API](https://docs.discord.com/developers/intro) to interact with Discord.

This project uses the [Challonge API](https://challonge.apidog.io/) to interact with Challonge.

Moxfield does not have a public API, but this project uses its private API to fetch deck details. This is allowed for personal, non-commercial projects, per Moxfield's [FAQ](https://moxfield.com/help/help-articles/faq#moxfield-api).

Collation details for booster pack simulations come from [The Collation Project](https://www.lethe.xyz/mtg/collation/).

## Environment Variables

| Name                     | Description                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `DISCORD_PUBLIC_KEY`     | The Discord application's public key, taken from the [Discord Developer Portal](https://discord.com/developers/home).     |
| `DISCORD_BOT_TOKEN`      | The Discord application's bot token, taken from the [Discord Developer Portal](https://discord.com/developers/home).      |
| `DISCORD_APPLICATION_ID` | The Discord application's application ID, taken from the [Discord Developer Portal](https://discord.com/developers/home). |
