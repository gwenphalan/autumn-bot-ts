import { Message } from 'discord.js';
import { Command } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';

const callback = async (message: Message, args: string[]) => {
    if (!message.guild) return;

    // Gets the guild's settings and set the prefix
    const guildSettings = await getGuildSettings(message.guild.id);
    guildSettings.prefix = args.join(' ');
    guildSettings.save();

    return message.channel.send(`The prefix has successfully been updated to ${args.join(' ')}`);
};

export const command: Command = {
    name: 'setprefix',
    category: 'Settings',
    aliases: ['prefix'],
    description: 'Sets the prefix on this guild',
    usage: '<prefix>',
    requiresArgs: 1,
    devOnly: false,
    guildOnly: true,
    userPermissions: 'MANAGE_GUILD',
    botPermissions: '',
    callback: callback
};
