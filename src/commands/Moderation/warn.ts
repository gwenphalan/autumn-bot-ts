import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction } from '../../database';
import { TextChannel, MessageEmbed, GuildMember } from 'discord.js';
import { client } from '../..';
import prettyMs from 'pretty-ms';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, args: { member: GuildMember; reason?: string }, prompt: PromptManager) => {
    if (!message.guild || !message.member) return;

    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild.id) : null;

    if (!guildSettings) return;

    const moderation = guildSettings.moderation;

    if (!moderation.enabled)
        return prompt.error(
            "Moderation isn't enabled on this server! A server administrator can turn it on with `{prefix}settings moderation enabled set true`"
        );

    const member = args.member;

    if (member.id === message.author.id) return prompt.error("You can't warn yourself!");

    if (message.member.roles.highest.position <= member.roles.highest.position) return prompt.error(`You can't warn ${member}!`);

    const time = guildSettings.moderation.warnExpire || 2592000000;

    const reason = args.reason;

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

    prompt.embed(
        'Warned User',
        ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Time:** ${prettyMs(time)}`,
        undefined,
        undefined,
        undefined,
        { text: `Case: ${infraction.case}` }
    );

    const modLog = moderation.modLog ? message.guild.channels.cache.get(moderation.modLog) : null;

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
    module: 'Moderation',
    aliases: [],
    description: 'Warns the targeted user.',
    args: [
        {
            name: 'User',
            description: 'User that will be warned',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for warning',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MUTE_MEMBERS'],
    botPermissions: [],
    callback: callback
};
