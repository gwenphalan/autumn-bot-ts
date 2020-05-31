import { Command, AMessage, Question } from '../../interfaces/Client';
import { Message } from 'discord.js';

//const numEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

const callback = async (message: AMessage, _args: string[]): Promise<void | Message> => {
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

    const GUI = await message.channel.send(`<a:loading:${message.client.constants.emotes.aLoading}>`);

    const pollType = await message.client.sendOptions(GUI, message, 'What kind of poll would you like to make?', ['yes / no', 'multiple options']);

    if (pollType.canceled) {
        message.client.editEmbed(GUI, 'Polls', 'Poll Canceled');
        await GUI.delete({
            timeout: 5000
        }).catch(() => null);
        return message;
    }

    const questions: Question[] = [{ question: 'What topic/question would you like to poll?', type: 'string', optional: false }];

    if (pollType.index === 1) questions.push({ question: 'How many options would you like to have? (Max: 20)', type: 'number', optional: false });

    const res = await message.client.sendQuestions(GUI, message, questions);

    if (res.canceled) {
        message.client.editEmbed(GUI, 'Polls', 'Poll Canceled');
        await GUI.delete({
            timeout: 5000
        }).catch(() => null);
        return message;
    }

    const question = res.answers[0];
    const amount = res.answers[1];

    if (amount > 20 || amount === 0) {
        message.client.editEmbed(GUI, 'Uh Oh!', 'Polls can only have 1-20 options!');
        await GUI.delete({
            timeout: 5000
        }).catch(() => null);
        return message;
    }

    if (pollType.index === 0) {
        GUI.delete().catch(() => null);

        const msg = await message.client.sendEmbed(message, 'Polls', question, undefined, undefined, undefined, undefined, undefined, true);

        await msg.react(message.client.constants.emotes.upvote);
        await msg.react(message.client.constants.emotes.downvote);
        return message;
    }

    const opts: Question[] = [];

    for (let i = 0; i < amount; i++) {
        const a = i + 1;
        opts.push({ question: `What would you like option number #${a} to be?`, type: 'string', optional: false });
    }

    const res1 = await message.client.sendQuestions(GUI, message, opts);

    GUI.delete().catch(() => null);

    if (res1.canceled) {
        message.client.editEmbed(GUI, 'Polls', 'Poll Canceled');
        await GUI.delete({
            timeout: 5000
        }).catch(() => null);
        return message;
    }

    const options = res1.answers;

    const optsStrings: string[] = [];

    for (let i = 0; i < options.length; i++) {
        const num = letEmojis[i];

        optsStrings.push(`${num} - ${options[i]}`);
    }

    const msg = await message.client.sendEmbed(message, 'Polls', question, optsStrings.join('\n\n'), undefined, undefined, undefined, undefined, true);

    const e1: string[] = [];

    for (let i = 0; i < options.length; i++) {
        e1.push(letEmojiIds[i]);
    }

    await Promise.all(e1.map(a => msg.react(a).catch(() => null)));

    return message;
};

export const command: Command = {
    name: 'poll',
    category: 'Utility',
    aliases: ['p'],
    description: 'Creates a poll and reacts to it with the corresponding emojis.',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: ['MANAGE_MESSAGES', 'ADD_REACTIONS'],
    botPermissions: ['ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS'],
    callback: callback
};
