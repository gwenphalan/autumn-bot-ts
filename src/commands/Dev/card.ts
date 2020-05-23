import { Command, AMessage } from '../../interfaces/Client';
import { MessageAttachment } from 'discord.js';
import { getMember } from '../../util';
//import { style1 } from '../../util/autumnforest';
import { drawCard, drawExampleCard } from '../../util/canvas';

const callback = async (message: AMessage, args: string[]) => {
    /*if (!message.guild || !message.member) return;
    const a = await getMember(message, args);

    const member = a ? a : null;

    const buffer = member
        ? await style1(message.guild.name, member.displayName, member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
        : await style1();

    const attachment = new MessageAttachment(buffer, `${member ? member.id : 'example'}_welcome.png`);

    message.channel.send(attachment);*/
    if (!message.guild || !message.member) return;
    const a = await getMember(message, args);

    const member = a ? a : null;

    const buffer = member ? await drawCard(message.guild, member) : await drawExampleCard(message.guild);

    const attachment = new MessageAttachment(buffer, `${member ? member.id : 'example'}_welcome.png`);

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
    userPermissions: [],
    botPermissions: ['ATTACH_FILES', 'SEND_MESSAGES'],
    callback: callback
};
