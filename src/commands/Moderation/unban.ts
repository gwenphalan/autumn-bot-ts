import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { TextChannel, MessageEmbed, User } from 'discord.js';
import { client } from '../..';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, args: { user: User; reason?: string }, prompt: PromptManager) => {
    if (!message.guild || !message.member) return;

    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild.id) : null;

    if (!guildSettings) return;

    const moderation = guildSettings.moderation;

    if (!moderation.enabled)
        return prompt.error(
            "Moderation isn't enabled on this server! A server administrator can turn it on with `{prefix}settings moderation enabled set true`"
        );

    const user = args.user;
    const reason = args.reason;

    prompt.embed('Unbanned User', ` **• User:** ${user}\n **• Reason:** ${reason || 'No Reason Provided'}`, undefined, undefined, undefined);

    message.guild.members.unban(user.id);

    const modLog = moderation.modLog ? message.guild.channels.cache.get(moderation.modLog) : null;

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
    module: 'Moderation',
    aliases: [],
    description: 'Unbans the specified user from the server.',
    args: [
        {
            name: 'User',
            description: 'User that will be unbanned',
            key: 'user',
            type: 'bannedUser'
        },
        {
            name: 'Reason',
            description: 'Reason for unbanning',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    callback: callback
};
