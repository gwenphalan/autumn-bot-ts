import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction } from '../../database';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';
import prettyMs from 'pretty-ms';
import timestring from 'timestring';
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

    const [arg1, arg2] = args;

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}tempban <User> <Time> [Reason]`');

    if (!arg2) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `Time`', 'Command Usage:\n`{prefix}tempban <User> <Time> [Reason]');

    const member = await prompt.parse.member(message.guild, args[0]);

    if (!member) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the user ${arg1}!`);

    if (!member.bannable) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I can't ban ${member}!`);

    if (message.member.roles.highest.position < member.roles.highest.position)
        return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `You can't ban ${member}!`);

    let time: number | null = null;

    try {
        time = timestring(arg2, 'ms');
    } catch (err) {
        null;
    }

    if (!time) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `${arg2} is not a valid time!`);

    const reason = args.slice(2).join(' ');

    const infraction = await createInfraction(message, member.user.id, 'ban', reason || 'No Reason Provided', time);

    await member.send(
        new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
            .setTitle("You've been banned!")
            .setDescription(` **• Reason:** ${reason || 'No Reason Provided'}\n **• Expires In:** ${prettyMs(time)}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );

    member.ban({ reason: reason || 'No Reason Provided' });

    message.client.sendEmbed(
        message,
        'Moderation',
        'Banned User',
        ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Time:** ${prettyMs(time)}`,
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
            .setTitle('User Banned')
            .setDescription(
                ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Banned By:** ${message.author}\n **• Time:** ${prettyMs(time)}`
            )
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'tempban',
    category: 'Moderation',
    module: 'Moderation',
    aliases: [],
    description: 'Bans the targeted user from the server for the specified amount of time.',
    usage: '<User> <Time> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    callback: callback
};
