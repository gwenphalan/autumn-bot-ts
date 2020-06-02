import { Command, AMessage } from '../../interfaces/Client';
import { MessageAttachment } from 'discord.js';
import { drawCard, drawExampleCard } from '../../util/canvas';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (message: AMessage, args: string[], prompt: PromptManager) => {
    if (!message.guild || !message.member) return;
    const a = await prompt.parse.member(message.guild, args.join(' '));

    const member = a ? a : null;

    const buffer = member ? await drawCard(message.guild, member) : await drawExampleCard(message.guild);

    const attachment = new MessageAttachment(buffer, `${member ? member.id : 'example'}_welcome.png`);

    message.channel.send(attachment);
};

export const command: Command = {
    name: 'card',
    category: 'Dev',
    module: 'Dev',
    aliases: ['c'],
    description: 'Sends an example welcome card.',
    usage: '',
    requiresArgs: 0,
    devOnly: true,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['ATTACH_FILES', 'SEND_MESSAGES'],
    callback: callback
};
