import { Command, AMessage } from '../../interfaces/Client';
import { MessageAttachment, GuildMember } from 'discord.js';
import { drawCard, drawExampleCard } from '../../util/canvas';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (message: AMessage, args: { member: GuildMember }, _prompt: PromptManager) => {
    if (!message.guild || !message.member) return;
    const member = args.member ? args.member : null;

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
    args: [
        {
            name: 'Member',
            key: 'member',
            description: 'Guild Member displayed on the welcome card.',
            type: 'guildMember',
            optional: true
        }
    ],
    devOnly: true,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['ATTACH_FILES', 'SEND_MESSAGES'],
    callback: callback
};
