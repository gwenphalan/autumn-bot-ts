import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction, updateGuildSettings } from '../../database';
import { createMutedRole } from '../../util';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';
import prettyMs from 'pretty-ms';
import timestring from 'timestring';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, args: string[], prompt: PromptManager) => {
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

    const [arg1, arg2] = args;

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}mute <User> <Time> [Reason]`');

    if (!arg2) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `Time`', 'Command Usage:\n`{prefix}mute <User> <Time> [Reason]');

    const member = await prompt.parse.member(message.guild, args[0]);

    if (!member) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the user ${arg1}!`);

    if (!member.bannable) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I can't mute ${member}!`);

    let time: number | null = null;

    try {
        time = timestring(arg2, 'ms');
    } catch (err) {
        null;
    }

    if (!time) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `${arg2} is not a valid time!`);

    if (message.member.roles.highest.position < member.roles.highest.position)
        return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `You can't mute ${member}!`);

    const mutedRole = message.guild.roles.cache.get(guildSettings.moderation.mutedRole) || (await createMutedRole(message.guild));

    if (!message.guild.roles.cache.get(guildSettings.moderation.mutedRole)) {
        guildSettings.moderation.mutedRole = mutedRole.id;

        updateGuildSettings(message.guild.id, guildSettings);
    }

    const reason = args.slice(2).join(' ');

    member.roles.add(mutedRole);

    const infraction = await createInfraction(message, member.user.id, 'mute', reason || 'No Reason Provided', time);

    await member.send(
        new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
            .setTitle("You've been muted!")
            .setDescription(` **• Reason:** ${reason || 'No Reason Provided'}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );

    message.client.sendEmbed(
        message,
        'Moderation',
        'Muted User',
        ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Expires In:** ${prettyMs(time)}`,
        undefined,
        undefined,
        undefined,
        { text: `Case: ${infraction.case}` }
    );

    const modLog = message.guild.channels.cache.get(moderation.modLog);

    if (!modLog || !(modLog instanceof TextChannel)) return;

    return modLog.send(
        new MessageEmbed()
            .setAuthor('Moderation', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTitle('User Muted')
            .setDescription(
                ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Muted By:** ${message.author}\n **• Expires In:** ${prettyMs(
                    time
                )}`
            )
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'tempmute',
    category: 'Moderation',
    module: 'Moderation',
    aliases: [],
    description: 'Mutes the specified user from the server.',
    usage: '<User> <Time> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MUTE_MEMBERS'],
    botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
    callback: callback
};
