import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction } from '../../database';
import { TextChannel, MessageEmbed, GuildMember } from 'discord.js';
import { client } from '../..';
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

    if (member.id === message.author.id) return prompt.error("You can't kick yourself!");

    if (message.member.roles.highest.position <= member.roles.highest.position) return prompt.error(`You can't kick ${member}!`);

    if (!member.kickable) return prompt.error(`I can't ban ${member}!`);

    const reason = args.reason;

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

    prompt.embed('Kicked User', ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}`, undefined, undefined, undefined, {
        text: `Case: ${infraction.case}`
    });

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
    args: [
        {
            name: 'User',
            description: 'User that will be kicked',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for kicking',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],
    callback: callback
};
