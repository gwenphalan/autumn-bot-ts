import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction } from '../../database';
import { getMember } from '../../util';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';
import prettyMs from 'pretty-ms';

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

    const [arg1] = args;

    if (!arg1) return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `User`', 'Command Usage:\n`{prefix}warn <User> [Reason]`');

    const member = await getMember(message, args, 0);

    if (!member) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `I couldn't find the user ${arg1}!`);

    if (message.member.roles.highest.position < member.roles.highest.position)
        return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `You can't warn ${member}!`);

    const time = guildSettings.moderation.warnExpire || 2592000000;

    const reason = args.slice(1).join(' ');

    const infraction = await createInfraction(message, member.user.id, 'warn', reason || 'No Reason Provided', time);

    member.send(
        new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
            .setTitle("You've been warned!")
            .setDescription(` **• Reason:** ${reason || 'No Reason Provided'}\n **• Expires In:** ${prettyMs(time)}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );

    message.client.sendEmbed(
        message,
        'Moderation',
        'Warned User',
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
            .setTitle('User Warned')
            .setDescription(
                ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Warned By:** ${message.author}\n **• Expires In:** ${prettyMs(
                    time
                )}`
            )
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'warn',
    category: 'Moderation',
    aliases: [],
    description: 'Warns the targeted user.',
    usage: '<User> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MUTE_MEMBERS'],
    botPermissions: [],
    callback: callback
};
