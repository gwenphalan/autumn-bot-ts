# Autumn Bot - [Github](https://github.com/GwenBebe/autumn-bot-ts)

Autumn Bot is a multipurpose utility bot written in typescript. While it is very useful by itself, when bundled with the Web Dashboard, it makes an amazing experience. The Web Dashboard (_which has not been finished yet, and will **not** be open source_), is also written in typescript, and uses the Angular 9 web framework. If you need help with Autumn Bot, feel free to visit our [support server](https://discord.gg/DfByvyN). If you would like to invite the **Official** Autumn Bot to your server, you can do so [here](https://discord.com/oauth2/authorize?client_id=672548437346222110&permissions=1576397911&scope=bot).

##### Resources

-   [Discord Server](https://discord.gg/DfByvyN)
-   [Website](https://autumnbot.net)
-   [Autumn Forest Api](https://api.autumn-forest.net/)
-   [Github Issues](https://github.com/GwenBebe/autumn-bot-ts/issues)

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
    -   [Dev](#dev)
    -   [Fun](#fun)
    -   [Moderation](#moderation)
    -   [Profile](#profile)
    -   [Reaction Roles](#reaction-roles)
    -   [Administration](#administration)
    -   [Utility](#utility)
-   [Settings](#settings-1)
    -   [General](#general)
    -   [Moderation](#moderation-1)
    -   [Verification](#verification)
    -   [Welcome](#welcome)

---

# Getting Started

## Requirements

Before you get started with Autumn Bot, there's a few things you'll want to get before the bot can function.

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

-   [Dev](#dev)
    -   [card](#card)
    -   [db](#db)
    -   [error](#error)
    -   [eval](#eval)
    -   [prompt](#reaction-roles)
-   [Fun](#fun)
    -   [cuddle](#cuddle)
    -   [goose](#goose)
    -   [hug](#hug)
    -   [kiss](#kiss)
    -   [norris](#norris)
    -   [pat](#pat)
    -   [poke](#poke)
    -   [slap](#slap)
    -   [tickle](#tickle)
-   [Moderation](#moderation)
    -   [ban](#ban)
    -   [clear](#clear)
    -   [kick](#kick)
    -   [mute](#mute)
    -   [tempban](#tempban)
    -   [tempmute](#tempmute)
    -   [unban](#unban)
    -   [unmute](#unmute)
    -   [warn](#warn)
-   [Profile](#profile)
    -   [profile](#profile-1)
-   [Reaction Roles](#reaction-roles)
    -   [reactionrole](#reactionrole)
    -   [removerole](#removerole)
-   [Administration](#administration)
    -   [prefix](#prefix)
    -   [settings](#settings)
-   [Utility](#utility)
    -   [color](#color)
    -   [embed](#embed)
    -   [help](#help)
    -   [ping](#ping)
    -   [poll](#poll)
    -   [stats](#stats)
    -   [vote](#vote)

---

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

-   [General](#general)
    -   [prefix](#prefix-1)
    -   [deleteCommands](#deletecommands)
    -   [memberRole](#memberrole)
-   [Moderation](#moderation-1)
    -   [enabled](#enabled)
    -   [warnExpire](#warnexpire)
    -   [modLog](#modlog)
-   [Verification](#verification)
    -   [enabled](#enabled-1)
    -   [staffRole](#staffrole)
    -   [nonVerifiedRole](#nonverifiedrole)
    -   [nonVerifiedChannels](#nonverifiedchannels)
    -   [verifyChannel](#verifychannel)
    -   [manualVerify](#manualverify)
    -   [pingStaff](#pingstaff)
    -   [verifyMessage](#verifymessage)
    -   [denyMessage](#denymessage)
    -   [acceptMessage](#acceptMessage)
-   [Welcome](#welcome)
    -   [enabled](#enabled-2)
    -   [welcomeChannel](#welcomechannel)
    -   [backgroundColor](#backgroundcolor)
    -   [textColor](#textcolor)
    -   [profileColor](#profilecolor)
    -   [profileBackground](#profilebackground)

---

## General

Control the general behavior of the bot.

---

### prefix

Prefix indicating a message is a command.

| Type   | Default | Array |
| ------ | ------- | ----- |
| string | -       | false |

---

### deleteCommands

Delete user commands after the command is complete.

| Type    | Default | Array |
| ------- | ------- | ----- |
| boolean | false   | false |

---

### memberRole

Role given to members. If verification is enabled, users won't receive this until verified.

| Type | Default | Array |
| ---- | ------- | ----- |
| role | `n/a`   | false |

---

## Moderation

Moderate your server to improve member experience

---

### enabled

Determines whether or not the moderation plugin is enabled on the server.

| Type    | Default | Array |
| ------- | ------- | ----- |
| boolean | false   | false |

---

### warnExpire

How long until a warning expires.

| Type       | Default | Array |
| ---------- | ------- | ----- |
| timeLength | 30d     | false |

---

### modLog

Channel where moderation events are logged.

| Type        | Default | Array |
| ----------- | ------- | ----- |
| textChannel | `n/a`   | false |

---

## Verification

Verify new users either manually, or automatically, to protect against bots and trolls.

---

### enabled

Determines whether or not the moderation plugin is enabled on this.

| Type    | Default | Array |
| ------- | ------- | ----- |
| boolean | false   | false |

---

### staffRole

Role given to those who manage verification applications.

| Type | Default | Array |
| ---- | ------- | ----- |
| role | `n/a`   | false |

---

### nonVerifiedRole

Role given to non-verified users. Denied access to view all channels. Taken away upon verification.

| Type | Default | Array |
| ---- | ------- | ----- |
| role | `n/a`   | false |

---

### nonVerifiedChannels

Channels that non-verified users have access to view.

| Type         | Default | Array |
| ------------ | ------- | ----- |
| guildChannel | `n/a`   | true  |

---

### verifyChannel

Channel where users go through verification. Whether it be through typing `-verify` or going through Manual Verification.

| Type        | Default | Array |
| ----------- | ------- | ----- |
| textChannel | `n/a`   | true  |

---

### manualVerify

Staff must manually accept or deny user's verification application. Does not require users to type `-verify`

| Type    | Default | Array |
| ------- | ------- | ----- |
| boolean | false   | false |

---

### modVerifyChannel

Channel where moderators accept or deny user verification applications.

| Type        | Default | Array |
| ----------- | ------- | ----- |
| textChannel | `n/a`   | false |

---

### pingStaff

Channel where moderators accept or deny user verification applications.

| Type        | Default | Array |
| ----------- | ------- | ----- |
| textChannel | `n/a`   | false |

---

### verifyMessage

Message explaining how to be verified. Automatically sent in the verification channel.

| Type   | Default                        | Array |
| ------ | ------------------------------ | ----- |
| string | Type `-verify` to be verified. | false |

---

### denyMessage

Ping staff when a user requests verification. (Manual Verification Only).

| Type   | Default | Array |
| ------ | ------- | ----- |
| string | boolean | false |

---

### acceptMessage

Message sent to users denied for verification.

| Type   | Default                                                            | Array |
| ------ | ------------------------------------------------------------------ | ----- |
| string | You've been denied verification.<br>Contact staff to find out why. | false |

---

## Welcome

Welcome new server members with a customized welcome card.

---

### enabled

Whether or not welcome cards are enabled.

| Type    | Default | Array |
| ------- | ------- | ----- |
| boolean | false   | false |

---

### welcomeChannel

Channel where welcome cards are sent.

| Type        | Default | Array |
| ----------- | ------- | ----- |
| textChannel | `n/a`   | false |

---

### backgroundColor

Background color of the welcome card.

| Type  | Default | Array |
| ----- | ------- | ----- |
| color | #2b2929 | false |

---

### textColor

Text color of the welcome card.

| Type  | Default | Array |
| ----- | ------- | ----- |
| color | #FFFFFF | false |

---

### profileColor

Accent color of the profile picture area.

| Type  | Default | Array |
| ----- | ------- | ----- |
| color | #30d4e3 | false |

---

### profileBackground

Background image behind the users profile picture.

| Type  | Default | Array |
| ----- | ------- | ----- |
| image | `n/a`   | false |

---
