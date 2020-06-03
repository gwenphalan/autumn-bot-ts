[autumn-bot-ts](README.md) › [Globals](globals.md)

# autumn-bot-ts

## Index

### Modules

* [](modules/autumn_bot_ts.reflection-0.md)
* [commands/Dev]()
* [commands/Fun]()
* [commands/Moderation]()
* [commands/Profile]()
* [commands/ReactionRoles]()
* [commands/Settings]()
* [commands/Settings/settings]()
* [commands/Settings/settings/groups]()
* [commands/Settings/settings/util]()
* [commands/Utility]()
* [constants]()
* [database]()
* [database/schemas]()
* [events]()
* [hook]()
* [interfaces]()
* [interfaces/helpers]()
* [neko]()
* [tasks]()
* [util]()

## Modules

###  commands/Dev

• **commands/Dev**:

*Defined in [src/commands/Dev/card.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/card.ts#L1)*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Dev/card.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/card.ts#L6)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Dev/db.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/db.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`_prompt` | PromptManager |

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`_message`: Message, `args`: object, `_prompt`: PromptManager): *Promise<never>*

*Defined in [src/commands/Dev/error.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/error.ts#L5)*

**Parameters:**

▪ **_message**: *Message*

▪ **args**: *object*

Name | Type |
------ | ------ |
`error?` | undefined &#124; string |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<never>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<Message<>>*

*Defined in [src/commands/Dev/eval.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/eval.ts#L6)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`code` | string |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<Message<>>*

### `Const` callback

▸ **callback**(`_message`: AMessage, `_args`: object, `prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Dev/prompt.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/prompt.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`_message` | AMessage |
`_args` | object |
`prompt` | PromptManager |

**Returns:** *Promise<void>*

### ▪ **command**: *object*

*Defined in [src/commands/Dev/card.ts:17](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/card.ts#L17)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['c']

* **args**: *object[]* = [
        {
            name: 'Member',
            key: 'member',
            description: 'Guild Member displayed on the welcome card.',
            type: 'guildMember',
            optional: true
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "ATTACH_FILES")[]* = ['ATTACH_FILES', 'SEND_MESSAGES']

* **callback**: *callback* = callback

* **category**: *string* = "Dev"

* **description**: *string* = "Sends an example welcome card."

* **devOnly**: *true* = true

* **guildOnly**: *true* = true

* **module**: *string* = "Dev"

* **name**: *string* = "card"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Dev/db.ts:18](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/db.ts#L18)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *never[]* = []

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Dev"

* **description**: *string* = ""

* **devOnly**: *true* = true

* **guildOnly**: *false* = false

* **module**: *string* = "Dev"

* **name**: *string* = "db"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Dev/error.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/error.ts#L9)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'Error',
            key: 'error',
            description: 'Error emitted.',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Dev"

* **description**: *string* = "Intentionally Throws An Error"

* **devOnly**: *true* = true

* **guildOnly**: *false* = false

* **module**: *string* = "Dev"

* **name**: *string* = "error"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Dev/eval.ts:52](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/eval.ts#L52)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['console', 'debug']

* **args**: *object[]* = [
        {
            name: 'Code',
            key: 'code',
            description: 'JavaScript code to run.',
            type: 'string'
        }
    ]

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Dev"

* **description**: *string* = "Used to run commands from discord"

* **devOnly**: *true* = true

* **guildOnly**: *false* = false

* **module**: *string* = "Dev"

* **name**: *string* = "eval"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Dev/prompt.ts:50](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Dev/prompt.ts#L50)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['pr']

* **args**: *never[]* = []

* **botPermissions**: *("ADD_REACTIONS" | "MANAGE_MESSAGES" | "EMBED_LINKS")[]* = ['MANAGE_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Dev"

* **description**: *string* = "Gives a series of sample prompts"

* **devOnly**: *true* = true

* **guildOnly**: *true* = true

* **module**: *string* = "Dev"

* **name**: *string* = "prompt"

* **userPermissions**: *never[]* = []

___

###  commands/Fun

• **commands/Fun**:

*Defined in [src/commands/Fun/cuddle.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/cuddle.ts#L1)*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/cuddle.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/cuddle.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/goose.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/goose.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`_prompt` | PromptManager |

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/hug.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/hug.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/kek.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/kek.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`_prompt` | PromptManager |

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/kiss.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/kiss.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`_message`: AMessage, `_args`: object, `prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/norris.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/norris.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`_message` | AMessage |
`_args` | object |
`prompt` | PromptManager |

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/pat.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/pat.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/poke.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/poke.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/slap.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/slap.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Fun/tickle.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/tickle.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<void>*

### ▪ **command**: *object*

*Defined in [src/commands/Fun/cuddle.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/cuddle.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be cuddled.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Cuddles the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "cuddle"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/goose.ts:18](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/goose.ts#L18)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *never[]* = []

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Goose."

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Fun"

* **name**: *string* = "goose"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/hug.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/hug.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be hugged.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Hugs the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "hug"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/kek.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/kek.ts#L10)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['']

* **args**: *never[]* = []

* **botPermissions**: *"ATTACH_FILES"[]* = ['ATTACH_FILES']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Kek"

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Fun"

* **name**: *string* = "kek"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/kiss.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/kiss.ts#L25)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be kissed.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Kisses the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "kiss"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/norris.ts:11](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/norris.ts#L11)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['chuck', 'chuck-norris']

* **args**: *never[]* = []

* **botPermissions**: *"SEND_MESSAGES"[]* = ['SEND_MESSAGES']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Chuck Norris doesn't send bot commands. He is the bot command"

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Fun"

* **name**: *string* = "norris"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/pat.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/pat.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be patted.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Pats the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "pat"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/poke.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/poke.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be poked.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Pokes the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "poke"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/slap.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/slap.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be slapped.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Slaps the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "slap"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Fun/tickle.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Fun/tickle.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'User',
            description: 'User that will be tickled.',
            key: 'member',
            type: 'guildMember'
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Fun"

* **description**: *string* = "Tickles the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Fun"

* **name**: *string* = "tickle"

* **userPermissions**: *never[]* = []

___

###  commands/Moderation

• **commands/Moderation**:

*Defined in [src/commands/Moderation/ban.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/ban.ts#L1)*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/ban.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/ban.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/clear.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/clear.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`amount` | number |
`reason?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/kick.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/kick.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/mute.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/mute.ts#L8)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/tempban.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/tempban.ts#L8)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |
`time` | number |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/tempmute.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/tempmute.ts#L9)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |
`time` | number |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/unban.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/unban.ts#L7)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`reason?` | undefined &#124; string |
`user` | User |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/unmute.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/unmute.ts#L8)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Moderation/warn.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/warn.ts#L8)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member` | GuildMember |
`reason?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/ban.ts:52](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/ban.ts#L52)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be banned.',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for banning',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *"BAN_MEMBERS"[]* = ['BAN_MEMBERS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Bans the specified user from the server."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "ban"

* **userPermissions**: *"BAN_MEMBERS"[]* = ['BAN_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/clear.ts:57](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/clear.ts#L57)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'Amount (MAX: 100)',
            description: 'Amount of messages to be cleared. Max: 100',
            key: 'amount',
            type: 'number'
        },
        {
            name: 'Reason',
            description: 'Reason for clearing the messages.',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *"MANAGE_MESSAGES"[]* = ['MANAGE_MESSAGES']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Clears up to 100 messages from a channel."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "clear"

* **userPermissions**: *"MANAGE_MESSAGES"[]* = ['MANAGE_MESSAGES']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/kick.ts:62](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/kick.ts#L62)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be kicked',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for kicking',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *"KICK_MEMBERS"[]* = ['KICK_MEMBERS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Kicks the specified user from the server."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "kick"

* **userPermissions**: *"KICK_MEMBERS"[]* = ['KICK_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/mute.ts:71](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/mute.ts#L71)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be muted',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for muting',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *("MANAGE_CHANNELS" | "MANAGE_ROLES")[]* = ['MANAGE_ROLES', 'MANAGE_CHANNELS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Mutes the specified user from the server."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "mute"

* **userPermissions**: *"MUTE_MEMBERS"[]* = ['MUTE_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/tempban.ts:70](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/tempban.ts#L70)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be banned',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Time',
            description: 'Amount of time to ban the user',
            key: 'time',
            type: 'timeLength'
        },
        {
            name: 'Reason',
            description: 'Reason for banning',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *"BAN_MEMBERS"[]* = ['BAN_MEMBERS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Bans the targeted user from the server for the specified amount of time."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "tempban"

* **userPermissions**: *"BAN_MEMBERS"[]* = ['BAN_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/tempmute.ts:81](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/tempmute.ts#L81)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be muted',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Time',
            description: 'Amount of time to mute the user',
            key: 'time',
            type: 'timeLength'
        },
        {
            name: 'Reason',
            description: 'Reason for muting',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *("MANAGE_CHANNELS" | "MANAGE_ROLES")[]* = ['MANAGE_ROLES', 'MANAGE_CHANNELS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Mutes the specified user from the server."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "tempmute"

* **userPermissions**: *"MUTE_MEMBERS"[]* = ['MUTE_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/unban.ts:42](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/unban.ts#L42)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be unbanned',
            key: 'user',
            type: 'bannedUser'
        },
        {
            name: 'Reason',
            description: 'Reason for unbanning',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *"BAN_MEMBERS"[]* = ['BAN_MEMBERS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Unbans the specified user from the server."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "unban"

* **userPermissions**: *"BAN_MEMBERS"[]* = ['BAN_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/unmute.ts:65](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/unmute.ts#L65)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be unmuted',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for unmuting',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *("MANAGE_CHANNELS" | "MANAGE_ROLES")[]* = ['MANAGE_ROLES', 'MANAGE_CHANNELS']

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Mutes the specified user from the server."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "unmute"

* **userPermissions**: *"MUTE_MEMBERS"[]* = ['MUTE_MEMBERS']

### ▪ **command**: *object*

*Defined in [src/commands/Moderation/warn.ts:70](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Moderation/warn.ts#L70)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'User',
            description: 'User that will be warned',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for warning',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Moderation"

* **description**: *string* = "Warns the targeted user."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Moderation"

* **name**: *string* = "warn"

* **userPermissions**: *"MUTE_MEMBERS"[]* = ['MUTE_MEMBERS']

___

###  commands/Profile

• **commands/Profile**:

*Defined in [src/commands/Profile/profile.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Profile/profile.ts#L1)*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Profile/profile.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Profile/profile.ts#L9)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`action?` | "view" &#124; "edit" &#124; "create" |
`member?` | GuildMember |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void>*

### ▪ **command**: *object*

*Defined in [src/commands/Profile/profile.ts:115](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Profile/profile.ts#L115)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object)[]* = [
        {
            name: 'Action',
            description: 'What you would like to do',
            key: 'action',
            type: 'string',
            acceptedValues: ['View', 'Edit', 'Create'],
            optional: true
        },
        {
            name: 'User',
            description: 'What you would like to do',
            key: 'member',
            type: 'guildMember',
            optional: true,
            cases: { action: 'view' }
        }
    ]

* **botPermissions**: *("ADD_REACTIONS" | "SEND_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "USE_EXTERNAL_EMOJIS")[]* = ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Profile"

* **description**: *string* = `View someone's profile or edit your own!`

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Profiles"

* **name**: *string* = "profile"

* **userPermissions**: *never[]* = []

___

###  commands/ReactionRoles

• **commands/ReactionRoles**:

*Defined in [src/commands/ReactionRoles/reactionrole.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/ReactionRoles/reactionrole.ts#L1)*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `prompt`: PromptManager): *Promise<undefined | Message<>>*

*Defined in [src/commands/ReactionRoles/reactionrole.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/ReactionRoles/reactionrole.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`prompt` | PromptManager |

**Returns:** *Promise<undefined | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/ReactionRoles/removerole.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/ReactionRoles/removerole.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`prompt` | PromptManager |

**Returns:** *Promise<void | Message<>>*

### ▪ **command**: *object*

*Defined in [src/commands/ReactionRoles/reactionrole.ts:28](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/ReactionRoles/reactionrole.ts#L28)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['rr']

* **args**: *never[]* = []

* **botPermissions**: *("ADD_REACTIONS" | "EMBED_LINKS" | "MANAGE_ROLES")[]* = ['MANAGE_ROLES', 'ADD_REACTIONS', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Reaction Roles"

* **description**: *string* = "Creates a message reaction that gives users the specified role."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Reaction Roles"

* **name**: *string* = "reactionrole"

* **userPermissions**: *"MANAGE_ROLES"[]* = ['MANAGE_ROLES']

### ▪ **command**: *object*

*Defined in [src/commands/ReactionRoles/removerole.ts:62](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/ReactionRoles/removerole.ts#L62)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *never[]* = []

* **botPermissions**: *"MANAGE_MESSAGES"[]* = ['MANAGE_MESSAGES']

* **callback**: *callback* = callback

* **category**: *string* = "Reaction Roles"

* **description**: *string* = "Removes a reaction role from a message."

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Reaction Roles"

* **name**: *string* = "removerole"

* **userPermissions**: *"MANAGE_ROLES"[]* = ['MANAGE_ROLES']

___

###  commands/Settings

• **commands/Settings**:

*Defined in [src/commands/Settings/prefix.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/prefix.ts#L1)*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<undefined | Message<>>*

*Defined in [src/commands/Settings/prefix.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/prefix.ts#L5)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`prefix?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<undefined | Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void | Message<>>*

*Defined in [src/commands/Settings/settings.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings.ts#L10)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`action?` | "set" &#124; "add" &#124; "remove" |
`groupName?` | undefined &#124; string |
`settingName?` | undefined &#124; string |
`value?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void | Message<>>*

### ▪ **command**: *object*

*Defined in [src/commands/Settings/prefix.ts:18](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/prefix.ts#L18)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'Prefix',
            key: 'prefix',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Administration"

* **description**: *string* = "Sets the prefix on this guild"

* **devOnly**: *true* = true

* **guildOnly**: *true* = true

* **module**: *string* = "Settings"

* **name**: *string* = "prefix"

* **userPermissions**: *"MANAGE_GUILD"[]* = ['MANAGE_GUILD']

### ▪ **command**: *object*

*Defined in [src/commands/Settings/settings.ts:423](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings.ts#L423)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['setting', 's']

* **args**: *(object | object)[]* = [
        {
            name: 'Group',
            key: 'groupName',
            type: 'string',
            optional: true
        },
        {
            name: 'Setting',
            key: 'settingName',
            type: 'string',
            optional: true
        },
        {
            name: 'Action',
            key: 'action',
            type: 'string',
            optional: true,
            acceptedValues: ['Set', 'Add', 'Remove']
        },
        {
            name: 'Value',
            key: 'value',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *("MANAGE_CHANNELS" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "MANAGE_MESSAGES" | "MANAGE_ROLES")[]* = ['MANAGE_MESSAGES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL']

* **callback**: *callback* = callback

* **category**: *string* = "Administration"

* **description**: *string* = "Change the settings for your server"

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Settings"

* **name**: *string* = "settings"

* **userPermissions**: *"MANAGE_GUILD"[]* = ['MANAGE_GUILD']

___

###  commands/Settings/settings

• **commands/Settings/settings**:

*Defined in [src/commands/Settings/settings/index.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/index.ts#L1)*

### `Const` groupPath

• **groupPath**: *string* = join(__dirname, './groups')

*Defined in [src/commands/Settings/settings/index.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/index.ts#L9)*

### `Const` groups

• **groups**: *Collection<string, SettingsGroup>* = new Collection()

*Defined in [src/commands/Settings/settings/index.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/index.ts#L7)*

### `Const` updateGuild

▸ **updateGuild**(`d`: Buffer): *Promise<object>*

*Defined in [src/commands/Settings/settings/index.ts:19](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/index.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Buffer |

**Returns:** *Promise<object>*

___

###  commands/Settings/settings/groups

• **commands/Settings/settings/groups**:

*Defined in [src/commands/Settings/settings/groups/general.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/general.ts#L1)*

### `Const` update

▸ **update**(`_guild`: Guild): *Promise<void>*

*Defined in [src/commands/Settings/settings/groups/general.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/general.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`_guild` | Guild |

**Returns:** *Promise<void>*

### `Const` update

▸ **update**(`guild`: Guild): *Promise<void>*

*Defined in [src/commands/Settings/settings/groups/moderation.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/moderation.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |

**Returns:** *Promise<void>*

### `Const` update

▸ **update**(`guild`: Guild): *Promise<void>*

*Defined in [src/commands/Settings/settings/groups/verification.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/verification.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |

**Returns:** *Promise<void>*

### `Const` update

▸ **update**(`_guild`: Guild): *Promise<void>*

*Defined in [src/commands/Settings/settings/groups/welcome.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/welcome.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`_guild` | Guild |

**Returns:** *Promise<void>*

### ▪ **group**: *object*

*Defined in [src/commands/Settings/settings/groups/general.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/general.ts#L8)*

* **description**: *string* = "Control the general behavior of the bot."

* **identifier**: *string* = "general"

* **name**: *string* = "General"

* **settings**: *(object | object | object)[]* = [
        {
            name: 'Prefix',
            identifier: 'prefix',
            description: 'Prefix indicating a message is a command.',
            valueType: 'string',
            default: '{defaultPrefix}',
            array: false
        },
        {
            name: 'Delete Commands',
            identifier: 'deleteCommands',
            description: 'Delete user commands after the command is complete.',
            valueType: 'boolean',
            default: false,
            array: false
        },
        {
            name: 'Member Role',
            identifier: 'memberRole',
            description: "Role given to members. If verification is enabled, users won't receive this until verified.",
            valueType: 'role'
        }
    ]

* **update**: *update* = update

### ▪ **group**: *object*

*Defined in [src/commands/Settings/settings/groups/moderation.ts:44](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/moderation.ts#L44)*

* **description**: *string* = "Moderate your server to improve member experience"

* **identifier**: *string* = "moderation"

* **name**: *string* = "Moderation"

* **settings**: *(object | object | object)[]* = [
        {
            name: 'Enabled',
            identifier: 'enabled',
            description: 'Determines whether or not the moderation plugin is enabled on this.',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Warning Expiration',
            identifier: 'warnExpire',
            description: 'How long until a warning expires.',
            valueType: 'timeLength',
            default: '30d'
        },
        {
            name: 'Mod Log',
            identifier: 'modLog',
            description: 'Channel where moderation events are logged.',
            valueType: 'textChannel'
        }
    ]

* **update**: *update* = update

### ▪ **group**: *object*

*Defined in [src/commands/Settings/settings/groups/verification.ts:110](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/verification.ts#L110)*

* **description**: *string* = "Verify new users either manually, or automatically, to protect against bots and trolls."

* **identifier**: *string* = "verification"

* **name**: *string* = "Verification"

* **settings**: *(object | object | object | object | object | object | object | object)[]* = [
        {
            name: 'Enabled',
            identifier: 'enabled',
            description: 'Determines whether or not the moderation plugin is enabled on this.',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Staff Role',
            identifier: 'staffRole',
            description: 'Role given to those who manage verification applications.',
            valueType: 'role'
        },
        {
            name: 'Non Verified Role',
            identifier: 'nonVerifiedRole',
            description: 'Role given to non-verified users. Denied access to view all channels. Taken away upon verification.',
            valueType: 'role',
            required: true
        },
        {
            name: 'Non Verified Channels',
            identifier: 'nonVerifiedChannels',
            description: 'Channels that non-verified have access to view.',
            valueType: 'guildChannel',
            array: true
        },
        {
            name: 'Verification Channel',
            identifier: 'verifyChannel',
            description: 'Channel where users go through verification. Whether it be through typing `{prefix}verify` or going through Manual Verification.',
            valueType: 'textChannel',
            required: true
        },
        {
            name: 'Manual Verification',
            identifier: 'manualVerify',
            description: "Staff must manually accept or deny user's verification application. Does not require users to type `-verify`",
            valueType: 'boolean',
            default: false,
            dependencies: ['modVerifyChannel', 'staffRole']
        },
        {
            name: 'Moderator Verification Channel',
            identifier: 'modVerifyChannel',
            description: 'Channel where moderators accept or deny user verification applications.',
            valueType: 'textChannel'
        },
        {
            name: 'Ping Staff',
            identifier: 'pingStaff',
            description: 'Ping staff when a user requests verification. (Manual Verification Only).',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Verification Message',
            identifier: 'verifyMessage',
            description: 'Message explaining how to be verified. Automatically sent in the verification channel.',
            valueType: 'string',
            default: 'Type `{prefix}verify` to be verified.'
        },
        {
            name: 'Denied Message',
            identifier: 'denyMessage',
            description: 'Message sent to users denied for verification.',
            valueType: 'string',
            default: "You've been denied verification.\n\nContact staff to find out why."
        },
        {
            name: 'Accepted Message',
            identifier: 'acceptMessage',
            description: 'Message sent to users accepted for verification.',
            valueType: 'string',
            default: "You've been verified!"
        }
    ]

* **update**: *update* = update

### ▪ **group**: *object*

*Defined in [src/commands/Settings/settings/groups/welcome.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/groups/welcome.ts#L8)*

* **description**: *string* = "Welcome new server members with a customized welcome card."

* **identifier**: *string* = "welcome"

* **name**: *string* = "Welcome"

* **settings**: *(object | object | object | object)[]* = [
        {
            name: 'Enabled',
            identifier: 'enabled',
            description: 'Whether or not welcome cards are enabled',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Welcome Channel',
            identifier: 'welcomeChannel',
            description: 'Channel where welcome cards are sent.',
            valueType: 'textChannel',
            required: true
        },
        {
            name: 'Background Color',
            identifier: 'backgroundColor',
            description: 'Background color of the welcome card.',
            valueType: 'color',
            default: '#2b2929'
        },
        {
            name: 'Text Color',
            identifier: 'textColor',
            description: 'Text color of the welcome card.',
            valueType: 'color',
            default: '#2b2929'
        },
        {
            name: 'Profile Color',
            identifier: 'profileColor',
            description: 'Accent color of the profile picture area.',
            valueType: 'color',
            default: '{accentColor}'
        },
        {
            name: 'Profile Background',
            identifier: 'profileBackground',
            description: 'Background image behind the users profile picture.',
            valueType: 'image'
        }
    ]

* **update**: *update* = update

___

###  commands/Settings/settings/util

• **commands/Settings/settings/util**:

*Defined in [src/commands/Settings/settings/util/index.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L1)*

###  parseType

▸ **parseType**(`message`: Message | AMessage, `type`: "number", `str`: string, `prompt`: PromptManager): *Promise<number | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:30](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "number" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<number | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "color", `str`: string, `prompt`: PromptManager): *Promise<string | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:32](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "color" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<string | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "image", `str`: string, `prompt`: PromptManager): *Promise<string | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:34](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "image" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<string | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "string", `str`: string, `prompt`: PromptManager): *Promise<string | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:36](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "string" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<string | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "url", `str`: string, `prompt`: PromptManager): *Promise<string | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:38](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "url" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<string | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "guildMember", `str`: string, `prompt`: PromptManager): *Promise<GuildMember | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:40](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "guildMember" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<GuildMember | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "bannedUser", `str`: string, `prompt`: PromptManager): *Promise<User | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:42](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "bannedUser" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<User | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "role", `str`: string, `prompt`: PromptManager): *Promise<Role | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:44](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "role" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<Role | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "textChannel", `str`: string, `prompt`: PromptManager): *Promise<TextChannel | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:46](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "textChannel" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<TextChannel | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "voiceChannel", `str`: string, `prompt`: PromptManager): *Promise<VoiceChannel | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:48](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "voiceChannel" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<VoiceChannel | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "guildChannel", `str`: string, `prompt`: PromptManager): *Promise<GuildChannel | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:50](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "guildChannel" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<GuildChannel | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "boolean", `str`: string, `prompt`: PromptManager): *Promise<boolean | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:52](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "boolean" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<boolean | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "snowflake", `str`: string, `prompt`: PromptManager): *Promise<string | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:54](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "snowflake" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<string | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: "timeLength", `str`: string, `prompt`: PromptManager): *Promise<number | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:56](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | "timeLength" |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<number | void>*

▸ **parseType**(`message`: Message | AMessage, `type`: valueType, `str`: string, `prompt`: PromptManager): *Promise<number | string | GuildMember | Role | VoiceChannel | GuildChannel | boolean | User | void>*

*Defined in [src/commands/Settings/settings/util/index.ts:58](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`type` | valueType |
`str` | string |
`prompt` | PromptManager |

**Returns:** *Promise<number | string | GuildMember | Role | VoiceChannel | GuildChannel | boolean | User | void>*

### `Const` sendSetting

▸ **sendSetting**(`message`: AMessage, `setting`: string, `valueType`: valueType, `prompt`: PromptManager, `array?`: undefined | false | true): *Promise<string | number | false | true | void | User<> | GuildMember<> | GuildChannel<> | Role<>>*

*Defined in [src/commands/Settings/settings/util/index.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Settings/settings/util/index.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`setting` | string |
`valueType` | valueType |
`prompt` | PromptManager |
`array?` | undefined &#124; false &#124; true |

**Returns:** *Promise<string | number | false | true | void | User<> | GuildMember<> | GuildChannel<> | Role<>>*

___

###  commands/Utility

• **commands/Utility**:

*Defined in [src/commands/Utility/color.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/color.ts#L1)*

### `Const` bot

• **bot**: *Client<>* = client

*Defined in [src/commands/Utility/help.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/help.ts#L8)*

### `Const` callback

▸ **callback**(`_message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<Message<>>*

*Defined in [src/commands/Utility/color.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/color.ts#L6)*

**Parameters:**

▪ **_message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`color?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Utility/embed.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/embed.ts#L8)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`action?` | "edit" &#124; "copy" &#124; "create" &#124; "paste" |
`channel?` | TextChannel &#124; NewsChannel &#124; DMChannel |
`id?` | undefined &#124; string |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `_prompt`: PromptManager): *Promise<Message<>>*

*Defined in [src/commands/Utility/help.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/help.ts#L10)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`command?` | undefined &#124; string |

▪ **_prompt**: *PromptManager*

**Returns:** *Promise<Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `_prompt`: PromptManager): *Promise<Message<>>*

*Defined in [src/commands/Utility/ping.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/ping.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`_prompt` | PromptManager |

**Returns:** *Promise<Message<>>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `prompt`: PromptManager): *Promise<void | Message>*

*Defined in [src/commands/Utility/poll.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/poll.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`prompt` | PromptManager |

**Returns:** *Promise<void | Message>*

### `Const` callback

▸ **callback**(`message`: AMessage, `_args`: object, `_prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Utility/stats.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/stats.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage |
`_args` | object |
`_prompt` | PromptManager |

**Returns:** *Promise<void>*

### `Const` callback

▸ **callback**(`message`: AMessage, `args`: object, `prompt`: PromptManager): *Promise<void>*

*Defined in [src/commands/Utility/vote.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/vote.ts#L6)*

**Parameters:**

▪ **message**: *AMessage*

▪ **args**: *object*

Name | Type |
------ | ------ |
`member?` | GuildMember |

▪ **prompt**: *PromptManager*

**Returns:** *Promise<void>*

### ▪ **command**: *object*

*Defined in [src/commands/Utility/color.ts:30](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/color.ts#L30)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *object[]* = [
        {
            name: 'Color',
            key: 'color',
            type: 'color'
        }
    ]

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Displays the provided color, or gives a random one."

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Utility"

* **name**: *string* = "color"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Utility/embed.ts:241](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/embed.ts#L241)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *(object | object | object)[]* = [
        {
            name: 'Action',
            key: 'action',
            type: 'string',
            acceptedValues: ['Create', 'Edit', 'Copy', 'Paste'],
            optional: true
        },
        {
            name: 'Channel',
            key: 'channel',
            type: 'textChannel',
            optional: true
        },
        {
            name: 'MessageID/PasteID',
            key: 'id',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *("ADD_REACTIONS" | "MANAGE_MESSAGES" | "EMBED_LINKS")[]* = ['EMBED_LINKS', 'MANAGE_MESSAGES', 'ADD_REACTIONS']

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Create/Edit a Message Embed"

* **devOnly**: *false* = false

* **guildOnly**: *true* = true

* **module**: *string* = "Custom Embeds"

* **name**: *string* = "embed"

* **userPermissions**: *"MANAGE_MESSAGES"[]* = ['MANAGE_MESSAGES']

### ▪ **command**: *object*

*Defined in [src/commands/Utility/help.ts:70](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/help.ts#L70)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['h']

* **args**: *object[]* = [
        {
            name: 'Command Name',
            key: 'command',
            type: 'string',
            optional: true
        }
    ]

* **botPermissions**: *"EMBED_LINKS"[]* = ['EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Get a list of all commands or info on a specific command"

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Help"

* **name**: *string* = "help"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Utility/ping.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/ping.ts#L9)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *never[]* = []

* **botPermissions**: *never[]* = []

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Checks the ping"

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Stats"

* **name**: *string* = "ping"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Utility/poll.ts:113](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/poll.ts#L113)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['p']

* **args**: *never[]* = []

* **botPermissions**: *("ADD_REACTIONS" | "SEND_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS")[]* = ['ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'ADD_REACTIONS']

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Creates a poll and reacts to it with the corresponding emojis."

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Polls"

* **name**: *string* = "poll"

* **userPermissions**: *("ADD_REACTIONS" | "MANAGE_MESSAGES")[]* = ['MANAGE_MESSAGES', 'ADD_REACTIONS']

### ▪ **command**: *object*

*Defined in [src/commands/Utility/stats.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/stats.ts#L24)*

* **NSFW**: *false* = false

* **aliases**: *never[]* = []

* **args**: *never[]* = []

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['EMBED_LINKS', 'SEND_MESSAGES']

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Gives you the bots stats."

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Stats"

* **name**: *string* = "stats"

* **userPermissions**: *never[]* = []

### ▪ **command**: *object*

*Defined in [src/commands/Utility/vote.ts:21](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/commands/Utility/vote.ts#L21)*

* **NSFW**: *false* = false

* **aliases**: *string[]* = ['v']

* **args**: *object[]* = [
        {
            name: 'User',
            key: 'member',
            type: 'guildMember',
            optional: true
        }
    ]

* **botPermissions**: *("SEND_MESSAGES" | "EMBED_LINKS")[]* = ['SEND_MESSAGES', 'EMBED_LINKS']

* **callback**: *callback* = callback

* **category**: *string* = "Utility"

* **description**: *string* = "Check to see how many times you've voted for the bot, and if you've voted today.."

* **devOnly**: *false* = false

* **guildOnly**: *false* = false

* **module**: *string* = "Vote"

* **name**: *string* = "vote"

* **userPermissions**: *never[]* = []

___

###  constants

• **constants**:

*Defined in [src/constants/words.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/constants/words.ts#L1)*

### ▪ **words**: *object*

*Defined in [src/constants/words.ts:2](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/constants/words.ts#L2)*

* **adjectives**: *string[]* = ["aback","abaft","abandoned","abashed","aberrant","abhorrent","abiding","abject","ablaze","able","abnormal","aboard","aboriginal","abortive","abounding","abrasive","abrupt","absent","absorbed","absorbing","abstracted","absurd","abundant","abusive","acceptable","accessible","accidental","accurate","acid","acidic","acoustic","acrid","actually","ad","hoc","adamant","adaptable","addicted","adhesive","adjoining","adorable","adventurous","afraid","aggressive","agonizing","agreeable","ahead","ajar","alcoholic","alert","alike","alive","alleged","alluring","aloof","amazing","ambiguous","ambitious","amuck","amused","amusing","ancient","angry","animated","annoyed","annoying","anxious","apathetic","aquatic","aromatic","arrogant","ashamed","aspiring","assorted","astonishing","attractive","auspicious","automatic","available","average","awake","aware","awesome","awful","axiomatic","bad","barbarous","bashful","bawdy","beautiful","befitting","belligerent","beneficial","bent","berserk","best","better","bewildered","big","billowy","bite-sized","bitter","bizarre","black","black-and-white","bloody","blue","blue-eyed","blushing","boiling","boorish","bored","boring","bouncy","boundless","brainy","brash","brave","brawny","breakable","breezy","brief","bright","bright","broad","broken","brown","bumpy","burly","bustling","busy","cagey","calculating","callous","calm","capable","capricious","careful","careless","caring","cautious","ceaseless","certain","changeable","charming","cheap","cheerful","chemical","chief","childlike","chilly","chivalrous","chubby","chunky","clammy","classy","clean","clear","clever","cloistered","cloudy","closed","clumsy","cluttered","coherent","cold","colorful","colossal","combative","comfortable","common","complete","complex","concerned","condemned","confused","conscious","cooing","cool","cooperative","coordinated","courageous","cowardly","crabby","craven","crazy","creepy","crooked","crowded","cruel","cuddly","cultured","cumbersome","curious","curly","curved","curvy","cut","cute","cute","cynical","daffy","daily","damaged","damaging","damp","dangerous","dapper","dark","dashing","dazzling","dead","deadpan","deafening","dear","debonair","decisive","decorous","deep","deeply","defeated","defective","defiant","delicate","delicious","delightful","demonic","delirious","dependent","depressed","deranged","descriptive","deserted","detailed","determined","devilish","didactic","different","difficult","diligent","direful","dirty","disagreeable","disastrous","discreet","disgusted","disgusting","disillusioned","dispensable","distinct","disturbed","divergent","dizzy","domineering","doubtful","drab","draconian","dramatic","dreary","drunk","dry","dull","dusty","dynamic","dysfunctional","eager","early","earsplitting","earthy","easy","eatable","economic","educated","efficacious","efficient","eight","elastic","elated","elderly","electric","elegant","elfin","elite","embarrassed","eminent","empty","enchanted","enchanting","encouraging","endurable","energetic","enormous","entertaining","enthusiastic","envious","equable","equal","erect","erratic","ethereal","evanescent","evasive","even excellent excited","exciting exclusive","exotic","expensive","extra-large extra-small exuberant","exultant","fabulous","faded","faint fair","faithful","fallacious","false", "familiar", "famous","fanatical","fancy","fantastic","far"," far-flung"," fascinated","fast","fat faulty","fearful fearless","feeble feigned","female fertile","festive","few fierce","filthy","fine","finicky","first"," five"," fixed"," flagrant","flaky","flashy","flat","flawless","flimsy"," flippant","flowery","fluffy","fluttering"," foamy","foolish","foregoing","forgetful","fortunate","four frail","fragile","frantic","free"," freezing"," frequent"," fresh"," fretful","friendly","frightened frightening full fumbling functional","funny","furry furtive","future futuristic","fuzzy ","gabby","gainful","gamy","gaping","garrulous","gaudy","general gentle","giant","giddy","gifted","gigantic","glamorous","gleaming","glib","glistening glorious","glossy","godly","good","goofy","gorgeous","graceful","grandiose","grateful gratis","gray greasy great","greedy","green grey grieving","groovy","grotesque","grouchy","grubby gruesome","grumpy","guarded","guiltless","gullible gusty","guttural H habitual","half","hallowed","halting","handsome","handsomely","handy","hanging","hapless","happy","hard","hard-to-find","harmonious","harsh","hateful","heady","healthy","heartbreaking","heavenly heavy hellish","helpful","helpless","hesitant","hideous high","highfalutin","high-pitched","hilarious","hissing","historical","holistic","hollow","homeless","homely","honorable","horrible","hospitable","hot huge","hulking","humdrum","humorous","hungry","hurried","hurt","hushed","husky","hypnotic","hysterical","icky","icy","idiotic","ignorant","ill","illegal","ill-fated","ill-informed","illustrious","imaginary","immense","imminent","impartial","imperfect","impolite","important","imported","impossible","incandescent","incompetent","inconclusive","industrious","incredible","inexpensive","infamous","innate","innocent","inquisitive","insidious","instinctive","intelligent","interesting","internal","invincible","irate","irritating","itchy","jaded","jagged","jazzy","jealous","jittery","jobless","jolly","joyous","judicious","juicy","jumbled","jumpy","juvenile","kaput","keen","kind","kindhearted","kindly","knotty","knowing","knowledgeable","known","labored","lackadaisical","lacking","lame","lamentable","languid","large","last","late","laughable","lavish","lazy","lean","learned","left","legal","lethal","level","lewd","light","like","likeable","limping","literate","little","lively","lively","living","lonely","long","longing","long-term","loose","lopsided","loud","loutish","lovely","loving","low","lowly","lucky","ludicrous","lumpy","lush","luxuriant","lying","lyrical","macabre","macho","maddening","madly","magenta","magical","magnificent","majestic","makeshift","male","malicious","mammoth","maniacal","many","marked","massive","married","marvelous","material","materialistic","mature","mean","measly","meaty","medical","meek","mellow","melodic","melted","merciful","mere","messy","mighty","military","milky","mindless","miniature","minor","miscreant","misty","mixed","moaning","modern","moldy","momentous","motionless","mountainous","muddled","mundane","murky","mushy","mute","mysterious","naive","nappy","narrow","nasty","natural","naughty","nauseating","near","neat","nebulous","necessary","needless","needy","neighborly","nervous","new","next","nice","nifty","nimble","nine","nippy","noiseless","noisy","nonchalant","nondescript","nonstop","normal","nostalgic","nosy","noxious","null","numberless","numerous","nutritious","nutty","oafish","obedient","obeisant","obese","obnoxious","obscene","obsequious","observant","obsolete","obtainable","oceanic","odd","offbeat","old","old-fashioned","omniscient","one","onerous","open","opposite","optimal","orange","ordinary","organic","ossified","outgoing","outrageous","outstanding","oval","overconfident","overjoyed","overrated","overt","overwrought","painful","painstaking","pale","paltry","panicky","panoramic","parallel","parched","parsimonious","past","pastoral","pathetic","peaceful","penitent","perfect","periodic","permissible","perpetual","petite","petite","phobic","physical","picayune","pink","piquant","placid","plain","plant","plastic","plausible","pleasant","plucky","pointless","poised","polite","political","poor","possessive","possible","powerful","precious","premium","present","pretty","previous","pricey","prickly","private","probable","productive","profuse","protective","proud","psychedelic","psychotic","public","puffy","pumped","puny","purple","purring","pushy","puzzled","puzzling","quack","quaint","quarrelsome","questionable","quick","quickest","quiet","quirky","quixotic","quizzical","rabid","racial","ragged","rainy","rambunctious","rampant","rapid","rare","raspy","ratty","ready","real","rebel","receptive","recondite","red","redundant","reflective","regular","relieved","remarkable","reminiscent","repulsive","resolute","resonant","responsible","rhetorical","rich","right","righteous","rightful","rigid","ripe","ritzy","roasted","robust","romantic","roomy","rotten","rough","round","royal","ruddy","rude","rural","rustic","ruthless","sable","sad","safe","salty","same","sassy","satisfying","savory","scandalous","scarce","scared","scary","scattered","scientific","scintillating","scrawny","screeching","second","second-hand","secret","secretive","sedate","seemly","selective","selfish","separate","serious","shaggy","shaky","shallow","sharp","shiny","shivering","shocking","short","shrill","shut","shy","sick","silent","silent","silky","silly","simple","simplistic","sincere","six","skillful","skinny","sleepy","slim","slimy","slippery","sloppy","slow","small","smart","smelly","smiling","smoggy","smooth","sneaky","snobbish","snotty","soft","soggy","solid","somber","sophisticated","sordid","sore","sore","sour","sparkling","special","spectacular","spicy","spiffy","spiky","spiritual","spiteful","splendid","spooky","spotless","spotted","spotty","spurious","squalid","square","squealing","squeamish","staking","stale","standing","statuesque","steadfast","steady","steep","stereotyped","sticky","stiff","stimulating","stingy","stormy","straight","strange","striped","strong","stupendous","stupid","sturdy","subdued","subsequent","substantial","successful","succinct","sudden","sulky","super","superb","superficial","supreme","swanky","sweet","sweltering","swift","symptomatic","synonymous","taboo","tacit","tacky","talented","tall","tame","tan","tangible","tangy","tart","tasteful","tasteless","tasty","tawdry","tearful","tedious","teeny","teeny-tiny","telling","temporary","ten","tender tense","tense","tenuous","terrible","terrific","tested","testy","thankful","therapeutic","thick","thin","thinkable","third","thirsty","thoughtful","thoughtless","threatening","three","thundering","tidy","tight","tightfisted","tiny","tired","tiresome","toothsome","torpid","tough","towering","tranquil","trashy","tremendous","tricky","trite","troubled","truculent","true","truthful","two","typical","ubiquitous","ugliest","ugly","ultra","unable","unaccountable","unadvised","unarmed","unbecoming","unbiased","uncovered","understood","undesirable","unequal","unequaled","uneven","unhealthy","uninterested","unique","unkempt","unknown","unnatural","unruly","unsightly","unsuitable","untidy","unused","unusual","unwieldy","unwritten","upbeat","uppity","upset","uptight","used","useful","useless","utopian","utter","uttermost","vacuous","vagabond","vague","valuable","various","vast","vengeful","venomous","verdant","versed","victorious","vigorous","violent","violet","vivacious","voiceless","volatile","voracious","vulgar","wacky","waggish","waiting","","wakeful","wandering","wanting","warlike","warm","wary","wasteful","watery","weak","wealthy","weary","well-groomed","well-made","well-off","well-to-do","wet","whimsical","whispering","white","whole","wholesale","wicked","wide","wide-eyed","wiggly","wild","willing","windy","wiry","wise","wistful","witty","woebegone","womanly","wonderful","wooden","woozy","workable","worried","worthless","wrathful","wretched","wrong","wry","xenophobic","yellow","yielding","young","youthful","yummy","zany","zealous","zesty","zippy","zonked"]

* **nouns**: *string[]* = ["accelerator", "accordion", "account", "accountant", "acknowledgment", "acoustic", "acrylic", "act", "action", "active", "activity", "actor", "actress", "adapter", "addition", "address", "adjustment", "adult", "advantage", "advertisement", "advice", "afghanistan", "africa", "aftermath", "afternoon", "aftershave", "afterthought", "age", "agenda", "agreement", "air", "airbus", "airmail", "airplane", "airport", "airship", "alarm", "albatross", "alcohol", "algebra", "algeria", "alibi", "alley", "alligator", "alloy", "almanac", "alphabet", "alto", "aluminium", "aluminum", "ambulance", "america", "amount", "amusement", "anatomy", "anethesiologist", "anger", "angle", "angora", "animal", "anime", "ankle", "answer", "ant", "antarctica", "anteater", "antelope", "anthony", "anthropology", "apartment", "apology", "apparatus", "apparel", "appeal", "appendix", "apple", "appliance", "approval", "april", "aquarius", "arch", "archaeology", "archeology", "archer", "architecture", "area", "argentina", "argument", "aries", "arithmetic", "arm", "armadillo", "armchair", "armenian", "army", "arrow", "art", "ash", "ashtray", "asia", "asparagus", "asphalt", "asterisk", "astronomy", "athlete", "atm", "atom", "attack", "attempt", "attention", "attic", "attraction", "august", "aunt", "australia", "australian", "author", "authorisation", "authority", "authorization", "avenue", "babies", "baboon", "baby", "back", "backbone", "bacon", "badge", "badger", "bag", "bagel", "bagpipe", "bail", "bait", "baker", "bakery", "balance", "balinese", "ball", "balloon", "bamboo", "banana", "band", "bandana", "bangladesh", "bangle", "banjo", "bank", "bankbook", "banker", "bar", "barbara", "barber", "barge", "baritone", "barometer", "base", "baseball", "basement", "basin", "basket", "basketball", "bass", "bassoon", "bat", "bath", "bathroom", "bathtub", "battery", "battle", "bay", "beach", "bead", "beam", "bean", "bear", "beard", "beast", "beat", "beautician", "beauty", "beaver", "bed", "bedroom", "bee", "beech", "beef", "beer", "beet", "beetle", "beggar", "beginner", "begonia", "behavior", "belgian", "belief", "believe", "bell", "belt", "bench", "bengal", "beret", "berry", "bestseller", "betty", "bibliography", "bicycle", "bike", "bill", "billboard", "biology", "biplane", "birch", "bird", "birth", "birthday", "bit", "bite", "black", "bladder", "blade", "blanket", "blinker", "blizzard", "block", "blood", "blouse", "blow", "blowgun", "blue", "board", "boat", "bobcat", "body", "bolt", "bomb", "bomber", "bone", "bongo", "bonsai", "book", "bookcase", "booklet", "boot", "border", "botany", "bottle", "bottom", "boundary", "bow", "bowl", "bowling", "box", "boy", "bra", "brace", "bracket", "brain", "brake", "branch", "brand", "brandy", "brass", "brazil", "bread", "break", "breakfast", "breath", "brian", "brick", "bridge", "british", "broccoli", "brochure", "broker", "bronze", "brother", "brother-in-law", "brow", "brown", "brush", "bubble", "bucket", "budget", "buffer", "buffet", "bugle", "building", "bulb", "bull", "bulldozer", "bumper", "bun", "burglar", "burma", "burn", "burst", "bus", "bush", "business", "butane", "butcher", "butter", "button", "buzzard", "c-clamp", "cabbage", "cabinet", "cable", "cactus", "cafe", "cake", "calculator", "calculus", "calendar", "calf", "call", "camel", "camera", "camp", "can", "canada", "canadian", "cancer", "candle", "cannon", "canoe", "canvas", "cap", "capital", "cappelletti", "capricorn", "captain", "caption", "car", "caravan", "carbon", "card", "cardboard", "cardigan", "care", "carnation", "carol", "carp", "carpenter", "carriage", "carrot", "cart", "cartoon", "case", "cast", "castanet", "cat", "catamaran", "caterpillar", "cathedral", "catsup", "cattle", "cauliflower", "cause", "caution", "cave", "cd", "ceiling", "celery", "celeste", "cell", "cellar", "cello", "celsius", "cement", "cemetery", "cent", "centimeter", "century", "ceramic", "cereal", "certification", "chain", "chair", "chalk", "chance", "change", "channel", "character", "chard", "charles", "chauffeur", "check", "cheek", "cheese", "cheetah", "chef", "chemistry", "cheque", "cherries", "cherry", "chess", "chest", "chick", "chicken", "chicory", "chief", "child", "children", "chill", "chime", "chimpanzee", "chin", "china", "chinese", "chive", "chocolate", "chord", "christmas", "christopher", "chronometer", "church", "cicada", "cinema", "circle", "circulation", "cirrus", "citizenship", "city", "clam", "clarinet", "class", "claus", "clave", "clef", "clerk", "click", "client", "climb", "clipper", "cloakroom", "clock", "close", "closet", "cloth", "cloud", "cloudy", "clover", "club", "clutch", "coach", "coal", "coast", "coat", "cobweb", "cockroach", "cocktail", "cocoa", "cod", "coffee", "coil", "coin", "coke", "cold", "collar", "college", "collision", "colombia", "colon", "colony", "color", "colt", "column", "columnist", "comb", "comfort", "comic", "comma", "command", "commission", "committee", "community", "company", "comparison", "competition", "competitor", "composer", "composition", "computer", "condition", "condor", "cone", "confirmation", "conga", "congo", "conifer", "connection", "consonant", "continent", "control", "cook", "cooking", "copper", "copy", "copyright", "cord", "cork", "cormorant", "corn", "cornet", "correspondent", "cost", "cotton", "couch", "cougar", "cough", "country", "course", "court", "cousin", "cover", "cow", "cowbell", "crab", "crack", "cracker", "craftsman", "crate", "crawdad", "crayfish", "crayon", "cream", "creator", "creature", "credit", "creditor", "creek", "crib", "cricket", "crime", "criminal", "crocodile", "crocus", "croissant", "crook", "crop", "cross", "crow", "crowd", "crown", "crush", "cry", "cub", "cuban", "cucumber", "cultivator", "cup", "cupboard", "cupcake", "curler", "currency", "current", "curtain", "curve", "cushion", "custard", "customer", "cut", "cuticle", "cycle", "cyclone", "cylinder", "cymbal", "dad", "daffodil", "dahlia", "daisy", "damage", "dance", "dancer", "danger", "daniel", "dash", "dashboard", "database", "date", "daughter", "david", "day", "dead", "deadline", "deal", "death", "deborah", "debt", "debtor", "decade", "december", "decimal", "decision", "decrease", "dedication", "deer", "defense", "deficit", "degree", "delete", "delivery", "den", "denim", "dentist", "deodorant", "department", "deposit", "description", "desert", "design", "desire", "desk", "dessert", "destruction", "detail", "detective", "development", "dew", "diamond", "diaphragm", "dibble", "dictionary", "dietician", "difference", "digestion", "digger", "digital", "dill", "dime", "dimple", "dinghy", "dinner", "dinosaur", "diploma", "dipstick", "direction", "dirt", "disadvantage", "discovery", "discussion", "disease", "disgust", "dish", "distance", "distribution", "distributor", "diving", "division", "divorced", "dock", "doctor", "dog", "dogsled", "doll", "dollar", "dolphin", "domain", "donald", "donkey", "donna", "door", "dorothy", "double", "doubt", "downtown", "dragon", "dragonfly", "drain", "drake", "drama", "draw", "drawbridge", "drawer", "dream", "dredger", "dress", "dresser", "dressing", "drill", "drink", "drive", "driver", "driving", "drizzle", "drop", "drug", "drum", "dry", "dryer", "duck", "duckling", "dugout", "dungeon", "dust", "eagle", "ear", "earth", "earthquake", "ease", "east", "edge", "edger", "editor", "editorial", "education", "edward", "eel", "effect", "egg", "eggnog", "eggplant", "egypt", "eight", "elbow", "element", "elephant", "elizabeth", "ellipse", "emery", "employee", "employer", "encyclopedia", "end", "enemy", "energy", "engine", "engineer", "engineering", "english", "enquiry", "entrance", "environment", "epoch", "epoxy", "equinox", "equipment", "era", "error", "estimate", "ethernet", "ethiopia", "euphonium", "europe", "evening", "event", "ex-husband", "ex-wife", "examination", "example", "exchange", "exclamation", "exhaust", "existence", "expansion", "experience", "expert", "explanation", "eye", "eyebrow", "eyelash", "eyeliner", "face", "facilities", "fact", "factory", "fahrenheit", "fairies", "fall", "family", "fan", "fang", "farm", "farmer", "fat", "father", "father-in-law", "faucet", "fear", "feast", "feather", "feature", "february", "fedelini", "feedback", "feeling", "feet", "felony", "female", "fender", "ferry", "ferryboat", "fertilizer", "fiber", "fiberglass", "fibre", "fiction", "field", "fifth", "fight", "fighter", "file", "find", "fine", "finger", "fir", "fire", "fired", "fireman", "fireplace", "firewall", "fish", "fisherman", "flag", "flame", "flare", "flat", "flavor", "flax", "flesh", "flight", "flock", "flood", "floor", "flower", "flugelhorn", "flute", "fly", "foam", "fog", "fold", "font", "food", "foot", "football", "footnote", "force", "forecast", "forehead", "forest", "forgery", "fork", "form", "format", "fortnight", "foundation", "fountain", "fowl", "fox", "foxglove", "fragrance", "frame", "france", "freckle", "freeze", "freezer", "freighter", "french", "freon", "friction", "friday", "fridge", "friend", "frog", "front", "frost", "frown", "fruit", "fuel", "fur", "furniture", "galley", "gallon", "game", "gander", "garage", "garden", "garlic", "gas", "gasoline", "gate", "gateway", "gauge", "gazelle", "gear", "gearshift", "geese", "gemini", "gender", "geography", "geology", "geometry", "george", "geranium", "german", "germany", "ghana", "ghost", "giant", "giraffe", "girdle", "girl", "gladiolus", "glass", "glider", "gliding", "glockenspiel", "glove", "glue", "goal", "goat", "gold", "goldfish", "golf", "gondola", "gong", "good-bye", "goose", "gore-tex", "gorilla", "gosling", "government", "governor", "grade", "grain", "gram", "granddaughter", "grandfather", "grandmother", "grandson", "grape", "graphic", "grass", "grasshopper", "gray", "grease", "great-grandfather", "great-grandmother", "greece", "greek", "green", "grenade", "grey", "grill", "grip", "ground", "group", "grouse", "growth", "guarantee", "guatemalan", "guide", "guilty", "guitar", "gum", "gun", "gym", "gymnast", "hacksaw", "hail", "hair", "haircut", "half-brother", "half-sister", "halibut", "hall", "hallway", "hamburger", "hammer", "hamster", "hand", "handball", "handicap", "handle", "handsaw", "harbor", "hardboard", "hardcover", "hardhat", "hardware", "harmonica", "harmony", "harp", "hat", "hate", "hawk", "head", "headlight", "headline", "health", "hearing", "heart", "heat", "heaven", "hedge", "height", "helen", "helicopter", "helium", "hell", "helmet", "help", "hemp", "hen", "heron", "herring", "hexagon", "hill", "himalayan", "hip", "hippopotamus", "history", "hobbies", "hockey", "hoe", "hole", "holiday", "home", "honey", "hood", "hook", "hope", "horn", "horse", "hose", "hospital", "hot", "hour", "hourglass", "house", "hovercraft", "hub", "hubcap", "humidity", "humor", "hurricane", "hyacinth", "hydrant", "hydrofoil", "hydrogen", "hyena", "hygienic", "ice", "icebreaker", "icicle", "icon", "idea", "ikebana", "illegal", "imprisonment", "improvement", "impulse", "inch", "income", "increase", "index", "india", "indonesia", "industry", "ink", "innocent", "input", "insect", "instruction", "instrument", "insulation", "insurance", "interactive", "interest", "internet", "interviewer", "intestine", "invention", "inventory", "invoice", "iran", "iraq", "iris", "iron", "island", "israel", "italian", "italy", "jacket", "jaguar", "jail", "jam", "james", "january", "japan", "japanese", "jar", "jasmine", "jason", "jaw", "jeans", "jeep", "jeff", "jelly", "jellyfish", "jennifer", "jet", "jewel", "jogging", "john", "join", "joke", "joseph", "journey", "judge", "judo", "juice", "july", "jumbo", "jump", "jumper", "june", "jury", "justice", "jute", "kale", "kamikaze", "kangaroo", "karate", "karen", "kayak", "kendo", "kenneth", "kenya", "ketchup", "kettle", "kettledrum", "kevin", "key", "keyboard", "keyboarding", "kick", "kidney", "kilogram", "kilometer", "kimberly", "kiss", "kitchen", "kite", "kitten", "kitty", "knee", "knickers", "knife", "knight", "knot", "knowledge", "kohlrabi", "korean", "laborer", "lace", "ladybug", "lake", "lamb", "lamp", "lan", "land", "landmine", "language", "larch", "lasagna", "latency", "latex", "lathe", "laugh", "laundry", "laura", "law", "lawyer", "layer", "lead", "leaf", "learning", "leather", "leek", "leg", "legal", "lemonade", "lentil", "leo", "leopard", "letter", "lettuce", "level", "libra", "library", "license", "lier", "lift", "light", "lightning", "lilac", "lily", "limit", "linda", "line", "linen", "link", "lion", "lip", "lipstick", "liquid", "liquor", "lisa", "list", "literature", "litter", "liver", "lizard", "llama", "loaf", "loan", "lobster", "lock", "locket", "locust", "look", "loss", "lotion", "love", "low", "lumber", "lunch", "lunchroom", "lung", "lunge", "lute", "luttuce", "lycra", "lynx", "lyocell", "lyre", "lyric", "macaroni", "machine", "macrame", "magazine", "magic", "magician", "maid", "mail", "mailbox", "mailman", "makeup", "malaysia", "male", "mall", "mallet", "man", "manager", "mandolin", "manicure", "manx", "map", "maple", "maraca", "marble", "march", "margaret", "margin", "maria", "marimba", "mark", "market", "married", "mary", "mascara", "mask", "mass", "match", "math", "mattock", "may", "mayonnaise", "meal", "measure", "meat", "mechanic", "medicine", "meeting", "melody", "memory", "men", "menu", "mercury", "message", "metal", "meteorology", "meter", "methane", "mexican", "mexico", "mice", "michael", "michelle", "microwave", "middle", "mile", "milk", "milkshake", "millennium", "millimeter", "millisecond", "mimosa", "mind", "mine", "mini-skirt", "minibus", "minister", "mint", "minute", "mirror", "missile", "mist", "mistake", "mitten", "moat", "modem", "mole", "mom", "monday", "money", "monkey", "month", "moon", "morning", "morocco", "mosque", "mosquito", "mother", "mother-in-law", "motion", "motorboat", "motorcycle", "mountain", "mouse", "moustache", "mouth", "move", "multi-hop", "multimedia", "muscle", "museum", "music", "musician", "mustard", "myanmar", "nail", "name", "nancy", "napkin", "narcissus", "nation", "neck", "need", "needle", "neon", "nepal", "nephew", "nerve", "nest", "net", "network", "news", "newsprint", "newsstand", "nic", "nickel", "niece", "nigeria", "night", "nitrogen", "node", "noise", "noodle", "north", "north america", "north korea", "norwegian", "nose", "note", "notebook", "notify", "novel", "november", "number", "numeric", "nurse", "nut", "nylon", "oak", "oatmeal", "objective", "oboe", "observation", "occupation", "ocean", "ocelot", "octagon", "octave", "october", "octopus", "odometer", "offence", "offer", "office", "oil", "okra", "olive", "onion", "open", "opera", "operation", "ophthalmologist", "opinion", "option", "orange", "orchestra", "orchid", "order", "organ", "organisation", "organization", "ornament", "ostrich", "otter", "ounce", "output", "outrigger", "oval", "oven", "overcoat", "owl", "owner", "ox", "oxygen", "oyster", "package", "packet", "page", "pail", "pain", "paint", "pair", "pajama", "pakistan", "palm", "pamphlet", "pan", "pancake", "pancreas", "panda", "pansy", "panther", "panties", "pantry", "pants", "panty", "pantyhose", "paper", "paperback", "parade", "parallelogram", "parcel", "parent", "parentheses", "park", "parrot", "parsnip", "part", "particle", "partner", "partridge", "party", "passbook", "passenger", "passive", "pasta", "paste", "pastor", "pastry", "patch", "path", "patient", "patio", "patricia", "paul", "payment", "pea", "peace", "peak", "peanut", "pear", "pedestrian", "pediatrician", "peen", "peer-to-peer", "pelican", "pen", "penalty", "pencil", "pendulum", "pentagon", "peony", "pepper", "perch", "perfume", "period", "periodical", "peripheral", "permission", "persian", "person", "peru", "pest", "pet", "pharmacist", "pheasant", "philippines", "philosophy", "phone", "physician", "piano", "piccolo", "pickle", "picture", "pie", "pig", "pigeon", "pike", "pillow", "pilot", "pimple", "pin", "pine", "ping", "pink", "pint", "pipe", "pisces", "pizza", "place", "plain", "plane", "planet", "plant", "plantation", "plaster", "plasterboard", "plastic", "plate", "platinum", "play", "playground", "playroom", "pleasure", "plier", "plot", "plough", "plow", "plywood", "pocket", "poet", "point", "poison", "poland", "police", "policeman", "polish", "politician", "pollution", "polo", "polyester", "pond", "popcorn", "poppy", "population", "porch", "porcupine", "port", "porter", "position", "possibility", "postage", "postbox", "pot", "potato", "poultry", "pound", "powder", "power", "precipitation", "preface", "prepared", "pressure", "price", "priest", "print", "printer", "prison", "probation", "process", "processing", "produce", "product", "production", "professor", "profit", "promotion", "propane", "property", "prose", "prosecution", "protest", "protocol", "pruner", "psychiatrist", "psychology", "ptarmigan", "puffin", "pull", "puma", "pump", "pumpkin", "punch", "punishment", "puppy", "purchase", "purple", "purpose", "push", "pvc", "pyjama", "pyramid", "quail", "quality", "quart", "quarter", "quartz", "queen", "question", "quicksand", "quiet", "quill", "quilt", "quince", "quit", "quiver", "quotation", "rabbi", "rabbit", "racing", "radar", "radiator", "radio", "radish", "raft", "rail", "railway", "rain", "rainbow", "raincoat", "rainstorm", "rake", "ramie", "random", "range", "rat", "rate", "raven", "ravioli", "ray", "rayon", "reaction", "reading", "reason", "receipt", "recess", "record", "recorder", "rectangle", "red", "reduction", "refrigerator", "refund", "regret", "reindeer", "relation", "relative", "religion", "relish", "reminder", "repair", "replace", "report", "representative", "request", "resolution", "respect", "responsibility", "rest", "restaurant", "result", "retailer", "revolve", "revolver", "reward", "rhinoceros", "rhythm", "rice", "richard", "riddle", "rifle", "ring", "rise", "risk", "river", "riverbed", "road", "roadway", "roast", "robert", "robin", "rock", "rocket", "rod", "roll", "romania", "romanian", "ronald", "roof", "room", "rooster", "root", "rose", "rotate", "route", "router", "rowboat", "rub", "rubber", "rugby", "rule", "run", "russia", "russian", "rutabaga", "ruth", "sack", "sagittarius", "sail", "sailboat", "sailor", "salad", "salary", "sale", "salesman", "salmon", "salt", "sampan", "samurai", "sand", "sandra", "sandwich", "santa", "sarah", "sardine", "satin", "saturday", "sauce", "saudi arabia", "sausage", "save", "saw", "saxophone", "scale", "scallion", "scanner", "scarecrow", "scarf", "scene", "scent", "schedule", "school", "science", "scissors", "scooter", "scorpio", "scorpion", "scraper", "screen", "screw", "screwdriver", "sea", "seagull", "seal", "seaplane", "search", "seashore", "season", "seat", "second", "secretary", "secure", "security", "seed", "seeder", "segment", "select", "selection", "self", "semicircle", "semicolon", "sense", "sentence", "separated", "september", "servant", "server", "session", "sex", "shade", "shadow", "shake", "shallot", "shame", "shampoo", "shape", "share", "shark", "sharon", "shears", "sheep", "sheet", "shelf", "shell", "shield", "shingle", "ship", "shirt", "shock", "shoe", "shoemaker", "shop", "shorts", "shoulder", "shovel", "show", "shrimp", "shrine", "siamese", "siberian", "side", "sideboard", "sidecar", "sidewalk", "sign", "signature", "silica", "silk", "silver", "sing", "singer", "single", "sink", "sister", "sister-in-law", "size", "skate", "skiing", "skill", "skin", "skirt", "sky", "slash", "slave", "sled", "sleep", "sleet", "slice", "slime", "slip", "slipper", "slope", "smash", "smell", "smile", "smoke", "snail", "snake", "sneeze", "snow", "snowboarding", "snowflake", "snowman", "snowplow", "snowstorm", "soap", "soccer", "society", "sociology", "sock", "soda", "sofa", "softball", "softdrink", "software", "soil", "soldier", "son", "song", "soprano", "sort", "sound", "soup", "sousaphone", "south africa", "south america", "south korea", "soy", "soybean", "space", "spade", "spaghetti", "spain", "spandex", "spark", "sparrow", "spear", "specialist", "speedboat", "sphere", "sphynx", "spider", "spike", "spinach", "spleen", "sponge", "spoon", "spot", "spring", "sprout", "spruce", "spy", "square", "squash", "squid", "squirrel", "stage", "staircase", "stamp", "star", "start", "starter", "state", "statement", "station", "statistic", "steam", "steel", "stem", "step", "step-aunt", "step-brother", "step-daughter", "step-father", "step-grandfather", "step-grandmother", "step-mother", "step-sister", "step-son", "step-uncle", "stepdaughter", "stepmother", "stepson", "steven", "stew", "stick", "stinger", "stitch", "stock", "stocking", "stomach", "stone", "stool", "stop", "stopsign", "stopwatch", "store", "storm", "story", "stove", "stranger", "straw", "stream", "street", "streetcar", "stretch", "string", "structure", "study", "sturgeon", "submarine", "substance", "subway", "success", "sudan", "suede", "sugar", "suggestion", "suit", "summer", "sun", "sunday", "sundial", "sunflower", "sunshine", "supermarket", "supply", "support", "surfboard", "surgeon", "surname", "surprise", "susan", "sushi", "swallow", "swamp", "swan", "sweater", "sweatshirt", "sweatshop", "swedish", "sweets", "swim", "swimming", "swing", "swiss", "switch", "sword", "swordfish", "sycamore", "syria", "syrup", "system", "t-shirt", "table", "tablecloth", "tabletop", "tachometer", "tadpole", "tail", "tailor", "taiwan", "talk", "tank", "tanker", "tanzania", "target", "taste", "taurus", "tax", "taxi", "taxicab", "tea", "teacher", "teaching", "team", "technician", "teeth", "television", "teller", "temper", "temperature", "temple", "tempo", "tendency", "tennis", "tenor", "tent", "territory", "test", "text", "textbook", "texture", "thailand", "theater", "theory", "thermometer", "thing", "thistle", "thomas", "thought", "thread", "thrill", "throat", "throne", "thumb", "thunder", "thunderstorm", "thursday", "ticket", "tie", "tiger", "tights", "tile", "timbale", "time", "timer", "timpani", "tin", "tip", "tire", "titanium", "title", "toad", "toast", "toe", "toenail", "toilet", "tom-tom", "tomato", "ton", "tongue", "tooth", "toothbrush", "toothpaste", "top", "tornado", "tortellini", "tortoise", "touch", "tower", "town", "toy", "tractor", "trade", "traffic", "trail", "train", "tramp", "transaction", "transmission", "transport", "trapezoid", "tray", "treatment", "tree", "trial", "triangle", "trick", "trigonometry", "trip", "trombone", "trouble", "trousers", "trout", "trowel", "truck", "trumpet", "trunk", "tsunami", "tub", "tuba", "tuesday", "tugboat", "tulip", "tuna", "tune", "turkey", "turkish", "turn", "turnip", "turnover", "turret", "turtle", "tv", "twig", "twilight", "twine", "twist", "typhoon", "tyvek", "uganda", "ukraine", "ukrainian", "umbrella", "uncle", "underclothes", "underpants", "undershirt", "underwear", "unit", "united kingdom", "unshielded", "use", "utensil", "uzbekistan", "vacation", "vacuum", "valley", "value", "van", "var verbs = [aardvark", "vase", "vault", "vegetable", "vegetarian", "veil", "vein", "velvet", "venezuela", "venezuelan", "verdict", "vermicelli", "verse", "vessel", "vest", "veterinarian", "vibraphone", "vietnam", "view", "vinyl", "viola", "violet", "violin", "virgo", "viscose", "vise", "vision", "visitor", "voice", "volcano", "volleyball", "voyage", "vulture", "waiter", "waitress", "walk", "wall", "wallaby", "wallet", "walrus", "war", "warm", "wash", "washer", "wasp", "waste", "watch", "watchmaker", "water", "waterfall", "wave", "wax", "way", "wealth", "weapon", "weasel", "weather", "wedge", "wednesday", "weed", "weeder", "week", "weight", "whale", "wheel", "whip", "whiskey", "whistle", "white", "wholesaler", "whorl", "wilderness", "william", "willow", "wind", "windchime", "window", "windscreen", "windshield", "wine", "wing", "winter", "wire", "wish", "witch", "withdrawal", "witness", "wolf", "woman", "women", "wood", "wool", "woolen", "word", "work", "workshop", "worm", "wound", "wrecker", "wren", "wrench", "wrinkle", "wrist", "writer", "xylophone", "yacht", "yak", "yam", "yard", "yarn", "year", "yellow", "yew", "yogurt", "yoke", "yugoslavian", "zebra", "zephyr", "zinc", "zipper", "zone", "zoo", "zoology" ]

* **verbs**: *string[]* = ["accept", "add", "admire", "admit", "advise", "afford", "agree", "alert", "allow", "amuse", "analyse", "announce", "annoy", "answer", "apologise", "appear", "applaud", "appreciate", "approve", "argue", "arrange", "arrest", "arrive", "ask", "attach", "attack", "attempt", "attend", "attract", "avoid", "back", "bake", "balance", "ban", "bang", "bare", "bat", "bathe", "battle", "beam", "beg", "behave", "belong", "bleach", "bless", "blind", "blink", "blot", "blush", "boast", "boil", "bolt", "bomb", "book", "bore", "borrow", "bounce", "bow", "box", "brake", "branch", "breathe", "bruise", "brush", "bubble", "bump", "burn", "bury", "buzz", "calculate", "call", "camp", "care", "carry", "carve", "cause", "challenge", "change", "charge", "chase", "cheat", "check", "cheer", "chew", "choke", "chop", "claim", "clap", "clean", "clear", "clip", "close", "coach", "coil", "collect", "colour", "comb", "command", "communicate", "compare", "compete", "complain", "complete", "concentrate", "concern", "confess", "confuse", "connect", "consider", "consist", "contain", "continue", "copy", "correct", "cough", "count", "cover", "crack", "crash", "crawl", "cross", "crush", "cry", "cure", "curl", "curve", "cycle", "dam", "damage", "dance", "dare", "decay", "deceive", "decide", "decorate", "delay", "delight", "deliver", "depend", "describe", "desert", "deserve", "destroy", "detect", "develop", "disagree", "disappear", "disapprove", "disarm", "discover", "dislike", "divide", "double", "doubt", "drag", "drain", "dream", "dress", "drip", "drop", "drown", "drum", "dry", "dust", "earn", "educate", "embarrass", "employ", "empty", "encourage", "end", "enjoy", "enter", "entertain", "escape", "examine", "excite", "excuse", "exercise", "exist", "expand", "expect", "explain", "explode", "extend", "face", "fade", "fail", "fancy", "fasten", "fax", "fear", "fence", "fetch", "file", "fill", "film", "fire", "fit", "fix", "flap", "flash", "float", "flood", "flow", "flower", "fold", "follow", "fool", "force", "form", "found", "frame", "frighten", "fry", "gather", "gaze", "glow", "glue", "grab", "grate", "grease", "greet", "grin", "grip", "groan", "guarantee", "guard", "guess", "guide", "hammer", "hand", "handle", "hang", "happen", "harass", "harm", "hate", "haunt", "head", "heal", "heap", "heat", "help", "hook", "hop", "hope", "hover", "hug", "hum", "hunt", "hurry", "identify", "ignore", "imagine", "impress", "improve", "include", "increase", "influence", "inform", "inject", "injure", "instruct", "intend", "interest", "interfere", "interrupt", "introduce", "invent", "invite", "irritate", "itch", "jail", "jam", "jog", "join", "joke", "judge", "juggle", "jump", "kick", "kill", "kiss", "kneel", "knit", "knock", "knot", "label", "land", "last", "laugh", "launch", "learn", "level", "license", "lick", "lie", "lighten", "like", "list", "listen", "live", "load", "lock", "long", "look", "love", "man", "manage", "march", "mark", "marry", "match", "mate", "matter", "measure", "meddle", "melt", "memorise", "mend", "mess up", "milk", "mine", "miss", "mix", "moan", "moor", "mourn", "move", "muddle", "mug", "multiply", "murder", "nail", "name", "need", "nest", "nod", "note", "notice", "number", "obey", "object", "observe", "obtain", "occur", "offend", "offer", "open", "order", "overflow", "owe", "own", "pack", "paddle", "paint", "park", "part", "pass", "paste", "pat", "pause", "peck", "pedal", "peel", "peep", "perform", "permit", "phone", "pick", "pinch", "pine", "place", "plan", "plant", "play", "please", "plug", "point", "poke", "polish", "pop", "possess", "post", "pour", "practise", "pray", "preach", "precede", "prefer", "prepare", "present", "preserve", "press", "pretend", "prevent", "prick", "print", "produce", "program", "promise", "protect", "provide", "pull", "pump", "punch", "puncture", "punish", "push", "question", "queue", "race", "radiate", "rain", "raise", "reach", "realise", "receive", "recognise", "record", "reduce", "reflect", "refuse", "regret", "reign", "reject", "rejoice", "relax", "release", "rely", "remain", "remember", "remind", "remove", "repair", "repeat", "replace", "reply", "report", "reproduce", "request", "rescue", "retire", "return", "rhyme", "rinse", "risk", "rob", "rock", "roll", "rot", "rub", "ruin", "rule", "rush", "sack", "sail", "satisfy", "save", "saw", "scare", "scatter", "scold", "scorch", "scrape", "scratch", "scream", "screw", "scribble", "scrub", "seal", "search", "separate", "serve", "settle", "shade", "share", "shave", "shelter", "shiver", "shock", "shop", "shrug", "sigh", "sign", "signal", "sin", "sip", "ski", "skip", "slap", "slip", "slow", "smash", "smell", "smile", "smoke", "snatch", "sneeze", "sniff", "snore", "snow", "soak", "soothe", "sound", "spare", "spark", "sparkle", "spell", "spill", "spoil", "spot", "spray", "sprout", "squash", "squeak", "squeal", "squeeze", "stain", "stamp", "stare", "start", "stay", "steer", "step", "stir", "stitch", "stop", "store", "strap", "strengthen", "stretch", "strip", "stroke", "stuff", "subtract", "succeed", "suck", "suffer", "suggest", "suit", "supply", "support", "suppose", "surprise", "surround", "suspect", "suspend", "switch", "talk", "tame", "tap", "taste", "tease", "telephone", "tempt", "terrify", "test", "thank", "thaw", "tick", "tickle", "tie", "time", "tip", "tire", "touch", "tour", "tow", "trace", "trade", "train", "transport", "trap", "travel", "treat", "tremble", "trick", "trip", "trot", "trouble", "trust", "try", "tug", "tumble", "turn", "twist", "type", "undress", "unfasten", "unite", "unlock", "unpack", "untidy", "use", "vanish", "visit", "wail", "wait", "walk", "wander", "want", "warm", "warn", "wash", "waste", "watch", "water", "wave", "weigh", "welcome", "whine", "whip", "whirl", "whisper", "whistle", "wink", "wipe", "wish", "wobble", "wonder", "work", "worry", "wrap", "wreck", "wrestle", "wriggle", "x-ray", "yawn", "yell", "zip", "zoom"]

___

###  database

• **database**:

*Defined in [src/database/index.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L1)*

###  Reaction

• **Reaction**:

*Defined in [src/database/index.ts:109](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L109)*

###  id

• **id**: *string | null*

*Defined in [src/database/index.ts:111](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L111)*

###  name

• **name**: *string*

*Defined in [src/database/index.ts:110](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L110)*

###  profileProperty

Ƭ **profileProperty**: *"color" | "pronouns" | "gender" | "age" | "biography"*

*Defined in [src/database/index.ts:76](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L76)*

### `Const` db

• **db**: *Connection<>* = mongoose.connection

*Defined in [src/database/index.ts:17](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L17)*

### `Const` createInfraction

▸ **createInfraction**(`message`: Message, `userId`: string, `infractionType`: InfractionTypes, `reason`: string, `duration?`: undefined | number): *Promise<Infraction<>>*

*Defined in [src/database/index.ts:125](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message |
`userId` | string |
`infractionType` | InfractionTypes |
`reason` | string |
`duration?` | undefined &#124; number |

**Returns:** *Promise<Infraction<>>*

### `Const` createReactionRole

▸ **createReactionRole**(`guildId`: string, `messageId`: string, `reaction`: Reaction, `roleId`: string): *Promise<ReactionRole<>>*

*Defined in [src/database/index.ts:114](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`guildId` | string |
`messageId` | string |
`reaction` | Reaction |
`roleId` | string |

**Returns:** *Promise<ReactionRole<>>*

### `Const` createUserProfile

▸ **createUserProfile**(`userId`: string, `color`: string, `pronouns`: string, `gender`: string, `age`: string, `biography`: string): *Promise<UserProfile<>>*

*Defined in [src/database/index.ts:87](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | string |
`color` | string |
`pronouns` | string |
`gender` | string |
`age` | string |
`biography` | string |

**Returns:** *Promise<UserProfile<>>*

### `Const` createVerifyApp

▸ **createVerifyApp**(`guildId`: string, `userId`: string, `messageId`: string, `messageContent`: string): *Promise<VerifyApp<>>*

*Defined in [src/database/index.ts:99](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`guildId` | string |
`userId` | string |
`messageId` | string |
`messageContent` | string |

**Returns:** *Promise<VerifyApp<>>*

### `Const` getGuildInfractions

▸ **getGuildInfractions**(`guildId`: string): *Promise<null | Infraction<>>*

*Defined in [src/database/index.ts:48](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`guildId` | string |

**Returns:** *Promise<null | Infraction<>>*

### `Const` getGuildSettings

▸ **getGuildSettings**(`guildId`: string): *Promise<GuildSettings<>>*

*Defined in [src/database/index.ts:35](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`guildId` | string |

**Returns:** *Promise<GuildSettings<>>*

### `Const` getReactionRole

▸ **getReactionRole**(`guild`: string, `messageId`: string, `reaction`: Reaction): *Promise<null | ReactionRole<>>*

*Defined in [src/database/index.ts:68](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | string |
`messageId` | string |
`reaction` | Reaction |

**Returns:** *Promise<null | ReactionRole<>>*

### `Const` getReactionRoles

▸ **getReactionRoles**(`guild`: string, `messageId`: string): *Promise<ReactionRole<>[]>*

*Defined in [src/database/index.ts:72](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | string |
`messageId` | string |

**Returns:** *Promise<ReactionRole<>[]>*

### `Const` getUserInfractions

▸ **getUserInfractions**(`guildId`: string, `userId`: string): *Promise<null | Infraction<>>*

*Defined in [src/database/index.ts:53](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`guildId` | string |
`userId` | string |

**Returns:** *Promise<null | Infraction<>>*

### `Const` getUserProfile

▸ **getUserProfile**(`userID`: string): *Promise<null | UserProfile<>>*

*Defined in [src/database/index.ts:58](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`userID` | string |

**Returns:** *Promise<null | UserProfile<>>*

### `Const` getVerifyApp

▸ **getVerifyApp**(`guild`: string, `messageId`: string): *Promise<null | VerifyApp<>>*

*Defined in [src/database/index.ts:63](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | string |
`messageId` | string |

**Returns:** *Promise<null | VerifyApp<>>*

### `Const` updateGuildSettings

▸ **updateGuildSettings**(`guildId`: string, `settings`: GuildSettings): *Promise<void>*

*Defined in [src/database/index.ts:42](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`guildId` | string |
`settings` | GuildSettings |

**Returns:** *Promise<void>*

### `Const` updateUserProfile

▸ **updateUserProfile**(`userId`: string, `property`: profileProperty, `value`: string): *Promise<void>*

*Defined in [src/database/index.ts:79](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`userId` | string |
`property` | profileProperty |
`value` | string |

**Returns:** *Promise<void>*

### ▪ **database**: *object*

*Defined in [src/database/index.ts:26](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/index.ts#L26)*

* **guildSettings**: *Model<GuildSettings<>, object>* = GuildSettings

* **infractions**: *Model<Infraction<>, object>* = Infraction

* **reactionRoles**: *Model<ReactionRole<>, object>* = ReactionRole

* **userProfiles**: *Model<UserProfile<>, object>* = UserProfile

* **verifyApps**: *Model<VerifyApp<>, object>* = VerifyApp

___

###  database/schemas

• **database/schemas**:

*Defined in [src/database/schemas/Infraction.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L1)*

###  GuildSettings

• **GuildSettings**:

*Defined in [src/database/schemas/GuildSettings.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L3)*

### `Optional` __v

• **__v**? : *undefined | number*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3483

Version using default version key. See http://mongoosejs.com/docs/guide.html#versionKey
If you're using another key, you will have to access it using []: doc[_myVersionKey]

###  base

• **base**: *typeof mongoose*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3504

Base Mongoose instance the model uses.

###  baseModelName

• **baseModelName**: *string | undefined*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3510

If this is a discriminator model, baseModelName is the
name of the base model.

###  collection

• **collection**: *Collection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3513

Collection the model uses.

###  db

• **db**: *Connection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3516

Connection the model uses.

###  discriminators

• **discriminators**: *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3519

Registered discriminators for this model.

###  general

• **general**: *object*

*Defined in [src/database/schemas/GuildSettings.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L5)*

#### Type declaration:

* **deleteCommands**: *boolean*

* **memberRole**: *string*

* **prefix**: *string*

###  guild

• **guild**: *string*

*Defined in [src/database/schemas/GuildSettings.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L4)*

### `Optional` id

• **id**? : *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:1539

Virtual getter that by default returns the document's _id field cast to a string,
or in the case of ObjectIds, its hexString. This id getter may be disabled by
passing the option { id: false } at schema construction time. If disabled, id
behaves like any other field on a document and can be assigned any value.

###  modelName

• **modelName**: *string*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3522

The name of the model

###  moderation

• **moderation**: *object*

*Defined in [src/database/schemas/GuildSettings.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L10)*

#### Type declaration:

* **enabled**: *boolean*

* **modLog**: *string*

* **mutedRole**: *string*

* **warnExpire**: *number*

###  schema

• **schema**: *Schema*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3525

Schema the model uses.

###  verification

• **verification**: *object*

*Defined in [src/database/schemas/GuildSettings.ts:16](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L16)*

#### Type declaration:

* **acceptMessage**: *string*

* **denyMessage**: *string*

* **enabled**: *boolean*

* **manualVerify**: *boolean*

* **modVerifyChannel**: *string*

* **nonVerifiedChannels**: *string[]*

* **nonVerifiedRole**: *string*

* **pingStaff**: *boolean*

* **staffRole**: *string*

* **verifyChannel**: *string*

* **verifyMessage**: *string*

###  welcome

• **welcome**: *object*

*Defined in [src/database/schemas/GuildSettings.ts:29](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L29)*

#### Type declaration:

* **backgroundColor**: *string*

* **enabled**: *boolean*

* **profileBackground**: *string*

* **profileColor**: *string*

* **textColor**: *string*

* **welcomeChannel**: *string*

###  $isDeleted

▸ **$isDeleted**(`isDeleted`: boolean): *void*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3459

Override whether mongoose thinks this doc is deleted or not

**Parameters:**

Name | Type |
------ | ------ |
`isDeleted` | boolean |

**Returns:** *void*

▸ **$isDeleted**(): *boolean*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3461

whether mongoose thinks this doc is deleted.

**Returns:** *boolean*

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:554

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

###  eventNames

▸ **eventNames**(): *Array<string | symbol>*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:569

**Returns:** *Array<string | symbol>*

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:561

**Returns:** *number*

###  increment

▸ **increment**(): *this*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3450

Signal that we desire an increment of this documents version.

**Returns:** *this*

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:565

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  model

▸ **model**‹**T**›(`name`: string): *Model<T>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3456

Returns another Model instance.

**Type parameters:**

▪ **T**: *Document*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | model name  |

**Returns:** *Model<T>*

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:555

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:556

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:567

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:568

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  remove

▸ **remove**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3467

Removes this document from the db.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:557

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  save

▸ **save**(`options?`: SaveOptions, `fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3476

Saves this document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | SaveOptions | options optional options |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

▸ **save**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3477

**Parameters:**

Name | Type |
------ | ------ |
`fn?` | undefined &#124; function |

**Returns:** *Promise<this>*

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

###  Infraction

• **Infraction**:

*Defined in [src/database/schemas/Infraction.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L5)*

### `Optional` __v

• **__v**? : *undefined | number*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3483

Version using default version key. See http://mongoosejs.com/docs/guide.html#versionKey
If you're using another key, you will have to access it using []: doc[_myVersionKey]

###  base

• **base**: *typeof mongoose*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3504

Base Mongoose instance the model uses.

###  baseModelName

• **baseModelName**: *string | undefined*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3510

If this is a discriminator model, baseModelName is the
name of the base model.

###  case

• **case**: *number*

*Defined in [src/database/schemas/Infraction.ts:17](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L17)*

###  collection

• **collection**: *Collection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3513

Collection the model uses.

###  db

• **db**: *Connection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3516

Connection the model uses.

###  discriminators

• **discriminators**: *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3519

Registered discriminators for this model.

### `Optional` endTimestamp

• **endTimestamp**? : *undefined | number*

*Defined in [src/database/schemas/Infraction.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L10)*

###  guild

• **guild**: *string*

*Defined in [src/database/schemas/Infraction.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L6)*

### `Optional` id

• **id**? : *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:1539

Virtual getter that by default returns the document's _id field cast to a string,
or in the case of ObjectIds, its hexString. This id getter may be disabled by
passing the option { id: false } at schema construction time. If disabled, id
behaves like any other field on a document and can be assigned any value.

###  infractionType

• **infractionType**: *InfractionTypes*

*Defined in [src/database/schemas/Infraction.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L8)*

###  modelName

• **modelName**: *string*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3522

The name of the model

###  moderator

• **moderator**: *object*

*Defined in [src/database/schemas/Infraction.ts:13](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L13)*

#### Type declaration:

* **id**: *string*

* **tag**: *string*

### `Optional` needsTiming

• **needsTiming**? : *undefined | false | true*

*Defined in [src/database/schemas/Infraction.ts:11](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L11)*

###  reason

• **reason**: *string*

*Defined in [src/database/schemas/Infraction.ts:12](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L12)*

###  schema

• **schema**: *Schema*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3525

Schema the model uses.

###  timestamp

• **timestamp**: *number*

*Defined in [src/database/schemas/Infraction.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L9)*

###  user

• **user**: *string*

*Defined in [src/database/schemas/Infraction.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L7)*

###  $isDeleted

▸ **$isDeleted**(`isDeleted`: boolean): *void*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3459

Override whether mongoose thinks this doc is deleted or not

**Parameters:**

Name | Type |
------ | ------ |
`isDeleted` | boolean |

**Returns:** *void*

▸ **$isDeleted**(): *boolean*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3461

whether mongoose thinks this doc is deleted.

**Returns:** *boolean*

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:554

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

###  eventNames

▸ **eventNames**(): *Array<string | symbol>*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:569

**Returns:** *Array<string | symbol>*

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:561

**Returns:** *number*

###  increment

▸ **increment**(): *this*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3450

Signal that we desire an increment of this documents version.

**Returns:** *this*

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:565

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  model

▸ **model**‹**T**›(`name`: string): *Model<T>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3456

Returns another Model instance.

**Type parameters:**

▪ **T**: *Document*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | model name  |

**Returns:** *Model<T>*

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:555

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:556

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:567

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:568

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  remove

▸ **remove**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3467

Removes this document from the db.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:557

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  save

▸ **save**(`options?`: SaveOptions, `fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3476

Saves this document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | SaveOptions | options optional options |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

▸ **save**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3477

**Parameters:**

Name | Type |
------ | ------ |
`fn?` | undefined &#124; function |

**Returns:** *Promise<this>*

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

###  ReactionRole

• **ReactionRole**:

*Defined in [src/database/schemas/ReactionRoles.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L3)*

### `Optional` __v

• **__v**? : *undefined | number*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3483

Version using default version key. See http://mongoosejs.com/docs/guide.html#versionKey
If you're using another key, you will have to access it using []: doc[_myVersionKey]

###  base

• **base**: *typeof mongoose*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3504

Base Mongoose instance the model uses.

###  baseModelName

• **baseModelName**: *string | undefined*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3510

If this is a discriminator model, baseModelName is the
name of the base model.

###  collection

• **collection**: *Collection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3513

Collection the model uses.

###  db

• **db**: *Connection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3516

Connection the model uses.

###  discriminators

• **discriminators**: *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3519

Registered discriminators for this model.

###  guild

• **guild**: *string*

*Defined in [src/database/schemas/ReactionRoles.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L4)*

### `Optional` id

• **id**? : *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:1539

Virtual getter that by default returns the document's _id field cast to a string,
or in the case of ObjectIds, its hexString. This id getter may be disabled by
passing the option { id: false } at schema construction time. If disabled, id
behaves like any other field on a document and can be assigned any value.

###  messageId

• **messageId**: *string*

*Defined in [src/database/schemas/ReactionRoles.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L5)*

###  modelName

• **modelName**: *string*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3522

The name of the model

###  reaction

• **reaction**: *object*

*Defined in [src/database/schemas/ReactionRoles.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L6)*

#### Type declaration:

* **id**: *string | null*

* **name**: *string*

###  roleId

• **roleId**: *string*

*Defined in [src/database/schemas/ReactionRoles.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L10)*

###  schema

• **schema**: *Schema*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3525

Schema the model uses.

###  $isDeleted

▸ **$isDeleted**(`isDeleted`: boolean): *void*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3459

Override whether mongoose thinks this doc is deleted or not

**Parameters:**

Name | Type |
------ | ------ |
`isDeleted` | boolean |

**Returns:** *void*

▸ **$isDeleted**(): *boolean*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3461

whether mongoose thinks this doc is deleted.

**Returns:** *boolean*

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:554

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

###  eventNames

▸ **eventNames**(): *Array<string | symbol>*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:569

**Returns:** *Array<string | symbol>*

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:561

**Returns:** *number*

###  increment

▸ **increment**(): *this*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3450

Signal that we desire an increment of this documents version.

**Returns:** *this*

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:565

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  model

▸ **model**‹**T**›(`name`: string): *Model<T>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3456

Returns another Model instance.

**Type parameters:**

▪ **T**: *Document*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | model name  |

**Returns:** *Model<T>*

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:555

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:556

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:567

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:568

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  remove

▸ **remove**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3467

Removes this document from the db.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:557

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  save

▸ **save**(`options?`: SaveOptions, `fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3476

Saves this document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | SaveOptions | options optional options |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

▸ **save**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3477

**Parameters:**

Name | Type |
------ | ------ |
`fn?` | undefined &#124; function |

**Returns:** *Promise<this>*

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

###  UserProfile

• **UserProfile**:

*Defined in [src/database/schemas/UserProfile.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L3)*

### `Optional` __v

• **__v**? : *undefined | number*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3483

Version using default version key. See http://mongoosejs.com/docs/guide.html#versionKey
If you're using another key, you will have to access it using []: doc[_myVersionKey]

### `Optional` age

• **age**? : *undefined | string*

*Defined in [src/database/schemas/UserProfile.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L8)*

###  base

• **base**: *typeof mongoose*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3504

Base Mongoose instance the model uses.

###  baseModelName

• **baseModelName**: *string | undefined*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3510

If this is a discriminator model, baseModelName is the
name of the base model.

### `Optional` biography

• **biography**? : *undefined | string*

*Defined in [src/database/schemas/UserProfile.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L9)*

###  collection

• **collection**: *Collection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3513

Collection the model uses.

### `Optional` color

• **color**? : *undefined | string*

*Defined in [src/database/schemas/UserProfile.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L5)*

###  db

• **db**: *Connection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3516

Connection the model uses.

###  discriminators

• **discriminators**: *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3519

Registered discriminators for this model.

### `Optional` gender

• **gender**? : *undefined | string*

*Defined in [src/database/schemas/UserProfile.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L7)*

### `Optional` id

• **id**? : *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:1539

Virtual getter that by default returns the document's _id field cast to a string,
or in the case of ObjectIds, its hexString. This id getter may be disabled by
passing the option { id: false } at schema construction time. If disabled, id
behaves like any other field on a document and can be assigned any value.

###  modelName

• **modelName**: *string*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3522

The name of the model

### `Optional` pronouns

• **pronouns**? : *undefined | string*

*Defined in [src/database/schemas/UserProfile.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L6)*

###  schema

• **schema**: *Schema*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3525

Schema the model uses.

###  userID

• **userID**: *string*

*Defined in [src/database/schemas/UserProfile.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L4)*

###  $isDeleted

▸ **$isDeleted**(`isDeleted`: boolean): *void*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3459

Override whether mongoose thinks this doc is deleted or not

**Parameters:**

Name | Type |
------ | ------ |
`isDeleted` | boolean |

**Returns:** *void*

▸ **$isDeleted**(): *boolean*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3461

whether mongoose thinks this doc is deleted.

**Returns:** *boolean*

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:554

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

###  eventNames

▸ **eventNames**(): *Array<string | symbol>*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:569

**Returns:** *Array<string | symbol>*

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:561

**Returns:** *number*

###  increment

▸ **increment**(): *this*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3450

Signal that we desire an increment of this documents version.

**Returns:** *this*

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:565

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  model

▸ **model**‹**T**›(`name`: string): *Model<T>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3456

Returns another Model instance.

**Type parameters:**

▪ **T**: *Document*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | model name  |

**Returns:** *Model<T>*

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:555

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:556

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:567

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:568

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  remove

▸ **remove**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3467

Removes this document from the db.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:557

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  save

▸ **save**(`options?`: SaveOptions, `fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3476

Saves this document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | SaveOptions | options optional options |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

▸ **save**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3477

**Parameters:**

Name | Type |
------ | ------ |
`fn?` | undefined &#124; function |

**Returns:** *Promise<this>*

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

###  VerifyApp

• **VerifyApp**:

*Defined in [src/database/schemas/VerifyApp.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L3)*

### `Optional` __v

• **__v**? : *undefined | number*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3483

Version using default version key. See http://mongoosejs.com/docs/guide.html#versionKey
If you're using another key, you will have to access it using []: doc[_myVersionKey]

###  base

• **base**: *typeof mongoose*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3504

Base Mongoose instance the model uses.

###  baseModelName

• **baseModelName**: *string | undefined*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3510

If this is a discriminator model, baseModelName is the
name of the base model.

###  collection

• **collection**: *Collection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3513

Collection the model uses.

###  db

• **db**: *Connection*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3516

Connection the model uses.

###  discriminators

• **discriminators**: *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3519

Registered discriminators for this model.

###  guild

• **guild**: *string*

*Defined in [src/database/schemas/VerifyApp.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L4)*

### `Optional` id

• **id**? : *any*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:1539

Virtual getter that by default returns the document's _id field cast to a string,
or in the case of ObjectIds, its hexString. This id getter may be disabled by
passing the option { id: false } at schema construction time. If disabled, id
behaves like any other field on a document and can be assigned any value.

###  messageContent

• **messageContent**: *string*

*Defined in [src/database/schemas/VerifyApp.ts:7](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L7)*

###  messageId

• **messageId**: *string*

*Defined in [src/database/schemas/VerifyApp.ts:5](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L5)*

###  modelName

• **modelName**: *string*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3522

The name of the model

###  schema

• **schema**: *Schema*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3525

Schema the model uses.

###  userId

• **userId**: *string*

*Defined in [src/database/schemas/VerifyApp.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L6)*

###  $isDeleted

▸ **$isDeleted**(`isDeleted`: boolean): *void*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3459

Override whether mongoose thinks this doc is deleted or not

**Parameters:**

Name | Type |
------ | ------ |
`isDeleted` | boolean |

**Returns:** *void*

▸ **$isDeleted**(): *boolean*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3461

whether mongoose thinks this doc is deleted.

**Returns:** *boolean*

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:554

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

###  eventNames

▸ **eventNames**(): *Array<string | symbol>*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:569

**Returns:** *Array<string | symbol>*

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:561

**Returns:** *number*

###  increment

▸ **increment**(): *this*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3450

Signal that we desire an increment of this documents version.

**Returns:** *this*

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:565

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  model

▸ **model**‹**T**›(`name`: string): *Model<T>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3456

Returns another Model instance.

**Type parameters:**

▪ **T**: *Document*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | model name  |

**Returns:** *Model<T>*

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:555

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:556

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:567

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:568

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  remove

▸ **remove**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3467

Removes this document from the db.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:557

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  save

▸ **save**(`options?`: SaveOptions, `fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3476

Saves this document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | SaveOptions | options optional options |
`fn?` | undefined &#124; function | optional callback  |

**Returns:** *Promise<this>*

▸ **save**(`fn?`: undefined | function): *Promise<this>*

*Inherited from void*

Defined in node_modules/@types/mongoose/index.d.ts:3477

**Parameters:**

Name | Type |
------ | ------ |
`fn?` | undefined &#124; function |

**Returns:** *Promise<this>*

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

###  InfractionTypes

Ƭ **InfractionTypes**: *"warn" | "mute" | "kick" | "ban"*

*Defined in [src/database/schemas/Infraction.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L3)*

### `Const` GuildSettings

• **GuildSettings**: *Model<GuildSettings<>, object>* = mongoose.model<GuildSettings>('GuildSettings', GuildSettingsSchema)

*Defined in [src/database/schemas/GuildSettings.ts:75](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L75)*

### `Const` GuildSettingsSchema

• **GuildSettingsSchema**: *Schema<any>* = new mongoose.Schema({
    guild: String,
    general: {
        prefix: String,
        deleteCommands: Boolean,
        memberRole: String
    },
    moderation: {
        enabled: Boolean,
        modLog: String,
        warnExpire: Number,
        mutedRole: String
    },
    verification: {
        enabled: Boolean,
        staffRole: String,
        nonVerifiedRole: String,
        nonVerifiedChannels: Array,
        verifyChannel: String,
        manualVerify: Boolean,
        modVerifyChannel: String,
        pingStaff: Boolean,
        verifyMessage: String,
        denyMessage: String,
        acceptMessage: String
    },
    welcome: {
        enabled: Boolean,
        welcomeChannel: String,
        backgroundColor: String,
        textColor: String,
        profileColor: String,
        profileBackground: String
    }
})

*Defined in [src/database/schemas/GuildSettings.ts:39](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/GuildSettings.ts#L39)*

### `Const` Infraction

• **Infraction**: *Model<Infraction<>, object>* = mongoose.model<Infraction>('Infractions', InfractionSchema)

*Defined in [src/database/schemas/Infraction.ts:35](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L35)*

### `Const` InfractionSchema

• **InfractionSchema**: *Schema* = new mongoose.Schema({
    guild: String,
    user: String,
    infractionType: String,
    timestamp: Number,
    endTimestamp: Number,
    needsTiming: Boolean,
    reason: String,
    moderator: {
        id: String,
        tag: String
    },
    case: Number
})

*Defined in [src/database/schemas/Infraction.ts:20](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/Infraction.ts#L20)*

### `Const` ReactionRole

• **ReactionRole**: *Model<ReactionRole<>, object>* = mongoose.model<ReactionRole>('ReactionRole', ReactionRoleSchema)

*Defined in [src/database/schemas/ReactionRoles.ts:23](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L23)*

### `Const` ReactionRoleSchema

• **ReactionRoleSchema**: *Schema* = new mongoose.Schema({
    guild: String,
    messageId: String,
    reaction: {
        name: String,
        id: String
    },
    roleId: String
})

*Defined in [src/database/schemas/ReactionRoles.ts:13](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/ReactionRoles.ts#L13)*

### `Const` UserProfile

• **UserProfile**: *Model<UserProfile<>, object>* = mongoose.model<UserProfile>('UserProfiles', UserProfileSchema)

*Defined in [src/database/schemas/UserProfile.ts:21](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L21)*

### `Const` UserProfileSchema

• **UserProfileSchema**: *Schema* = new mongoose.Schema({
    userID: String,
    color: String,
    pronouns: String,
    gender: String,
    age: String,
    biography: String
})

*Defined in [src/database/schemas/UserProfile.ts:12](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/UserProfile.ts#L12)*

### `Const` VerifyApp

• **VerifyApp**: *Model<VerifyApp<>, object>* = mongoose.model<VerifyApp>('VerifyApp', VerifyAppSchema)

*Defined in [src/database/schemas/VerifyApp.ts:17](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L17)*

### `Const` VerifyAppSchema

• **VerifyAppSchema**: *Schema* = new mongoose.Schema({
    guild: String,
    messageId: String,
    userId: String,
    messageContent: String
})

*Defined in [src/database/schemas/VerifyApp.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/database/schemas/VerifyApp.ts#L10)*

___

###  events

• **events**:

*Defined in [src/events/channelCreate.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/events/channelCreate.ts#L1)*

### `Const` verifyBotPerms

• **verifyBotPerms**: *PermissionString[]* = ['MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'ADD_REACTIONS']

*Defined in [src/events/messageReactionAdd.ts:10](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/events/messageReactionAdd.ts#L10)*

### `Const` verifyUserPerms

• **verifyUserPerms**: *PermissionString[]* = ['MANAGE_ROLES', 'MANAGE_CHANNELS']

*Defined in [src/events/messageReactionAdd.ts:11](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/events/messageReactionAdd.ts#L11)*

___

###  hook

• **hook**:

*Defined in [src/hook/index.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/hook/index.ts#L1)*

___

###  interfaces

• **interfaces**:

*Defined in [src/interfaces/SettingsGroup.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L1)*

###  Client

• **Client**:

*Defined in [src/interfaces/Client.ts:12](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L12)*

###  constructor

\+ **new Client**(`options?`: ClientOptions): *Client*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:164

**Parameters:**

Name | Type |
------ | ------ |
`options?` | ClientOptions |

**Returns:** *Client*

###  ArgumentManager

• **ArgumentManager**: *ArgumentManager* = ArgumentManager

*Defined in [src/interfaces/Client.ts:20](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L20)*

###  PromptManager

• **PromptManager**: *PromptManager* = PromptManager

*Defined in [src/interfaces/Client.ts:19](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L19)*

###  channels

• **channels**: *ChannelManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:170

###  commands

• **commands**: *Collection<string, Command>* = new Collection()

*Defined in [src/interfaces/Client.ts:13](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L13)*

###  config

• **config**: *Config* = config

*Defined in [src/interfaces/Client.ts:14](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L14)*

###  constants

• **constants**: *object* = constants

*Defined in [src/interfaces/Client.ts:16](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L16)*

#### Type declaration:

* **words**: *object* = words

* ### **emotes**: *object*

  * **aDownloading**: *string* = "699715127607558324"

  * **aLoading**: *string* = "710931000515100763"

  * **aLoading1**: *string* = "710931013521506456"

  * **aTyping**: *string* = "710930989228097607"

  * **banCreate**: *string* = "699715118597931068"

  * **banDelete**: *string* = "699715119873261608"

  * **bot**: *string* = "699715120871374978"

  * **channel**: *string* = "710983594838851615"

  * **channelCreate**: *string* = "699715140030955668"

  * **channelDelete**: *string* = "699715124226818189"

  * **channelUpdate**: *string* = "699715138844098560"

  * **downvote**: *string* = "709981095646593136"

  * **emoteCreate**: *string* = "699715115448271001"

  * **emoteRemove**: *string* = "699715137702985758"

  * **emoteUpdate**: *string* = "699715122041454702"

  * **green**: *string* = "699715151825338558"

  * **grey**: *string* = "699715130279329873"

  * **infoUpdate**: *string* = "699715133634641960"

  * **leave**: *string* = "710930994060066818"

  * **letterTealA**: *string* = "716433181322117176"

  * **letterTealB**: *string* = "716433182358110208"

  * **letterTealC**: *string* = "716433179023507498"

  * **letterTealD**: *string* = "716433177958154331"

  * **letterTealE**: *string* = "716433183452692520"

  * **letterTealF**: *string* = "716433180324003850"

  * **letterTealG**: *string* = "716433185873068113"

  * **letterTealH**: *string* = "716433184543211532"

  * **letterTealI**: *string* = "716433186904604752"

  * **letterTealJ**: *string* = "716433187827482685"

  * **letterTealK**: *string* = "716433188926521434"

  * **letterTealL**: *string* = "716433189614387231"

  * **letterTealM**: *string* = "716433195859443832"

  * **letterTealN**: *string* = "716433190839124149"

  * **letterTealO**: *string* = "716433194655678495"

  * **letterTealP**: *string* = "716433191581253744"

  * **letterTealQ**: *string* = "716433193921806336"

  * **letterTealR**: *string* = "716433193040871474"

  * **letterTealS**: *string* = "716433196912345110"

  * **letterTealT**: *string* = "716433202213814273"

  * **letterTealU**: *string* = "716433198950645802"

  * **letterTealV**: *string* = "716433200276307968"

  * **letterTealW**: *string* = "716433201333272576"

  * **letterTealX**: *string* = "716433198338408519"

  * **letterTealY**: *string* = "716433203526631485"

  * **letterTealZ**: *string* = "716433204931723367"

  * **list**: *string* = "699715126428958842"

  * **memberJoin**: *string* = "699715129318703255"

  * **memberJoin1**: *string* = "699715132099526770"

  * **memberLeave**: *string* = "699715128341561345"

  * **memberUpdate**: *string* = "699715142006603786"

  * **messageDelete**: *string* = "699715154232999998"

  * **messageUpdate**: *string* = "699715131457667143"

  * **nitroBoost**: *string* = "699715144862662666"

  * **no**: *string* = "709981096066023444"

  * **red**: *string* = "699715153104732290"

  * **roleCreate**: *string* = "699715136876838962"

  * **roleRemove**: *string* = "699715147945607249"

  * **roleUpdate**: *string* = "699715135681593494"

  * **statusDnd**: *string* = "699715148990120046"

  * **statusIdle**: *string* = "699715146649436181"

  * **statusOffline**: *string* = "699715155176718498"

  * **statusOffline1**: *string* = "699715145919627304"

  * **statusStreaming**: *string* = "699715150122319943"

  * **upvote**: *string* = "709981095747387465"

  * **verifiedBadge**: *string* = "710970515988283423"

  * **voice**: *string* = "710983608696963135"

  * **yellow**: *string* = "699715134658052339"

  * **yes**: *string* = "709981119721766955"

* ### **regexps**: *object*

  * **camelCase**: *RegExp<>* = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g

###  database

• **database**: *object* = database

*Defined in [src/interfaces/Client.ts:15](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L15)*

#### Type declaration:

* **guildSettings**: *Model<GuildSettings<>, object>* = GuildSettings

* **infractions**: *Model<Infraction<>, object>* = Infraction

* **reactionRoles**: *Model<ReactionRole<>, object>* = ReactionRole

* **userProfiles**: *Model<UserProfile<>, object>* = UserProfile

* **verifyApps**: *Model<VerifyApp<>, object>* = VerifyApp

### `Readonly` emojis

• **emojis**: *GuildEmojiManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:171

###  guilds

• **guilds**: *GuildManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:172

###  options

• **options**: *ClientOptions*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:100

###  readyAt

• **readyAt**: *Date | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:173

### `Readonly` readyTimestamp

• **readyTimestamp**: *number | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:174

###  sendEmbed

• **sendEmbed**: *sendEmbed* = sendEmbed

*Defined in [src/interfaces/Client.ts:17](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L17)*

###  settings

• **settings**: *getGuildSettings* = getGuildSettings

*Defined in [src/interfaces/Client.ts:18](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L18)*

###  shard

• **shard**: *ShardClientUtil | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:175

###  token

• **token**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:176

### `Readonly` uptime

• **uptime**: *number | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:177

###  user

• **user**: *ClientUser | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:178

###  users

• **users**: *UserManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:179

###  voice

• **voice**: *ClientVoiceManager | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:180

###  ws

• **ws**: *WebSocketManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:181

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:554

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  clearImmediate

▸ **clearImmediate**(`timeout`: Immediate): *void*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:103

**Parameters:**

Name | Type |
------ | ------ |
`timeout` | Immediate |

**Returns:** *void*

###  clearInterval

▸ **clearInterval**(`interval`: Timer): *void*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:101

**Parameters:**

Name | Type |
------ | ------ |
`interval` | Timer |

**Returns:** *void*

###  clearTimeout

▸ **clearTimeout**(`timeout`: Timer): *void*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:102

**Parameters:**

Name | Type |
------ | ------ |
`timeout` | Timer |

**Returns:** *void*

###  destroy

▸ **destroy**(): *void*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:182

**Returns:** *void*

###  emit

▸ **emit**‹**K**›(`event`: K, ...`args`: ClientEvents[K]): *boolean*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:197

**Type parameters:**

▪ **K**: *keyof ClientEvents*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`...args` | ClientEvents[K] |

**Returns:** *boolean*

###  eventNames

▸ **eventNames**(): *Array<string | symbol>*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:569

**Returns:** *Array<string | symbol>*

###  fetchApplication

▸ **fetchApplication**(): *Promise<ClientApplication>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:183

**Returns:** *Promise<ClientApplication>*

###  fetchGuildPreview

▸ **fetchGuildPreview**(`guild`: GuildResolvable): *Promise<GuildPreview>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:184

**Parameters:**

Name | Type |
------ | ------ |
`guild` | GuildResolvable |

**Returns:** *Promise<GuildPreview>*

###  fetchInvite

▸ **fetchInvite**(`invite`: InviteResolvable): *Promise<Invite>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:185

**Parameters:**

Name | Type |
------ | ------ |
`invite` | InviteResolvable |

**Returns:** *Promise<Invite>*

###  fetchVoiceRegions

▸ **fetchVoiceRegions**(): *Promise<Collection<string, VoiceRegion>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:186

**Returns:** *Promise<Collection<string, VoiceRegion>>*

###  fetchWebhook

▸ **fetchWebhook**(`id`: Snowflake, `token?`: undefined | string): *Promise<Webhook>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:187

**Parameters:**

Name | Type |
------ | ------ |
`id` | Snowflake |
`token?` | undefined &#124; string |

**Returns:** *Promise<Webhook>*

###  generateInvite

▸ **generateInvite**(`permissions?`: PermissionResolvable): *Promise<string>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:188

**Parameters:**

Name | Type |
------ | ------ |
`permissions?` | PermissionResolvable |

**Returns:** *Promise<string>*

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:561

**Returns:** *number*

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:565

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  login

▸ **login**(`token?`: undefined | string): *Promise<string>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:189

**Parameters:**

Name | Type |
------ | ------ |
`token?` | undefined &#124; string |

**Returns:** *Promise<string>*

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  on

▸ **on**‹**K**›(`event`: K, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:193

**Type parameters:**

▪ **K**: *keyof ClientEvents*

**Parameters:**

▪ **event**: *K*

▪ **listener**: *function*

▸ (...`args`: ClientEvents[K]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | ClientEvents[K] |

**Returns:** *this*

###  once

▸ **once**‹**K**›(`event`: K, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:195

**Type parameters:**

▪ **K**: *keyof ClientEvents*

**Parameters:**

▪ **event**: *K*

▪ **listener**: *function*

▸ (...`args`: ClientEvents[K]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | ClientEvents[K] |

**Returns:** *this*

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:567

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:568

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:557

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

###  setImmediate

▸ **setImmediate**(`fn`: function, ...`args`: any[]): *Immediate*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:107

**Parameters:**

▪ **fn**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

▪... **args**: *any[]*

**Returns:** *Immediate*

###  setInterval

▸ **setInterval**(`fn`: function, `delay`: number, ...`args`: any[]): *Timer*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:105

**Parameters:**

▪ **fn**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

▪ **delay**: *number*

▪... **args**: *any[]*

**Returns:** *Timer*

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in node_modules/@types/node/globals.d.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

###  setTimeout

▸ **setTimeout**(`fn`: function, `delay`: number, ...`args`: any[]): *Timer*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:106

**Parameters:**

▪ **fn**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

▪ **delay**: *number*

▪... **args**: *any[]*

**Returns:** *Timer*

###  sweepMessages

▸ **sweepMessages**(`lifetime?`: undefined | number): *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:190

**Parameters:**

Name | Type |
------ | ------ |
`lifetime?` | undefined &#124; number |

**Returns:** *number*

###  toJSON

▸ **toJSON**(): *object*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:191

**Returns:** *object*

###  Guild

• **Guild**:

*Defined in [src/interfaces/Guild.ts:26](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L26)*

Custom Guild Class with functions to get/udpate various guild settings.

**`export`** 

###  constructor

\+ **new Guild**(`client`: Client, `data`: object): *Guild*

*Overrides void*

*Defined in [src/interfaces/Guild.ts:26](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`data` | object |

**Returns:** *Guild*

### `Readonly` afkChannel

• **afkChannel**: *VoiceChannel | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:587

###  afkChannelID

• **afkChannelID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:588

###  afkTimeout

• **afkTimeout**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:589

###  applicationID

• **applicationID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:590

###  available

• **available**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:591

###  banner

• **banner**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:592

###  channels

• **channels**: *GuildChannelManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:593

### `Readonly` client

• **client**: *Client*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:87

### `Readonly` createdAt

• **createdAt**: *Date*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:594

### `Readonly` createdTimestamp

• **createdTimestamp**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:595

###  defaultMessageNotifications

• **defaultMessageNotifications**: *DefaultMessageNotifications | number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:596

###  deleted

• **deleted**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:597

###  description

• **description**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:598

###  embedChannel

• **embedChannel**: *GuildChannel | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:599

###  embedChannelID

• **embedChannelID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:600

###  embedEnabled

• **embedEnabled**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:601

###  emojis

• **emojis**: *GuildEmojiManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:602

###  explicitContentFilter

• **explicitContentFilter**: *ExplicitContentFilterLevel*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:603

###  features

• **features**: *GuildFeatures[]*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:604

###  icon

• **icon**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:605

###  id

• **id**: *Snowflake*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:606

### `Readonly` joinedAt

• **joinedAt**: *Date*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:607

###  joinedTimestamp

• **joinedTimestamp**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:608

###  large

• **large**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:609

###  maximumMembers

• **maximumMembers**: *number | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:610

###  maximumPresences

• **maximumPresences**: *number | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:611

### `Readonly` me

• **me**: *GuildMember | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:612

###  memberCount

• **memberCount**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:613

###  members

• **members**: *GuildMemberManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:614

###  mfaLevel

• **mfaLevel**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:615

###  name

• **name**: *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:616

### `Readonly` nameAcronym

• **nameAcronym**: *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:617

### `Readonly` owner

• **owner**: *GuildMember | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:618

###  ownerID

• **ownerID**: *Snowflake*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:619

### `Readonly` partnered

• **partnered**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:620

###  premiumSubscriptionCount

• **premiumSubscriptionCount**: *number | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:621

###  premiumTier

• **premiumTier**: *PremiumTier*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:622

###  presences

• **presences**: *PresenceManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:623

### `Readonly` publicUpdatesChannel

• **publicUpdatesChannel**: *TextChannel | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:624

###  publicUpdatesChannelID

• **publicUpdatesChannelID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:625

###  region

• **region**: *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:626

###  roles

• **roles**: *RoleManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:627

### `Readonly` rulesChannel

• **rulesChannel**: *TextChannel | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:628

###  rulesChannelID

• **rulesChannelID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:629

### `Readonly` shard

• **shard**: *WebSocketShard*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:630

###  shardID

• **shardID**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:631

###  splash

• **splash**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:632

### `Readonly` systemChannel

• **systemChannel**: *TextChannel | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:633

###  systemChannelFlags

• **systemChannelFlags**: *Readonly<SystemChannelFlags>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:634

###  systemChannelID

• **systemChannelID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:635

###  vanityURLCode

• **vanityURLCode**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:636

###  verificationLevel

• **verificationLevel**: *VerificationLevel*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:637

### `Readonly` verified

• **verified**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:638

### `Readonly` voice

• **voice**: *VoiceState | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:639

### `Readonly` voiceStates

• **voiceStates**: *VoiceStateManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:640

### `Readonly` widgetChannel

• **widgetChannel**: *TextChannel | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:641

###  widgetChannelID

• **widgetChannelID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:642

###  widgetEnabled

• **widgetEnabled**: *boolean | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:643

###  addMember

▸ **addMember**(`user`: UserResolvable, `options`: AddGuildMemberOptions): *Promise<GuildMember>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:644

**Parameters:**

Name | Type |
------ | ------ |
`user` | UserResolvable |
`options` | AddGuildMemberOptions |

**Returns:** *Promise<GuildMember>*

###  bannerURL

▸ **bannerURL**(`options?`: ImageURLOptions): *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:645

**Parameters:**

Name | Type |
------ | ------ |
`options?` | ImageURLOptions |

**Returns:** *string | null*

###  createInfraction

▸ **createInfraction**(`message`: AMessage, `userID`: string, `type`: InfractionTypes, `reason`: string, `duration?`: undefined | number): *Promise<Infraction>*

*Defined in [src/interfaces/Guild.ts:67](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L67)*

Creates an infraction in the database. If it has a duration, the bot will unban/unmute the user after the given duration.

**`memberof`** Guild

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | AMessage | The message that instantiated the infraction. |
`userID` | string | The userID of the punished user/ |
`type` | InfractionTypes | 'ban', 'mute', 'kick', or 'warn' |
`reason` | string | Reason for the infraction |
`duration?` | undefined &#124; number | - |

**Returns:** *Promise<Infraction>*

Promise<Infraction>

###  createIntegration

▸ **createIntegration**(`data`: IntegrationData, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:646

**Parameters:**

Name | Type |
------ | ------ |
`data` | IntegrationData |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  createReactionRole

▸ **createReactionRole**(`messageID`: string, `reaction`: Reaction, `roleID`: string): *Promise<ReactionRole>*

*Defined in [src/interfaces/Guild.ts:102](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L102)*

Creates a reaction role in the database

**`memberof`** Guild

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageID` | string | ID of the reaction message |
`reaction` | Reaction | Reaction object - contains emoji name, and ID if applicable |
`roleID` | string | ID of the reaction role |

**Returns:** *Promise<ReactionRole>*

Promise<ReactionRole>

###  createVerifyApp

▸ **createVerifyApp**(`userID`: string, `messageID`: string, `messageContent`: string): *Promise<VerifyApp>*

*Defined in [src/interfaces/Guild.ts:126](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L126)*

Creates a verify app in the database.

**`memberof`** Guild

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userID` | string | ID of the applicant |
`messageID` | string | ID of the embedded verify app |
`messageContent` | string | Verify app content |

**Returns:** *Promise<VerifyApp>*

Promise<VerifyApp>

###  delete

▸ **delete**(): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:647

**Returns:** *Promise<Guild>*

###  edit

▸ **edit**(`data`: GuildEditData, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:648

**Parameters:**

Name | Type |
------ | ------ |
`data` | GuildEditData |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  equals

▸ **equals**(`guild`: Guild): *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:649

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |

**Returns:** *boolean*

###  fetch

▸ **fetch**(): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:650

**Returns:** *Promise<Guild>*

###  fetchAuditLogs

▸ **fetchAuditLogs**(`options?`: GuildAuditLogsFetchOptions): *Promise<GuildAuditLogs>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:651

**Parameters:**

Name | Type |
------ | ------ |
`options?` | GuildAuditLogsFetchOptions |

**Returns:** *Promise<GuildAuditLogs>*

###  fetchBan

▸ **fetchBan**(`user`: UserResolvable): *Promise<object>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:652

**Parameters:**

Name | Type |
------ | ------ |
`user` | UserResolvable |

**Returns:** *Promise<object>*

###  fetchBans

▸ **fetchBans**(): *Promise<Collection<Snowflake, object>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:653

**Returns:** *Promise<Collection<Snowflake, object>>*

###  fetchEmbed

▸ **fetchEmbed**(): *Promise<GuildEmbedData>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:654

**Returns:** *Promise<GuildEmbedData>*

###  fetchIntegrations

▸ **fetchIntegrations**(): *Promise<Collection<string, Integration>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:655

**Returns:** *Promise<Collection<string, Integration>>*

###  fetchInvites

▸ **fetchInvites**(): *Promise<Collection<string, Invite>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:656

**Returns:** *Promise<Collection<string, Invite>>*

###  fetchPreview

▸ **fetchPreview**(): *Promise<GuildPreview>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:657

**Returns:** *Promise<GuildPreview>*

###  fetchVanityCode

▸ **fetchVanityCode**(): *Promise<string>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:658

**Returns:** *Promise<string>*

###  fetchVoiceRegions

▸ **fetchVoiceRegions**(): *Promise<Collection<string, VoiceRegion>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:659

**Returns:** *Promise<Collection<string, VoiceRegion>>*

###  fetchWebhooks

▸ **fetchWebhooks**(): *Promise<Collection<Snowflake, Webhook>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:660

**Returns:** *Promise<Collection<Snowflake, Webhook>>*

###  iconURL

▸ **iconURL**(`options?`: ImageURLOptions & object): *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:661

**Parameters:**

Name | Type |
------ | ------ |
`options?` | ImageURLOptions & object |

**Returns:** *string | null*

###  infractions

▸ **infractions**(): *Promise<Infraction | null>*

*Defined in [src/interfaces/Guild.ts:77](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L77)*

Gets the a guild's infractions

**`memberof`** Guild

**Returns:** *Promise<Infraction | null>*

Promise<Infraction | null>

###  leave

▸ **leave**(): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:662

**Returns:** *Promise<Guild>*

###  member

▸ **member**(`user`: UserResolvable): *GuildMember | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:663

**Parameters:**

Name | Type |
------ | ------ |
`user` | UserResolvable |

**Returns:** *GuildMember | null*

###  reactionRole

▸ **reactionRole**(`messageID`: string, `reaction`: Reaction): *Promise<ReactionRole | null>*

*Defined in [src/interfaces/Guild.ts:89](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L89)*

Gets a reaction role from the database

**`memberof`** Guild

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageID` | string | ID of the reaction message |
`reaction` | Reaction | Reaction object - contains emoji name, and ID if applicable |

**Returns:** *Promise<ReactionRole | null>*

Promise<ReactionRole | null>

###  reactionRoles

▸ **reactionRoles**(`messageID`: string): *Promise<ReactionRole[]>*

*Defined in [src/interfaces/Guild.ts:137](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L137)*

Returns an array of reaction roles on the given message.

**`memberof`** Guild

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageID` | string | ID of the reaction message |

**Returns:** *Promise<ReactionRole[]>*

Promise<ReactionRole[]>

###  setAFKChannel

▸ **setAFKChannel**(`afkChannel`: ChannelResolvable | null, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:664

**Parameters:**

Name | Type |
------ | ------ |
`afkChannel` | ChannelResolvable &#124; null |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setAFKTimeout

▸ **setAFKTimeout**(`afkTimeout`: number, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:665

**Parameters:**

Name | Type |
------ | ------ |
`afkTimeout` | number |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setBanner

▸ **setBanner**(`banner`: Base64Resolvable | null, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:666

**Parameters:**

Name | Type |
------ | ------ |
`banner` | Base64Resolvable &#124; null |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setChannelPositions

▸ **setChannelPositions**(`channelPositions`: ChannelPosition[]): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:667

**Parameters:**

Name | Type |
------ | ------ |
`channelPositions` | ChannelPosition[] |

**Returns:** *Promise<Guild>*

###  setDefaultMessageNotifications

▸ **setDefaultMessageNotifications**(`defaultMessageNotifications`: DefaultMessageNotifications | number, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:668

**Parameters:**

Name | Type |
------ | ------ |
`defaultMessageNotifications` | DefaultMessageNotifications &#124; number |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setEmbed

▸ **setEmbed**(`embed`: GuildEmbedData, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:672

**Parameters:**

Name | Type |
------ | ------ |
`embed` | GuildEmbedData |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setExplicitContentFilter

▸ **setExplicitContentFilter**(`explicitContentFilter`: ExplicitContentFilterLevel, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:673

**Parameters:**

Name | Type |
------ | ------ |
`explicitContentFilter` | ExplicitContentFilterLevel |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setIcon

▸ **setIcon**(`icon`: Base64Resolvable | null, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:674

**Parameters:**

Name | Type |
------ | ------ |
`icon` | Base64Resolvable &#124; null |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setName

▸ **setName**(`name`: string, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:675

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setOwner

▸ **setOwner**(`owner`: GuildMemberResolvable, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:676

**Parameters:**

Name | Type |
------ | ------ |
`owner` | GuildMemberResolvable |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setRegion

▸ **setRegion**(`region`: string, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:677

**Parameters:**

Name | Type |
------ | ------ |
`region` | string |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setRolePositions

▸ **setRolePositions**(`rolePositions`: RolePosition[]): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:678

**Parameters:**

Name | Type |
------ | ------ |
`rolePositions` | RolePosition[] |

**Returns:** *Promise<Guild>*

###  setSplash

▸ **setSplash**(`splash`: Base64Resolvable | null, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:679

**Parameters:**

Name | Type |
------ | ------ |
`splash` | Base64Resolvable &#124; null |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setSystemChannel

▸ **setSystemChannel**(`systemChannel`: ChannelResolvable | null, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:680

**Parameters:**

Name | Type |
------ | ------ |
`systemChannel` | ChannelResolvable &#124; null |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setSystemChannelFlags

▸ **setSystemChannelFlags**(`systemChannelFlags`: SystemChannelFlagsResolvable, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:681

**Parameters:**

Name | Type |
------ | ------ |
`systemChannelFlags` | SystemChannelFlagsResolvable |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  setVerificationLevel

▸ **setVerificationLevel**(`verificationLevel`: VerificationLevel, `reason?`: undefined | string): *Promise<Guild>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:682

**Parameters:**

Name | Type |
------ | ------ |
`verificationLevel` | VerificationLevel |
`reason?` | undefined &#124; string |

**Returns:** *Promise<Guild>*

###  settings

▸ **settings**(): *Promise<GuildSettings>*

*Defined in [src/interfaces/Guild.ts:37](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L37)*

Return's the database entry for the given guild.

**`memberof`** Guild

**Returns:** *Promise<GuildSettings>*

Promise<GuildSettings>

###  splashURL

▸ **splashURL**(`options?`: ImageURLOptions): *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:683

**Parameters:**

Name | Type |
------ | ------ |
`options?` | ImageURLOptions |

**Returns:** *string | null*

###  toJSON

▸ **toJSON**(): *object*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:684

**Returns:** *object*

###  toString

▸ **toString**(): *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:685

**Returns:** *string*

###  updateSettings

▸ **updateSettings**(`settings`: GuildSettings): *Promise<GuildSettings>*

*Defined in [src/interfaces/Guild.ts:50](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L50)*

Updates the guild's database entry with the provided GuildSettings.

**`memberof`** Guild

**Parameters:**

Name | Type |
------ | ------ |
`settings` | GuildSettings |

**Returns:** *Promise<GuildSettings>*

Promise<GuildSettings>

###  valueOf

▸ **valueOf**(): *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:89

**Returns:** *string*

###  verifyApp

▸ **verifyApp**(`messageID`: string): *Promise<VerifyApp | null>*

*Defined in [src/interfaces/Guild.ts:113](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Guild.ts#L113)*

Gets a verify app from the database

**`memberof`** Guild

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageID` | string | ID of the verify app |

**Returns:** *Promise<VerifyApp | null>*

Promise<VerifyApp | null>

###  AMessage

• **AMessage**:

*Defined in [src/interfaces/Client.ts:38](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L38)*

###  constructor

\+ **new AMessage**(`client`: Client, `data`: object, `channel`: TextChannel | DMChannel): *AMessage*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:907

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`data` | object |
`channel` | TextChannel &#124; DMChannel |

**Returns:** *AMessage*

###  activity

• **activity**: *MessageActivity | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:912

###  application

• **application**: *ClientApplication | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:913

###  attachments

• **attachments**: *Collection<Snowflake, MessageAttachment>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:914

###  author

• **author**: *User*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:915

###  channel

• **channel**: *TextChannel | DMChannel | NewsChannel*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:916

### `Readonly` cleanContent

• **cleanContent**: *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:917

###  client

• **client**: *Client*

*Overrides void*

*Defined in [src/interfaces/Client.ts:39](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L39)*

###  content

• **content**: *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:918

### `Readonly` createdAt

• **createdAt**: *Date*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:919

###  createdTimestamp

• **createdTimestamp**: *number*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:920

### `Readonly` deletable

• **deletable**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:921

###  deleted

• **deleted**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:922

### `Readonly` editable

• **editable**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:923

### `Readonly` editedAt

• **editedAt**: *Date | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:924

###  editedTimestamp

• **editedTimestamp**: *number | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:925

### `Readonly` edits

• **edits**: *Message[]*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:926

###  embeds

• **embeds**: *MessageEmbed[]*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:927

###  flags

• **flags**: *Readonly<MessageFlags>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:942

###  guild

• **guild**: *Guild*

*Overrides void*

*Defined in [src/interfaces/Client.ts:40](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L40)*

###  id

• **id**: *Snowflake*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:929

### `Readonly` member

• **member**: *GuildMember | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:930

###  mentions

• **mentions**: *MessageMentions*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:931

###  nonce

• **nonce**: *string | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:932

### `Readonly` partial

• **partial**: *false*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:933

### `Readonly` pinnable

• **pinnable**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:934

###  pinned

• **pinned**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:935

###  reactions

• **reactions**: *ReactionManager*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:936

###  reference

• **reference**: *MessageReference | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:943

###  system

• **system**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:937

###  tts

• **tts**: *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:938

###  type

• **type**: *MessageType*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:939

### `Readonly` url

• **url**: *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:940

###  webhookID

• **webhookID**: *Snowflake | null*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:941

###  awaitReactions

▸ **awaitReactions**(`filter`: CollectorFilter, `options?`: AwaitReactionsOptions): *Promise<Collection<Snowflake, MessageReaction>>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:944

**Parameters:**

Name | Type |
------ | ------ |
`filter` | CollectorFilter |
`options?` | AwaitReactionsOptions |

**Returns:** *Promise<Collection<Snowflake, MessageReaction>>*

###  createReactionCollector

▸ **createReactionCollector**(`filter`: CollectorFilter, `options?`: ReactionCollectorOptions): *ReactionCollector*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:948

**Parameters:**

Name | Type |
------ | ------ |
`filter` | CollectorFilter |
`options?` | ReactionCollectorOptions |

**Returns:** *ReactionCollector*

###  delete

▸ **delete**(`options?`: undefined | object): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:949

**Parameters:**

Name | Type |
------ | ------ |
`options?` | undefined &#124; object |

**Returns:** *Promise<Message>*

###  edit

▸ **edit**(`content`: StringResolvable, `options?`: MessageEditOptions | MessageEmbed): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:950

**Parameters:**

Name | Type |
------ | ------ |
`content` | StringResolvable |
`options?` | MessageEditOptions &#124; MessageEmbed |

**Returns:** *Promise<Message>*

▸ **edit**(`options`: MessageEditOptions | MessageEmbed | APIMessage): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:951

**Parameters:**

Name | Type |
------ | ------ |
`options` | MessageEditOptions &#124; MessageEmbed &#124; APIMessage |

**Returns:** *Promise<Message>*

###  equals

▸ **equals**(`message`: Message, `rawData`: object): *boolean*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:952

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message |
`rawData` | object |

**Returns:** *boolean*

###  fetch

▸ **fetch**(): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:954

**Returns:** *Promise<Message>*

###  fetchWebhook

▸ **fetchWebhook**(): *Promise<Webhook>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:953

**Returns:** *Promise<Webhook>*

###  pin

▸ **pin**(): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:955

**Returns:** *Promise<Message>*

###  react

▸ **react**(`emoji`: EmojiIdentifierResolvable): *Promise<MessageReaction>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:956

**Parameters:**

Name | Type |
------ | ------ |
`emoji` | EmojiIdentifierResolvable |

**Returns:** *Promise<MessageReaction>*

###  reply

▸ **reply**(`content?`: StringResolvable, `options?`: MessageOptions | MessageAdditions | MessageOptions & object | MessageAdditions): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:957

**Parameters:**

Name | Type |
------ | ------ |
`content?` | StringResolvable |
`options?` | MessageOptions &#124; MessageAdditions &#124; MessageOptions & object &#124; MessageAdditions |

**Returns:** *Promise<Message>*

▸ **reply**(`content?`: StringResolvable, `options?`: MessageOptions & object | MessageAdditions): *Promise<Message[]>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:961

**Parameters:**

Name | Type |
------ | ------ |
`content?` | StringResolvable |
`options?` | MessageOptions & object &#124; MessageAdditions |

**Returns:** *Promise<Message[]>*

▸ **reply**(`options?`: MessageOptions | MessageAdditions | APIMessage | MessageOptions & object | MessageAdditions | APIMessage): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:965

**Parameters:**

Name | Type |
------ | ------ |
`options?` | MessageOptions &#124; MessageAdditions &#124; APIMessage &#124; MessageOptions & object &#124; MessageAdditions &#124; APIMessage |

**Returns:** *Promise<Message>*

▸ **reply**(`options?`: MessageOptions & object | MessageAdditions | APIMessage): *Promise<Message[]>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:974

**Parameters:**

Name | Type |
------ | ------ |
`options?` | MessageOptions & object &#124; MessageAdditions &#124; APIMessage |

**Returns:** *Promise<Message[]>*

###  suppressEmbeds

▸ **suppressEmbeds**(`suppress?`: undefined | false | true): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:977

**Parameters:**

Name | Type |
------ | ------ |
`suppress?` | undefined &#124; false &#124; true |

**Returns:** *Promise<Message>*

###  toJSON

▸ **toJSON**(): *object*

*Inherited from void*

*Overrides void*

Defined in node_modules/discord.js/typings/index.d.ts:978

**Returns:** *object*

###  toString

▸ **toString**(): *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:979

**Returns:** *string*

###  unpin

▸ **unpin**(): *Promise<Message>*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:980

**Returns:** *Promise<Message>*

###  valueOf

▸ **valueOf**(): *string*

*Inherited from void*

Defined in node_modules/discord.js/typings/index.d.ts:89

**Returns:** *string*

###  Command

• **Command**:

*Defined in [src/interfaces/Client.ts:23](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L23)*

###  NSFW

• **NSFW**: *boolean*

*Defined in [src/interfaces/Client.ts:32](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L32)*

###  aliases

• **aliases**: *string[]*

*Defined in [src/interfaces/Client.ts:28](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L28)*

###  args

• **args**: *Argument[]*

*Defined in [src/interfaces/Client.ts:29](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L29)*

###  botPermissions

• **botPermissions**: *PermissionString[]*

*Defined in [src/interfaces/Client.ts:34](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L34)*

###  category

• **category**: *string*

*Defined in [src/interfaces/Client.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L25)*

###  description

• **description**: *string*

*Defined in [src/interfaces/Client.ts:27](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L27)*

###  devOnly

• **devOnly**: *boolean*

*Defined in [src/interfaces/Client.ts:30](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L30)*

###  guildOnly

• **guildOnly**: *boolean*

*Defined in [src/interfaces/Client.ts:31](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L31)*

###  module

• **module**: *string*

*Defined in [src/interfaces/Client.ts:26](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L26)*

###  name

• **name**: *string*

*Defined in [src/interfaces/Client.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L24)*

###  userPermissions

• **userPermissions**: *PermissionString[]*

*Defined in [src/interfaces/Client.ts:33](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L33)*

###  callback

▸ **callback**(`message`: BaseMessage, `args`: Args, `prompt`: PromptManager): *Promise<void | BaseMessage>*

*Defined in [src/interfaces/Client.ts:35](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | BaseMessage |
`args` | Args |
`prompt` | PromptManager |

**Returns:** *Promise<void | BaseMessage>*

###  Setting

• **Setting**:

*Defined in [src/interfaces/SettingsGroup.ts:18](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L18)*

### `Optional` array

• **array**? : *undefined | false | true*

*Defined in [src/interfaces/SettingsGroup.ts:23](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L23)*

### `Optional` default

• **default**? : *string | boolean | number*

*Defined in [src/interfaces/SettingsGroup.ts:26](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L26)*

### `Optional` dependencies

• **dependencies**? : *string[]*

*Defined in [src/interfaces/SettingsGroup.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L25)*

###  description

• **description**: *string*

*Defined in [src/interfaces/SettingsGroup.ts:21](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L21)*

###  identifier

• **identifier**: *string*

*Defined in [src/interfaces/SettingsGroup.ts:20](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L20)*

###  name

• **name**: *string*

*Defined in [src/interfaces/SettingsGroup.ts:19](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L19)*

### `Optional` required

• **required**? : *undefined | false | true*

*Defined in [src/interfaces/SettingsGroup.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L24)*

###  valueType

• **valueType**: *valueType*

*Defined in [src/interfaces/SettingsGroup.ts:22](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L22)*

###  SettingsGroup

• **SettingsGroup**:

*Defined in [src/interfaces/SettingsGroup.ts:29](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L29)*

###  description

• **description**: *string*

*Defined in [src/interfaces/SettingsGroup.ts:32](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L32)*

###  identifier

• **identifier**: *string*

*Defined in [src/interfaces/SettingsGroup.ts:31](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L31)*

###  name

• **name**: *string*

*Defined in [src/interfaces/SettingsGroup.ts:30](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L30)*

###  settings

• **settings**: *Setting[]*

*Defined in [src/interfaces/SettingsGroup.ts:33](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L33)*

###  update

▸ **update**(`guild`: Guild): *Promise<void>*

*Defined in [src/interfaces/SettingsGroup.ts:34](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |

**Returns:** *Promise<void>*

###  ClientEventTypes

Ƭ **ClientEventTypes**: *"channelCreate" | "channelDelete" | "channelPinsUpdate" | "channelUpdate" | "debug" | "warn" | "disconnect" | "emojiCreate" | "emojiDelete" | "emojiUpdate" | "error" | "guildBanAdd" | "guildBanRemove" | "guildCreate" | "guildDelete" | "guildUnavailable" | "guildIntegrationsUpdate" | "guildMemberAdd" | "guildMemberAvailable" | "guildMemberRemove" | "guildMembersChunk" | "guildMemberSpeaking" | "guildMemberUpdate" | "guildUpdate" | "inviteCreate" | "inviteDelete" | "message" | "messageDelete" | "messageReactionRemoveAll" | "messageReactionRemoveEmoji" | "messageDeleteBulk" | "messageReactionAdd" | "messageReactionRemove" | "messageUpdate" | "presenceUpdate" | "rateLimit" | "ready" | "invalidated" | "roleCreate" | "roleDelete" | "roleUpdate" | "typingStart" | "userUpdate" | "voiceStateUpdate" | "webhookUpdate" | "shardDisconnect" | "shardError" | "shardReady" | "shardReconnecting" | "shardResume"*

*Defined in [src/interfaces/Client.ts:43](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L43)*

###  EmbedField

Ƭ **EmbedField**: *object*

*Defined in [src/interfaces/Client.ts:95](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L95)*

#### Type declaration:

* **inline**? : *undefined | false | true*

* **name**: *string*

* **value**: *any*

###  valueType

Ƭ **valueType**: *"role" | "textChannel" | "guildChannel" | "voiceChannel" | "string" | "guildMember" | "bannedUser" | "boolean" | "number" | "color" | "url" | "image" | "snowflake" | "timeLength"*

*Defined in [src/interfaces/SettingsGroup.ts:2](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/SettingsGroup.ts#L2)*

### `Const` checkPerm

▸ **checkPerm**(`message`: AMessage | BaseMessage, `permission`: PermissionString): *boolean*

*Defined in [src/interfaces/Client.ts:199](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage &#124; BaseMessage |
`permission` | PermissionString |

**Returns:** *boolean*

### `Const` editEmbed

▸ **editEmbed**(`message`: AMessage | BaseMessage, `module?`: undefined | string, `title?`: undefined | string, `body?`: undefined | string, `thumbnail?`: undefined | string, `fields?`: EmbedField[], `color?`: undefined | string, `image?`: Buffer | string): *Promise<Message<>>*

*Defined in [src/interfaces/Client.ts:102](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage &#124; BaseMessage |
`module?` | undefined &#124; string |
`title?` | undefined &#124; string |
`body?` | undefined &#124; string |
`thumbnail?` | undefined &#124; string |
`fields?` | EmbedField[] |
`color?` | undefined &#124; string |
`image?` | Buffer &#124; string |

**Returns:** *Promise<Message<>>*

### `Const` sendEmbed

▸ **sendEmbed**(`message`: AMessage | BaseMessage, `module?`: undefined | string, `title?`: undefined | string, `body?`: undefined | string, `thumbnail?`: undefined | string, `fields?`: EmbedField[], `color?`: undefined | string, `footer?`: undefined | object, `displayAuthor?`: undefined | false | true, `image?`: string | Buffer): *Promise<Message<>>*

*Defined in [src/interfaces/Client.ts:136](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/Client.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | AMessage &#124; BaseMessage |
`module?` | undefined &#124; string |
`title?` | undefined &#124; string |
`body?` | undefined &#124; string |
`thumbnail?` | undefined &#124; string |
`fields?` | EmbedField[] |
`color?` | undefined &#124; string |
`footer?` | undefined &#124; object |
`displayAuthor?` | undefined &#124; false &#124; true |
`image?` | string &#124; Buffer |

**Returns:** *Promise<Message<>>*

___

###  interfaces/helpers

• **interfaces/helpers**:

*Defined in [src/interfaces/helpers/Parse.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L1)*

###  ArgumentManager

• **ArgumentManager**:

*Defined in [src/interfaces/helpers/ArgumentManager.ts:76](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L76)*

Used to manage arguments. It parses arguments and generates usages dynamically.

**`export`** 

###  constructor

\+ **new ArgumentManager**(`command`: Command, `prefix`: string, `prompt?`: PromptManager, `message?`: Message, `argString?`: undefined | string): *ArgumentManager*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:85](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L85)*

Creates an instance of ArgumentManager.

**`memberof`** ArgumentManager

****

### Example
```js
const command = client.commands.get(commandName) || client.commands.find(command => command.aliases.includes(commandName));
const prefix = '?';
const prompt = new PromptManager(message, command.module, 5);
const argString = message.content.slice(prefix.length).trim().split(/ +/).join(' ');

const argManager = new ArgumentManager(command, prefix, prompt, message, argString);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`command` | Command | Used to generate arguments and usages. |
`prefix` | string | Used to generate usages. |
`prompt?` | PromptManager | - |
`message?` | Message | - |
`argString?` | undefined &#124; string | - |

**Returns:** *ArgumentManager*

### `Optional` argString

• **argString**? : *undefined | string*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:78](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L78)*

###  args

• **args**: *Argument[]*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:77](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L77)*

### `Readonly` argsCount

• **argsCount**: *number*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:80](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L80)*

### `Private` `Readonly` argsSingleQuotes

• **argsSingleQuotes**: *true* = true

*Defined in [src/interfaces/helpers/ArgumentManager.ts:84](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L84)*

### `Readonly` argsType

• **argsType**: *"multiple" | "single" | "none"*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:81](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L81)*

### `Private` command

• **command**: *Command*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:82](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L82)*

### `Optional` message

• **message**? : *Message*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:79](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L79)*

### `Private` `Readonly` prefix

• **prefix**: *string*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:85](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L85)*

### `Private` `Optional` prompt

• **prompt**? : *PromptManager*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:83](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L83)*

###  usage

• **usage**:

*Defined in [src/interfaces/helpers/ArgumentManager.ts:125](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L125)*

Returns dynamically generated usages string based on `this.command` and `this.args`;

**`readonly`** 

**`memberof`** ArgumentManager

###  parseArgs

▸ **parseArgs**(): *Promise<Args | void>*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:150](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L150)*

Returns object containing parsed arguments.

**`memberof`** ArgumentManager

****

### Example
```ts
const argManager = new ArgumentManager(command, prefix, prompt, message, argString);

const args = await argManager.parseArgs();
```

**Returns:** *Promise<Args | void>*

###  Parse

• **Parse**:

*Defined in [src/interfaces/helpers/Parse.ts:41](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L41)*

Used to parse strings into various values.

**`export`** 

###  constructor

\+ **new Parse**(`prompt`: PromptManager): *Parse*

*Defined in [src/interfaces/helpers/Parse.ts:48](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L48)*

Creates an instance of Parse.

**`memberof`** Parse

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prompt` | PromptManager | Prompt manager used to alert the user in case of an error. |

**Returns:** *Parse*

### `Private` prompt

• **prompt**: *PromptManager*

*Defined in [src/interfaces/helpers/Parse.ts:48](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L48)*

Used to alert the user in case of an error.

**`memberof`** Parse

###  bannedUser

▸ **bannedUser**(`guild`: Guild, `str`: string): *Promise<User | void>*

*Defined in [src/interfaces/helpers/Parse.ts:222](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L222)*

Returns banned user.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<User | void>*

###  boolean

▸ **boolean**(`str`: string): *Promise<boolean | void>*

*Defined in [src/interfaces/helpers/Parse.ts:111](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L111)*

Returns a parsed boolean.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *Promise<boolean | void>*

###  categoryChannel

▸ **categoryChannel**(`guild`: Guild, `str`: string): *Promise<CategoryChannel | void>*

*Defined in [src/interfaces/helpers/Parse.ts:371](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L371)*

Returns category channel.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<CategoryChannel | void>*

###  color

▸ **color**(`str`: string): *Promise<string | void>*

*Defined in [src/interfaces/helpers/Parse.ts:81](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L81)*

Returns a parsed HEX color string.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *Promise<string | void>*

###  guildChannel

▸ **guildChannel**(`guild`: Guild, `str`: string): *Promise<GuildChannel | void>*

*Defined in [src/interfaces/helpers/Parse.ts:292](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L292)*

Returns guildChannel

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<GuildChannel | void>*

###  image

▸ **image**(`message`: Message | AMessage, `str`: string): *Promise<string | void>*

*Defined in [src/interfaces/helpers/Parse.ts:158](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L158)*

Returns an imgur link based on image attachment or image link.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message &#124; AMessage |
`str` | string |

**Returns:** *Promise<string | void>*

###  member

▸ **member**(`guild`: Guild, `str`: string): *Promise<GuildMember | void>*

*Defined in [src/interfaces/helpers/Parse.ts:187](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L187)*

Returns guild member.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<GuildMember | void>*

###  number

▸ **number**(`str`: string): *Promise<number | void>*

*Defined in [src/interfaces/helpers/Parse.ts:66](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L66)*

Returns a parsed integer.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *Promise<number | void>*

###  role

▸ **role**(`guild`: Guild, `str`: string): *Promise<Role | void>*

*Defined in [src/interfaces/helpers/Parse.ts:257](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L257)*

Returns guild role.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<Role | void>*

###  snowflake

▸ **snowflake**(`str`: string): *Promise<string | void>*

*Defined in [src/interfaces/helpers/Parse.ts:126](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L126)*

Returns a parsed snowflake ID.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *Promise<string | void>*

###  textChannel

▸ **textChannel**(`guild`: Guild, `str`: string): *Promise<TextChannel | NewsChannel | void>*

*Defined in [src/interfaces/helpers/Parse.ts:413](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L413)*

Returns text channel.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<TextChannel | NewsChannel | void>*

###  timeLength

▸ **timeLength**(`str`: string): *Promise<number | void>*

*Defined in [src/interfaces/helpers/Parse.ts:141](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L141)*

Returns a parsed timelength in milliseconds.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *Promise<number | void>*

###  url

▸ **url**(`str`: string): *Promise<string | void>*

*Defined in [src/interfaces/helpers/Parse.ts:96](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L96)*

Returns a parsed URL string.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *Promise<string | void>*

###  voiceChannel

▸ **voiceChannel**(`guild`: Guild, `str`: string): *Promise<VoiceChannel | void>*

*Defined in [src/interfaces/helpers/Parse.ts:329](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L329)*

Returns voice channel.

**`memberof`** Parse

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`str` | string |

**Returns:** *Promise<VoiceChannel | void>*

###  PromptManager

• **PromptManager**:

*Defined in [src/interfaces/helpers/PromptManager.ts:27](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L27)*

###  constructor

\+ **new PromptManager**(`trigger`: AMessage, `module?`: undefined | string, `timeout?`: undefined | number): *PromptManager*

*Defined in [src/interfaces/helpers/PromptManager.ts:35](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`trigger` | AMessage |
`module?` | undefined &#124; string |
`timeout?` | undefined &#124; number |

**Returns:** *PromptManager*

### `Optional` GUI

• **GUI**? : *AMessage*

*Defined in [src/interfaces/helpers/PromptManager.ts:34](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L34)*

### `Readonly` channel

• **channel**: *TextChannel | DMChannel | NewsChannel*

*Defined in [src/interfaces/helpers/PromptManager.ts:29](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L29)*

### `Readonly` client

• **client**: *Client*

*Defined in [src/interfaces/helpers/PromptManager.ts:28](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L28)*

### `Optional` module

• **module**? : *undefined | string*

*Defined in [src/interfaces/helpers/PromptManager.ts:33](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L33)*

###  parse

• **parse**: *Parse*

*Defined in [src/interfaces/helpers/PromptManager.ts:35](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L35)*

###  timeout

• **timeout**: *number*

*Defined in [src/interfaces/helpers/PromptManager.ts:31](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L31)*

###  trigger

• **trigger**: *AMessage*

*Defined in [src/interfaces/helpers/PromptManager.ts:32](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L32)*

### `Readonly` user

• **user**: *User*

*Defined in [src/interfaces/helpers/PromptManager.ts:30](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L30)*

###  bannedUser

▸ **bannedUser**(`question`: string, `optional`: true): *Promise<User | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:552](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L552)*

Prompts the user for a banned user. Returns the user object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<User | "none" | void>*

▸ **bannedUser**(`question`: string, `optional?`: undefined | false): *Promise<User | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:554](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L554)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<User | void>*

###  boolean

▸ **boolean**(`question`: string): *Promise<boolean | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:314](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L314)*

Prompts to react with a yes/no format. Returns a boolean

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |

**Returns:** *Promise<boolean | void>*

###  categoryChannel

▸ **categoryChannel**(`question`: string, `optional`: true): *Promise<CategoryChannel | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:452](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L452)*

Prompts the user for a category channel. Returns the category channel object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<CategoryChannel | "none" | void>*

▸ **categoryChannel**(`question`: string, `optional?`: undefined | false): *Promise<CategoryChannel | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:454](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L454)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<CategoryChannel | void>*

###  color

▸ **color**(`question`: string, `optional`: true): *Promise<string | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:655](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L655)*

Prompts the user for a color. Returns hex string.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<string | "none" | void>*

▸ **color**(`question`: string, `optional?`: undefined | false): *Promise<string | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:657](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L657)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<string | void>*

###  delete

▸ **delete**(): *Promise<void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:119](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L119)*

Deletes the GUI

**`memberof`** PromptManager

**Returns:** *Promise<void>*

### `Private` done

▸ **done**(): *Promise<void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:108](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L108)*

Edits the GUI with a loading emote to indicate the current prompt is finished and the next one is loading.

**Returns:** *Promise<void>*

###  embed

▸ **embed**(`title?`: undefined | string, `body?`: undefined | string, `thumbnail?`: undefined | string, `fields?`: EmbedField[], `color?`: undefined | string, `footer?`: undefined | object, `displayAuthor?`: undefined | false | true, `image?`: string | Buffer): *Promise<Message<>>*

*Defined in [src/interfaces/helpers/PromptManager.ts:140](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L140)*

Sends an embed in the prompt channel with the given parameters.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`title?` | undefined &#124; string |
`body?` | undefined &#124; string |
`thumbnail?` | undefined &#124; string |
`fields?` | EmbedField[] |
`color?` | undefined &#124; string |
`footer?` | undefined &#124; object |
`displayAuthor?` | undefined &#124; false &#124; true |
`image?` | string &#124; Buffer |

**Returns:** *Promise<Message<>>*

###  emoji

▸ **emoji**(`question`: string): *Promise<void | GuildEmoji | ReactionEmoji>*

*Defined in [src/interfaces/helpers/PromptManager.ts:735](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L735)*

Prompts the user to react with a chosen emoji.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |

**Returns:** *Promise<void | GuildEmoji | ReactionEmoji>*

###  error

▸ **error**(`message`: string): *Promise<void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:96](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L96)*

Sends a new embed with the error message, then deletes the prompt.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string |   |

**Returns:** *Promise<void>*

###  guildChannel

▸ **guildChannel**(`question`: string, `optional`: true): *Promise<GuildChannel | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:485](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L485)*

Prompts the user for a guild channel. Returns the guild channel object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<GuildChannel | "none" | void>*

▸ **guildChannel**(`question`: string, `optional?`: undefined | false): *Promise<GuildChannel | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:487](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L487)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<GuildChannel | void>*

###  image

▸ **image**(`question`: string, `optional`: true): *Promise<string | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:620](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L620)*

Prompts the user for an image. Returns imgur link.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<string | "none" | void>*

▸ **image**(`question`: string, `optional?`: undefined | false): *Promise<string | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:622](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L622)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<string | void>*

### `Private` init

▸ **init**(): *Promise<AMessage>*

*Defined in [src/interfaces/helpers/PromptManager.ts:54](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L54)*

Initializes the prompt if there is no `this.GUI` with a loading emote, then returns the GUI message.

**`memberof`** PromptManager

**Returns:** *Promise<AMessage>*

###  member

▸ **member**(`question`: string, `optional`: true): *Promise<GuildMember | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:518](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L518)*

Prompts the user for a guild member. Returns the guild member object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<GuildMember | "none" | void>*

▸ **member**(`question`: string, `optional?`: undefined | false): *Promise<GuildMember | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:520](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L520)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<GuildMember | void>*

###  message

▸ **message**(`question`: string, `channel`: TextChannel | NewsChannel, `optional`: true): *Promise<AMessage | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:348](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L348)*

 Prompts the user for a messageID, returns the fetched message.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`channel` | TextChannel &#124; NewsChannel |
`optional` | true |

**Returns:** *Promise<AMessage | "none" | void>*

▸ **message**(`question`: string, `channel`: TextChannel | NewsChannel, `optional?`: undefined | false): *Promise<AMessage | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:350](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L350)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`channel` | TextChannel &#124; NewsChannel |
`optional?` | undefined &#124; false |

**Returns:** *Promise<AMessage | void>*

###  number

▸ **number**(`question`: string): *Promise<number | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:240](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L240)*

Prompts the user for a string response, returns a number (or a string if `string` is `true`)

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |

**Returns:** *Promise<number | void>*

▸ **number**(`question`: string, `string`: true): *Promise<string | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:242](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`string` | true |

**Returns:** *Promise<string | void>*

▸ **number**(`question`: string, `optional`: true): *Promise<number | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:244](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<number | "none" | void>*

▸ **number**(`question`: string, `string`: true, `optional`: true): *Promise<string | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:246](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`string` | true |
`optional` | true |

**Returns:** *Promise<string | "none" | void>*

▸ **number**(`question`: string, `string`: false, `optional`: true): *Promise<number | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:248](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L248)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`string` | false |
`optional` | true |

**Returns:** *Promise<number | "none" | void>*

###  options

▸ **options**(`question`: string, `options`: string[], `optional`: true): *Promise<OptionsResponse | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:694](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L694)*

Provides the user with a list of numbered options. Returns an object containing the index of the option as well as the option string.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`options` | string[] |
`optional` | true |

**Returns:** *Promise<OptionsResponse | "none" | void>*

▸ **options**(`question`: string, `options`: string[], `optional?`: undefined | false): *Promise<OptionsResponse | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:696](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L696)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`options` | string[] |
`optional?` | undefined &#124; false |

**Returns:** *Promise<OptionsResponse | void>*

###  role

▸ **role**(`question`: string, `optional`: true): *Promise<Role | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:586](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L586)*

Prompts the user for a role. Returns the role object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<Role | "none" | void>*

▸ **role**(`question`: string, `optional?`: undefined | false): *Promise<Role | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:588](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L588)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<Role | void>*

###  sendMsg

▸ **sendMsg**(`title?`: undefined | string, `body?`: undefined | string): *Promise<AMessage>*

*Defined in [src/interfaces/helpers/PromptManager.ts:72](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L72)*

Edits the GUI with the given title and body.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`title?` | undefined &#124; string |
`body?` | undefined &#124; string |

**Returns:** *Promise<AMessage>*

###  string

▸ **string**(`question`: string, `optional`: true): *Promise<string | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:210](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L210)*

Prompts the user for a string response.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<string | "none" | void>*

▸ **string**(`question`: string, `optional?`: undefined | false): *Promise<string | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:212](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<string | void>*

###  textChannel

▸ **textChannel**(`question`: string, `optional`: true): *Promise<TextChannel | NewsChannel | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:386](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L386)*

Prompts the user for a text channel. Returns the text channel object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<TextChannel | NewsChannel | "none" | void>*

▸ **textChannel**(`question`: string, `optional?`: undefined | false): *Promise<TextChannel | NewsChannel | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:388](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L388)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<TextChannel | NewsChannel | void>*

###  url

▸ **url**(`question`: string, `optional`: true): *Promise<string | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:281](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L281)*

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<string | "none" | void>*

▸ **url**(`question`: string, `optional?`: undefined | false): *Promise<string | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:283](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L283)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<string | void>*

###  voiceChannel

▸ **voiceChannel**(`question`: string, `optional`: true): *Promise<VoiceChannel | "none" | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:419](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L419)*

Prompts the user for a voice channel. Returns the voice channel object.

**`memberof`** PromptManager

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional` | true |

**Returns:** *Promise<VoiceChannel | "none" | void>*

▸ **voiceChannel**(`question`: string, `optional?`: undefined | false): *Promise<VoiceChannel | void>*

*Defined in [src/interfaces/helpers/PromptManager.ts:421](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L421)*

**Parameters:**

Name | Type |
------ | ------ |
`question` | string |
`optional?` | undefined &#124; false |

**Returns:** *Promise<VoiceChannel | void>*

###  Argument

• **Argument**:

*Defined in [src/interfaces/helpers/ArgumentManager.ts:60](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L60)*

**`export`** 

**`interface`** Argument

****

 ### Example
 ```js
 const arg = {
     name = "Member",
     key = "member",
     type = "guildMember",
     optional = true
 }
 ```

### `Optional` acceptedValues

• **acceptedValues**? : *string[]*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:67](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L67)*

### `Optional` cases

• **cases**? : *undefined | object*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:68](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L68)*

### `Optional` defaultVal

• **defaultVal**? : *undefined | string*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:66](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L66)*

### `Optional` description

• **description**? : *undefined | string*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:64](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L64)*

###  key

• **key**: *string*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:62](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L62)*

###  name

• **name**: *string*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:61](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L61)*

### `Optional` optional

• **optional**? : *undefined | false | true*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:65](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L65)*

###  type

• **type**: *valueType*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:63](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L63)*

###  Ban

• **Ban**:

*Defined in [src/interfaces/helpers/Parse.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L25)*

###  reason

• **reason**: *string*

*Defined in [src/interfaces/helpers/Parse.ts:26](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L26)*

###  user

• **user**: *User*

*Defined in [src/interfaces/helpers/Parse.ts:27](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L27)*

###  OptionsResponse

• **OptionsResponse**:

*Defined in [src/interfaces/helpers/PromptManager.ts:23](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L23)*

###  choice

• **choice**: *string*

*Defined in [src/interfaces/helpers/PromptManager.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L25)*

###  index

• **index**: *number*

*Defined in [src/interfaces/helpers/PromptManager.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/PromptManager.ts#L24)*

###  Arg

Ƭ **Arg**: *string | number | boolean | GuildMember | User | Role | VoiceChannel | GuildChannel | undefined*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:39](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L39)*

###  Args

Ƭ **Args**: *object*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:41](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L41)*

#### Type declaration:

* \[ **key**: *string*\]: Arg

### `Const` linkRegex

• **linkRegex**: *RegExp<>* = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

*Defined in [src/interfaces/helpers/Parse.ts:9](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L9)*

### `Const` bannedMemberFilterInexact

▸ **bannedMemberFilterInexact**(`search`: string): *(Anonymous function)*

*Defined in [src/interfaces/helpers/Parse.ts:30](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`search` | string |

**Returns:** *(Anonymous function)*

### `Const` channelFilterInexact

▸ **channelFilterInexact**(`search`: string): *(Anonymous function)*

*Defined in [src/interfaces/helpers/Parse.ts:17](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`search` | string |

**Returns:** *(Anonymous function)*

### `Const` memberFilterInexact

▸ **memberFilterInexact**(`search`: string): *(Anonymous function)*

*Defined in [src/interfaces/helpers/Parse.ts:11](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`search` | string |

**Returns:** *(Anonymous function)*

###  parseArgs

▸ **parseArgs**(`argString`: string, `argCount`: number, `allowSingleQuote`: boolean): *string[]*

*Defined in [src/interfaces/helpers/ArgumentManager.ts:24](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/ArgumentManager.ts#L24)*

Returns an array of strings parsed from an args string. If a group of text is surrounded with quotes (' or "), it will parse that into a single string.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`argString` | string | - |
`argCount` | number | - |
`allowSingleQuote` | boolean | true |

**Returns:** *string[]*

****
### Example
```js
const argString = 'Hello, there. My name is bob. "My favorite food is pizza." Bye.';

console.log(parseArgs(argString, 12)) // [ 'Hello,', 'there.', 'My', 'name', 'is', 'bob.', 'My favorite food is pizza.', 'Bye.' ]
```

### `Const` roleFilterInexact

▸ **roleFilterInexact**(`search`: string): *(Anonymous function)*

*Defined in [src/interfaces/helpers/Parse.ts:20](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/interfaces/helpers/Parse.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`search` | string |

**Returns:** *(Anonymous function)*

___

###  neko

• **neko**:

*Defined in [src/neko/index.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/neko/index.ts#L1)*

### `Const` neko

• **neko**: *NekoClient<>* = new client()

*Defined in [src/neko/index.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/neko/index.ts#L3)*

___

###  tasks

• **tasks**:

*Defined in [src/tasks/moderation.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/tasks/moderation.ts#L1)*

### `Const` task

• **task**: *CronJob<>* = new CronJob('*/60 * * * * *', checkGuilds)

*Defined in [src/tasks/moderation.ts:88](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/tasks/moderation.ts#L88)*

### `Const` checkGuilds

▸ **checkGuilds**(): *Promise<void>*

*Defined in [src/tasks/moderation.ts:6](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/tasks/moderation.ts#L6)*

**Returns:** *Promise<void>*

___

###  util

• **util**:

*Defined in [src/util/index.ts:1](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L1)*

### `Const` defaultBackgroundColor

• **defaultBackgroundColor**: *"#2b2929"* = "#2b2929"

*Defined in [src/util/canvas.ts:15](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L15)*

### `Let` defaultBackgroundImage

• **defaultBackgroundImage**: *Image*

*Defined in [src/util/canvas.ts:14](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L14)*

### `Const` defaultBackgroundImagePath

• **defaultBackgroundImagePath**: *string* = path.join(__dirname, `../../../assets/images/${config.backgroundImage}`)

*Defined in [src/util/canvas.ts:13](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L13)*

### `Const` defaultTextColor

• **defaultTextColor**: *"#FFFFFF"* = "#FFFFFF"

*Defined in [src/util/canvas.ts:16](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L16)*

### `Const` applyText

▸ **applyText**(`canvas`: Canvas, `text`: string, `font`: string, `fontSize`: number, `width`: number): *object*

*Defined in [src/util/canvas.ts:219](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | Canvas |
`text` | string |
`font` | string |
`fontSize` | number |
`width` | number |

**Returns:** *object*

* **font**: *string* = ctx.font

* **size**: *number* = x

### `Const` createMutedRole

▸ **createMutedRole**(`guild`: Guild): *Promise<Role<>>*

*Defined in [src/util/index.ts:84](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |

**Returns:** *Promise<Role<>>*

### `Const` drawCard

▸ **drawCard**(`guild`: Guild, `member`: GuildMember): *Promise<Buffer<>>*

*Defined in [src/util/canvas.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |
`member` | GuildMember |

**Returns:** *Promise<Buffer<>>*

### `Const` drawExampleCard

▸ **drawExampleCard**(`guild`: Guild): *Promise<Buffer<>>*

*Defined in [src/util/canvas.ts:274](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L274)*

**Parameters:**

Name | Type |
------ | ------ |
`guild` | Guild |

**Returns:** *Promise<Buffer<>>*

### `Const` fetch

▸ **fetch**(`requestInfo`: RequestInfo, `requestOptions?`: RequestInit): *Promise<any>*

*Defined in [src/util/index.ts:8](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`requestInfo` | RequestInfo |
`requestOptions?` | RequestInit |

**Returns:** *Promise<any>*

### `Const` fetchHaste

▸ **fetchHaste**(`key`: string): *Promise<any>*

*Defined in [src/util/hastebin.ts:14](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/hastebin.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise<any>*

### `Const` fetchNorris

▸ **fetchNorris**(): *Promise<any>*

*Defined in [src/util/index.ts:119](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L119)*

**Returns:** *Promise<any>*

### `Const` handleError

▸ **handleError**(`client`: Client, `err`: Error): *Promise<void>*

*Defined in [src/util/index.ts:25](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`err` | Error |

**Returns:** *Promise<void>*

### `Const` labelImage

▸ **labelImage**(`src`: string | Buffer, `label`: string, `fontSize`: number, `font`: string, `margin?`: undefined | number): *Promise<Buffer<>>*

*Defined in [src/util/canvas.ts:176](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | string &#124; Buffer |
`label` | string |
`fontSize` | number |
`font` | string |
`margin?` | undefined &#124; number |

**Returns:** *Promise<Buffer<>>*

### `Const` loadDefaultBackgroundImage

▸ **loadDefaultBackgroundImage**(): *Promise<void>*

*Defined in [src/util/canvas.ts:18](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L18)*

**Returns:** *Promise<void>*

### `Const` missingPermissions

▸ **missingPermissions**(`message`: Message, `permissions`: PermissionString[], `member?`: GuildMember | "self"): *undefined | ("CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS")[]*

*Defined in [src/util/index.ts:62](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Message |
`permissions` | PermissionString[] |
`member?` | GuildMember &#124; "self" |

**Returns:** *undefined | ("CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS")[]*

### `Const` nicerPermissions

▸ **nicerPermissions**(`perm`: PermissionString): *string*

*Defined in [src/util/index.ts:70](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`perm` | PermissionString |

**Returns:** *string*

### `Const` replace

▸ **replace**(`str`: string, `obj`: object): *string*

*Defined in [src/util/index.ts:77](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |
`obj` | object |

**Returns:** *string*

### `Const` roundRect

▸ **roundRect**(`ctx`: CanvasRenderingContext2D, `x`: number, `y`: number, `width`: number, `height`: number, `radius?`: undefined | number, `fill?`: undefined | false | true, `stroke?`: undefined | false | true): *void*

*Defined in [src/util/canvas.ts:238](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/canvas.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | CanvasRenderingContext2D |
`x` | number |
`y` | number |
`width` | number |
`height` | number |
`radius?` | undefined &#124; number |
`fill?` | undefined &#124; false &#124; true |
`stroke?` | undefined &#124; false &#124; true |

**Returns:** *void*

### `Const` style1

▸ **style1**(`guildName?`: undefined | string, `memberName?`: undefined | string, `avatarURL?`: undefined | string, `backgroundImage?`: undefined | string, `profileColor?`: undefined | string, `backgroundColor?`: undefined | string, `textColor?`: undefined | string): *Promise<Buffer>*

*Defined in [src/util/autumnforest.ts:3](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/autumnforest.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`guildName?` | undefined &#124; string |
`memberName?` | undefined &#124; string |
`avatarURL?` | undefined &#124; string |
`backgroundImage?` | undefined &#124; string |
`profileColor?` | undefined &#124; string |
`backgroundColor?` | undefined &#124; string |
`textColor?` | undefined &#124; string |

**Returns:** *Promise<Buffer>*

### `Const` toCamelCase

▸ **toCamelCase**(`str`: string): *undefined | string*

*Defined in [src/util/index.ts:40](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *undefined | string*

### `Const` trimString

▸ **trimString**(`str`: string, `n`: number): *string*

*Defined in [src/util/index.ts:20](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/index.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |
`n` | number |

**Returns:** *string*

### `Const` uploadHaste

▸ **uploadHaste**(`text`: string): *Promise<any>*

*Defined in [src/util/hastebin.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/hastebin.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *Promise<any>*

### `Const` uploadImgur

▸ **uploadImgur**(`img`: Buffer): *Promise<string | void>*

*Defined in [src/util/imgur.ts:4](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/util/imgur.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | Buffer |

**Returns:** *Promise<string | void>*
