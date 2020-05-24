import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { getBannedMember } from '../../util';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';

const callback = async (message: AMessage, args: string[]) => {
    if (!message.guild || !message.member) return;

    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild.id) : null;

    if (!guildSettings) return;

    const moderation = guildSettings.moderation;

    if (!moderation.enabled)
        return message.client.sendEmbed(
            message,
            'Moderation',
            'Uh Oh!',
            "Moderation isn't enabled on this server! A server administrator can turn it on with `{prefix}settings moderation enabled set true`"
        );

    const arg1 = args[0];

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}kick <User> [Reason]`');

    const user = await getBannedMember(message, args, 0);

    if (!user) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the banned user ${arg1}!`);

    const reason = args.slice(1).join(' ');

    message.client.sendEmbed(
        message,
        'Moderation',
        'Unbanned User',
        ` **• User:** ${user}\n **• Reason:** ${reason || 'No Reason Provided'}`,
        undefined,
        undefined,
        undefined
    );

    message.guild.members.unban(user.id);

    const modLog = message.guild.channels.cache.get(moderation.modLog);

    if (!modLog || !(modLog instanceof TextChannel)) return;

    return modLog.send(
        new MessageEmbed()
            .setAuthor('Moderation', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTitle('User Unbanned')
            .setDescription(` **• User:** ${user}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Unbanned By:** ${message.author}`)
            .setColor(message.client.config.accentColor)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'unban',
    category: 'Moderation',
    aliases: [],
    description: 'Bans the specified user from the server.',
    usage: '<User> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    callback: callback
};
