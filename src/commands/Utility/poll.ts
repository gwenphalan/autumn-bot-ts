import { Command, AMessage } from '../../interfaces/Client';
import { Message } from 'discord.js';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

//const numEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

const callback = async (message: AMessage, _args: {}, prompt: PromptManager): Promise<void | Message> => {
    const e = message.client.constants.emotes;

    const letEmojis = [
        `<:letterTealA:${e.letterTealA}>`,
        `<:letterTealB:${e.letterTealB}>`,
        `<:letterTealC:${e.letterTealC}>`,
        `<:letterTealD:${e.letterTealD}>`,
        `<:letterTealE:${e.letterTealE}>`,
        `<:letterTealF:${e.letterTealF}>`,
        `<:letterTealG:${e.letterTealG}>`,
        `<:letterTealH:${e.letterTealH}>`,
        `<:letterTealI:${e.letterTealI}>`,
        `<:letterTealJ:${e.letterTealJ}>`,
        `<:letterTealK:${e.letterTealK}>`,
        `<:letterTealL:${e.letterTealL}>`,
        `<:letterTealM:${e.letterTealM}>`,
        `<:letterTealN:${e.letterTealN}>`,
        `<:letterTealO:${e.letterTealO}>`,
        `<:letterTealP:${e.letterTealP}>`,
        `<:letterTealQ:${e.letterTealQ}>`,
        `<:letterTealR:${e.letterTealR}>`,
        `<:letterTealS:${e.letterTealS}>`,
        `<:letterTealT:${e.letterTealT}>`,
        `<:letterTealU:${e.letterTealU}>`,
        `<:letterTealV:${e.letterTealV}>`,
        `<:letterTealW:${e.letterTealW}>`,
        `<:letterTealX:${e.letterTealX}>`,
        `<:letterTealY:${e.letterTealY}>`,
        `<:letterTealZ:${e.letterTealZ}>`
    ];

    const letEmojiIds = [
        e.letterTealA,
        e.letterTealB,
        e.letterTealC,
        e.letterTealD,
        e.letterTealE,
        e.letterTealF,
        e.letterTealG,
        e.letterTealH,
        e.letterTealI,
        e.letterTealJ,
        e.letterTealK,
        e.letterTealL,
        e.letterTealM,
        e.letterTealN,
        e.letterTealO,
        e.letterTealP,
        e.letterTealQ,
        e.letterTealR,
        e.letterTealS,
        e.letterTealT,
        e.letterTealU,
        e.letterTealV,
        e.letterTealW,
        e.letterTealX,
        e.letterTealY,
        e.letterTealZ
    ];

    const pollType = await prompt.options('What kind of poll would you like to make?', ['Yes / No', 'Multiple Options']);
    if (!pollType) return;

    const question = await prompt.string('What topic/question would you like to poll?');

    if (!question) return;

    if (pollType.index === 0) {
        prompt.delete();

        const msg = await prompt.embed(question, undefined, undefined, undefined, undefined, undefined, true);

        await msg.react(message.client.constants.emotes.upvote);
        await msg.react(message.client.constants.emotes.downvote);

        return message;
    }

    const amount = await prompt.number('What topic/question would you like to poll?');
    if (typeof amount !== 'number') return;

    if (amount > 20 || amount === 0) return prompt.error('Polls can only have 1-20 options!');

    const options: string[] = [];

    for (let i = 0; i < amount; i++) {
        const a = i + 1;

        const opt = await prompt.string(`What would you like question #${a} to be?`);
        if (!opt) return;

        options.push(opt);
    }

    const optsStrings = options.map((opt, i) => `${letEmojis[i]} - ${opt}`);

    const msg = await prompt.embed(question, optsStrings.join('\n\n'), undefined, undefined, undefined, undefined, true);

    const e1 = options.map((_opt, i) => letEmojiIds[i]);

    await Promise.all(e1.map(a => msg.react(a).catch(() => null)));

    return message;
};

export const command: Command = {
    name: 'poll',
    category: 'Utility',
    module: 'Polls',
    aliases: ['p'],
    description: 'Creates a poll and reacts to it with the corresponding emojis.',
    args: [],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: ['MANAGE_MESSAGES', 'ADD_REACTIONS'],
    botPermissions: ['ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'ADD_REACTIONS'],
    callback: callback
};
