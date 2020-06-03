[autumn-bot-ts](../README.md) › [Globals](../globals.md) › [](autumn_bot_ts.reflection-0.md) › [](autumn_bot_ts.reflection-0.reflection-1.md) › [](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md)

# Module:

## Index

### Variables

-   [client](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-client)
-   [commandPath](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-commandpath)
-   [dbl](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-dbl)
-   [listenerPath](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-listenerpath)
-   [server](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-server)
-   [taskPath](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-taskpath)

### Functions

-   [startTasks](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-starttasks)
-   [updateActivity](autumn_bot_ts.reflection-0.reflection-1.reflection-1808.md#const-updateactivity)

## Variables

### `Const` client

• **client**: _Client<>_ = new Client({
disableMentions: 'everyone',
presence: {
activity: {
name: `Bot Loading...`,
type: 'LISTENING',
url: 'https://www.twitch.tv/.'
}
},
partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})

_Defined in [src/index.ts:19](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L19)_

---

### `Const` commandPath

• **commandPath**: _string_ = path.join(\_\_dirname, './commands')

_Defined in [src/index.ts:55](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L55)_

---

### `Const` dbl

• **dbl**: _DBLAPI<>_ = new DBL(config.dblToken, client)

_Defined in [src/index.ts:38](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L38)_

---

### `Const` listenerPath

• **listenerPath**: _string_ = path.join(\_\_dirname, './events')

_Defined in [src/index.ts:54](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L54)_

---

### `Const` server

• **server**: _Server<>_ = net.createServer(socket => {
socket.on('data', async data => {
const a = await updateGuild(data);

        socket.write(JSON.stringify(a));
        socket.pipe(socket);
    });

})

_Defined in [src/index.ts:93](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L93)_

---

### `Const` taskPath

• **taskPath**: _string_ = path.join(\_\_dirname, './tasks')

_Defined in [src/index.ts:56](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L56)_

## Functions

### `Const` startTasks

▸ **startTasks**(): _void_

_Defined in [src/index.ts:74](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L74)_

**Returns:** _void_

---

### `Const` updateActivity

▸ **updateActivity**(): _Promise<undefined | Presence<>>_

_Defined in [src/index.ts:31](https://github.com/GwenBebe/autumn-bot-ts/blob/c2ba4cd/src/index.ts#L31)_

**Returns:** _Promise<undefined | Presence<>>_
