import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction } from '../../database';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';
import { PromptManager } from '../../helpers/PromptManager';

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

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}kick <User> [Reason]`');

    const member = await prompt.parse.member(message.guild, args[0]);

    if (!member) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the user ${arg1}!`);

    if (!member.bannable) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I can't ban ${member}!`);

    if (message.member.roles.highest.position < member.roles.highest.position)
        return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `You can't ban ${member}!`);

    const reason = args.slice(1).join(' ');

    const infraction = await createInfraction(message, member.user.id, 'ban', reason || 'No Reason Provided');

    message.client.sendEmbed(
        message,
        'Moderation',
        'Banned User',
        ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}`,
        undefined,
        undefined,
        undefined,
        { text: `Case: ${infraction.case}` }
    );

    member.ban({ reason: reason || 'No Reason Provided' }).catch(() => null);

    const modLog = message.guild.channels.cache.get(moderation.modLog);

    if (!modLog || !(modLog instanceof TextChannel)) return;

    return modLog.send(
        new MessageEmbed()
            .setAuthor('Moderation', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTitle('User Banned')
            .setDescription(` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Banned By:** ${message.author}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'ban',
    category: 'Moderation',
    module: 'Moderation',
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
