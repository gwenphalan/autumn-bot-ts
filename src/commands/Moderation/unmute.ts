import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, updateGuildSettings } from '../../database';
import { getMember, createMutedRole } from '../../util';
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

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}mute <User> [Reason]`');

    const member = await getMember(message, args, 0);

    if (!member) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the user ${arg1}!`);

    if (!member.manageable) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I can't unmute ${member}!`);

    const mutedRole = message.guild.roles.cache.get(guildSettings.moderation.mutedRole) || (await createMutedRole(message.guild));

    if (!message.guild.roles.cache.get(guildSettings.moderation.mutedRole)) {
        guildSettings.moderation.mutedRole = mutedRole.id;

        updateGuildSettings(message.guild.id, guildSettings);
    }

    const reason = args.slice(1).join(' ');

    if (!member.roles.cache.has(mutedRole.id)) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `${member} is not muted!`);

    member.roles.remove(mutedRole);

    await member.send(
        new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
            .setTitle("You've been unmuted!")
            .setDescription(` **• Reason:** ${reason || 'No Reason Provided'}`)
            .setColor(message.client.config.accentColor)
            .setTimestamp()
    );

    message.client.sendEmbed(
        message,
        'Moderation',
        'Unmuted User',
        ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}`,
        undefined,
        undefined,
        undefined
    );

    const modLog = message.guild.channels.cache.get(moderation.modLog);

    if (!modLog || !(modLog instanceof TextChannel)) return;

    return modLog.send(
        new MessageEmbed()
            .setAuthor('Moderation', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTitle('User Unmuted')
            .setDescription(` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Unmuted By:** ${message.author}`)
            .setColor(message.client.config.accentColor)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'unmute',
    category: 'Moderation',
    aliases: [],
    description: 'Mutes the specified user from the server.',
    usage: '<User> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MUTE_MEMBERS'],
    botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
    callback: callback
};
