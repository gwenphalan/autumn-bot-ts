import { Command, AMessage } from '../../interfaces/Client';
import { neko } from '../../neko/';
import { getMember } from '../../util';
import { MessageEmbed } from 'discord.js';
import Color from 'color';

const callback = async (message: AMessage, args: string[]) => {
    if (!message.guild) return;

    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 100%, 80%)';

    const color = Color(pastel).hex();

    const member = await getMember(message, args, 0);

    if (!member) return;

    const result = await neko.sfw.cuddle();

    message.channel.send(new MessageEmbed().setDescription(`*${message.author} cuddles ${member}*`).setColor(color).setImage(result.url).setTimestamp());
};

export const command: Command = {
    name: 'cuddle',
    category: 'Fun',
    aliases: [],
    description: 'Cuddles the targeted user.',
    usage: '<user>',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    callback: callback
};
