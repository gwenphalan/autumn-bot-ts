import { Command, AMessage } from '../../interfaces/Client';
import { neko } from '../../neko/';
import { MessageEmbed, GuildMember } from 'discord.js';
import Color from 'color';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (message: AMessage, args: { member: GuildMember }, _prompt: PromptManager) => {
    if (!message.guild) return;

    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 100%, 80%)';

    const color = Color(pastel).hex();

    const member = args.member;

    const result = await neko.sfw.pat();

    message.channel.send(
        new MessageEmbed().setDescription(`*${message.member?.displayName} pats ${member.displayName}*`).setColor(color).setImage(result.url).setTimestamp()
    );
};

export const command: Command = {
    name: 'pat',
    category: 'Fun',
    module: 'Fun',
    aliases: [],
    description: 'Pats the targeted user.',
    args: [
        {
            name: 'User',
            description: 'User that will be patted.',
            key: 'member',
            type: 'guildMember'
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    callback: callback
};
