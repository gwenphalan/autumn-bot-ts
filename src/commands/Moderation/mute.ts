import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings, createInfraction, updateGuildSettings } from '../../database';
import { createMutedRole } from '../../util';
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

    if (!member.manageable) return prompt.error(`I can't mute ${member}!`);

    if (message.member.roles.highest.position < member.roles.highest.position) return prompt.error(`You can't mute ${member}!`);

    const mutedRole = message.guild.roles.cache.get(guildSettings.moderation.mutedRole) || (await createMutedRole(message.guild));

    if (!message.guild.roles.cache.get(guildSettings.moderation.mutedRole)) {
        guildSettings.moderation.mutedRole = mutedRole.id;

        updateGuildSettings(message.guild.id, guildSettings);
    }

    const reason = args.reason;

    member.roles.add(mutedRole);

    const infraction = await createInfraction(message, member.user.id, 'mute', reason || 'No Reason Provided');

    await member.send(
        new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
            .setTitle("You've been Muted!")
            .setDescription(` **• Reason:** ${reason || 'No Reason Provided'}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );

    prompt.embed('Muted User', ` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}`, undefined, undefined, undefined, {
        text: `Case: ${infraction.case}`
    });

    const modLog = message.guild.channels.cache.get(moderation.modLog);

    if (!modLog || !(modLog instanceof TextChannel)) return;

    return modLog.send(
        new MessageEmbed()
            .setAuthor('Moderation', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTitle('User Muted')
            .setDescription(` **• User:** ${member}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Muted By:** ${message.author}`)
            .setColor(message.client.config.accentColor)
            .setFooter(`Case: ${infraction.case}`)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'mute',
    category: 'Moderation',
    module: 'Moderation',
    aliases: [],
    description: 'Mutes the specified user from the server.',
    args: [
        {
            name: 'User',
            description: 'User that will be muted',
            key: 'member',
            type: 'guildMember'
        },
        {
            name: 'Reason',
            description: 'Reason for muting',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MUTE_MEMBERS'],
    botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
    callback: callback
};
