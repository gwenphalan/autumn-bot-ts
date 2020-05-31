import { Command, AMessage } from '../../interfaces/Client';
import prettyMs from 'pretty-ms';
// import { dbl } from '../..';
import { MessageEmbed } from 'discord.js';

const callback = async (message: AMessage, _args: string[]) => {
    const uptime = prettyMs(process.uptime() * 1000);
    const users = message.client.users.cache.size;
    const guilds = message.client.guilds.cache.size;
    const channels = message.client.channels.cache.size;

    const embed = new MessageEmbed()
        .setTimestamp()
        .setColor(message.client.config.accentColor)
        .setTitle('Autumn Bot Stats')
        .setDescription(
            `• Uptime: ${uptime}\n• Guilds: ${guilds}\n• Channels: ${channels}\n • Users: ${users}\n\n• Invite: http://autm.fr/autumnbot\n\n• Support Server: http://autm.fr/autumnbotsupport`
        );

    message.channel.send(embed);
};

export const command: Command = {
    name: 'stats',
    category: 'Utility',
    aliases: [],
    description: 'Gives you the bots stats.',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
    callback: callback
};
