import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { TextChannel, MessageEmbed, DMChannel } from 'discord.js';
import { client } from '../..';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, args: { amount: number; reason?: string }, prompt: PromptManager) => {
    if (!message.guild) return;

    const guildSettings = await getGuildSettings(message.guild.id);

    if (!guildSettings) return;

    const moderation = guildSettings.moderation;

    const channel = message.channel;

    if (channel instanceof DMChannel) return;

    if (!moderation.enabled)
        return prompt.error(
            "Moderation isn't enabled on this server! A server administrator can turn it on with `{prefix}settings moderation enabled set true`"
        );

    const amount = args.amount;
    const reason = args.reason;

    if (amount > 100) return prompt.error('I can only clear 100 messages at a time!');

    await message.delete({
        timeout: 100,
        reason: 'User Requested a Channel Clear'
    });

    const a = await channel.bulkDelete(amount, true).catch(() => null);

    const m = await prompt.embed(`Cleared ${a?.size || 0} messages.`);

    m.delete({
        timeout: 5000
    });

    const modLog = moderation.modLog ? message.guild.channels.cache.get(moderation.modLog) : null;

    if (!modLog || !(modLog instanceof TextChannel)) return;

    return modLog.send(
        new MessageEmbed()
            .setAuthor('Moderation', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTitle('Messages Cleared')
            .setDescription(
                ` **• Channel:** ${message.channel}\n **• Amount:** ${a?.size || 0}\n **• Reason:** ${reason || 'No Reason Provided'}\n **• Cleared By:** ${
                    message.author
                }`
            )
            .setColor(message.client.config.accentColor)
            .setTimestamp()
    );
};

export const command: Command = {
    name: 'clear',
    category: 'Moderation',
    module: 'Moderation',
    aliases: [],
    description: 'Clears up to 100 messages from a channel.',
    args: [
        {
            name: 'Amount (MAX: 100)',
            description: 'Amount of messages to be cleared. Max: 100',
            key: 'amount',
            type: 'number'
        },
        {
            name: 'Reason',
            description: 'Reason for clearing the messages.',
            key: 'reason',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    callback: callback
};
