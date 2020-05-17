import { Command, AMessage } from '../../interfaces/Client';
import { drawCard, labelImage, drawExampleCard } from '../../util/canvas';
import { MessageAttachment } from 'discord.js';
import { getMember } from '../../util';

const callback = async (message: AMessage, args: string[]) => {
    if (!message.guild || !message.member) return;
    const a = await getMember(message, args);

    const member = a ? a : null;

    const buffer = member ? await drawCard(message.guild, member) : await drawExampleCard(message.guild);

    const label = await labelImage(buffer, 'Example Card', 20, 'Poppins Light', 15);

    const attachment = new MessageAttachment(label, `${member ? member.id : 'example'}_welcome.png`);

    message.channel.send(attachment);
};

export const command: Command = {
    name: 'card',
    category: 'Dev',
    aliases: ['c'],
    description: 'Sends an example welcome card.',
    usage: '',
    requiresArgs: 0,
    devOnly: true,
    guildOnly: true,
    NSFW: false,
    userPermissions: '',
    botPermissions: 'ATTACH_FILES',
    callback: callback
};
