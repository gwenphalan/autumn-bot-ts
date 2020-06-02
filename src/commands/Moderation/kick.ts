import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction } from '../../database';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';
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

    const arg1 = args[0];

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}ban <User> [Reason]`');

    const member = await prompt.parse.member(message.guild, args[0]);

    if (!member) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the user ${arg1}!`);

    if (!member.kickable) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I can't ban ${member}!`);

    if (message.member.roles.highest.position < member.roles.highest.position)
        return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `You can't kick ${member}!`);

    const reason = args.slice(1).join(' ');

    const infraction = await createInfraction(message, member.user.id, 'kick', reason || 'No Reason Provided');

    await member.send(
        new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
            .setTitle("You've been kicked!")
            .setDescription(` **• Reason:** ${reason || 'No Reason Provided'}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );

    member.kick(reason || 'No Reason Provided').catch(() => null);

    message.client.sendEmbed(
        message,
        'Moderation',
        'Kicked User',
        ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}`,
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
            .setTitle('User Kicked')
            .setDescription(` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Kicked By:** ${message.author}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'kick',
    category: 'Moderation',
    module: 'Moderation',
    aliases: [],
    description: 'Kicks the specified user from the server.',
    usage: '<User> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],
    callback: callback
};
