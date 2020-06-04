# Autumn Bot

Autumn Bot is a multipurpose utility bot written in typescript. While it is very useful by itself, when bundled with the Web Dashboard, it makes an amazing experience. The Web Dashboard (_which has not been finished yet_), is also written in typescript, and uses the Angular 9 web framework. If you need help with Autumn Bot, feel free to visit our [support server.](https://discord.gg/DfByvyN). If you would like to invite the **Official** Autumn Bot to your server, you can do so [here](https://discord.com/oauth2/authorize?client_id=672548437346222110&permissions=1576397911&scope=bot).

---

### Table of Contents

-   [Getting Started](#getting-started)
    -   [Requirements](#requirements)
    -   [Cloning The Repository](#cloning-the-repository)
    -   [Configuring The Bot](#configuring-the-bot)
        -   [Config File](#config-file)
    -   [Finishing Up](#finishing-up)
        -   [Installing Dependencies](#installing-dependencies)
        -   [Running The Bot](#running-the-bot)
-   [Commands](#commands)
-   [Settings](#settings)

---

# Getting Started

## Requirements

Before you get started with Autumn Bot, there's a few things you'll want ot get before the bot can function.

-   [Imgur API Token](https://api.imgur.com/oauth2/addclient)
-   [DBL API Token](https://top.gg/api/docs#mybots) (Only if you decide to list your bot on [Top.GG](https://top.gg/))

## Cloning The Repository

To start using Autumn Bot, clone the repository into your folder of choosing. Create a

```bash
git clone https://github.com/GwenBebe/autumn-bot-ts
```

## Configuring the Bot

You'll then want to copy the contents of `config/config.ts.example` into 2 new files:

-   `config/production.ts`
-   `config/development.ts`

`development.ts` is the configuration used during the development in the bot. `production.ts` is the configuration used for release versions of the bot.

### Config File

| Value           | Type     | Description                                                                             |
| --------------- | -------- | --------------------------------------------------------------------------------------- |
| token           | String   | Your bot token                                                                          |
| mongoString     | String   | Your MongoDB connection string                                                          |
| defaultPrefix   | String   | The default prefix                                                                      |
| developers      | String[] | Discord User IDs of you and fellow developers. These can use commands that are devOnly. |
| infoChannel     | String   | Discord Channel ID where info should be logged to.                                      |
| errorChannel    | String   | Discord Channel ID where errors should be logged to.                                    |
| accentColor     | String   | Basic color of all embeds, as well as the welcome cards.                                |
| backgroundImage | String   | Default background image of the welcome card. Placed in `assets/images`.                |
| imgurID         | String   | This is the Imgur API Token listed in the [requirements](#requirements).                |
| dblToken        | String   | This is the DBL API Token listed in the [requirements](#requirements).                  |

## Finishing Up

### Installing Dependencies

Before you'll be able to run the bot, you first need to open a terminal in the folder where you cloned the repository. Start by installing the required node modules.

#### NPM

```bash
npm install
```

#### Yarn

```bash
yarn
```

### Running The Bot

After that, you're all set. To run the bot, run the `development` or `production` scripts located in `package.json`

#### NPM

```bash
npm run dev
```

```bash
npm run prod
```

#### Yarn

```bash
yarn dev
```

```bash
yarn prod
```

# Commands

## Dev

---

### card

Sends an example welcome card.

#### Usage

```
-card [Member]
```

#### Aliases

-   c

---

### db

This command has no description.

#### Usage

```
-db
```

#### Aliases

This command has no aliases.

---

### error

Intentionally throws an error.

#### Usage

```
-db
```

#### Aliases

This command has no aliases.

---

### eval

Used to run commands from discord.

#### Usage

```
-eval <Code>
```

#### Aliases

-   console
-   debug

---

### prompt

Gives a series of sample prompts

#### Usage

```
-prompt
```

#### Aliases

-   debug

---

## Fun

---

### cuddle

Cuddles the targeted user

#### Usage

```
-cuddle <User>
```

#### Aliases

This command has no aliases.

---

### goose

Goose.

#### Usage

```
-goose
```

#### Aliases

This command has no aliases.

---

### hug

Hugs the targeted user

#### Usage

```
-hug <User>
```

#### Aliases

This command has no aliases.

---

### kek

Kek

#### Usage

```
-kek
```

#### Aliases

This command has no aliases.

---

### kiss

Kisses the targeted user

#### Usage

```
-kiss <User>
```

#### Aliases

This command has no aliases.

---

### norris

Chuck Norris doesn't send bot commands. He is the bot command

#### Usage

```
-norris
```

#### Aliases

-   chuck
-   chuck-norris

---

### pat

Pats the targeted user

#### Usage

```
-pat <User>
```

#### Aliases

This command has no aliases.

---

### poke

Pokes the targeted user

#### Usage

```
-poke <User>
```

#### Aliases

This command has no aliases.

---

### slap

Slaps the targeted user

#### Usage

```
-slap <User>
```

#### Aliases

This command has no aliases.

---

### tickle

Tickles the targeted user

#### Usage

```
-tickle <User>
```

#### Aliases

This command has no aliases.

---

## Moderation

---

### ban

Bans the specified user from the server.

#### Usage

```
-ban <User> [Reason]
```

#### Aliases

This command has no aliases.

---

### clear

Clears up to 100 messages from a channel.

#### Usage

```
-clear <Amount (MAX: 100)> [Reason]
```

#### Aliases

This command has no aliases.

---

### kick

Kicks the specified user from the server.

#### Usage

```
-kick <User> [Reason]
```

#### Aliases

This command has no aliases.

---

### mute

Kicks the specified user from the server.

#### Usage

```
-kick <User> [Reason]
```

#### Aliases

This command has no aliases.

---

### tempban

Bans the targeted user from the server for the specified amount of time.

#### Usage

```
-tempban <User> <Time> [Reason]
```

#### Aliases

This command has no aliases.

---

### tempmute

Mutes the targeted user for the specified amount of time.

#### Usage

```
-mute <User> <Time> [Reason]
```

#### Aliases

This command has no aliases.

---

### unban

Unbans the specified user from the server.

#### Usage

```
-unban <User> [Reason]
```

#### Aliases

This command has no aliases.

---

### unmute

This command has no aliases.

---

### unban

Unbans the specified user from the server.

#### Usage

```
-unban <User> [Reason]
```

#### Aliases

This command has no aliases.

---

### warn

Warns the targeted user.

#### Usage

```
-warn <User> [Reason]
```

#### Aliases

This command has no aliases.

---

## Profile

---

### profile

View someone's profile or edit your own!

#### Usage

```
-profile [View | Edit | Create] [User]
```

#### Aliases

This command has no aliases.

---

## Reaction Roles

---

### reactionrole

Creates a message reaction that gives users the specified role.

#### Usage

```
-reactionrole
```

#### Aliases

-   rr

---

### removerole

Removes a reaction role from a message.

#### Usage

```
-removerole
```

#### Aliases

This command has no aliases.

---

## Administration

---

### prefix

Sets the command prefix for the server.

#### Usage

```
-prefix
```

#### Aliases

This command has no aliases.

---

### settings

View/Edit the settings for your server.

#### Usage

```
-settings [Group] [Setting] [Set | Add | Remove] [Value]
```

#### Aliases

-   setting
-   s

---

## Utility

---

### color

Displays the provided color, or gives a random one.

#### Usage

```
-color <Color>
```

#### Aliases

This command has no aliases.

---

### embed

Create/Edit a Message Embed

#### Usage

```
-embed [Create | Edit | Copy | Paste] [Channel] [MessageID/PasteID]
```

#### Aliases

This command has no aliases.

---

### help

Get a list of all commands or info on a specific command

#### Usage

```
-help [Command Name]
```

#### Aliases

-   h

---

### ping

Checks the ping

#### Usage

```
-ping
```

#### Aliases

This command has no aliases.

---

### poll

Creates a poll and reacts to it with the corresponding emojis.

#### Usage

```
-poll
```

#### Aliases

-   p

---

### stats

Gives you the bot's stats.

#### Usage

```
-stats
```

#### Aliases

This command has no aliases.

---

### vote

Check to see how many times you've voted for the bot, and if you've voted today.

#### Usage

```
-vote
```

#### Aliases

-   v

---

# Settings
