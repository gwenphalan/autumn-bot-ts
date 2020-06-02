import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../..';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (message: AMessage, args: string[], _prompt: PromptManager) => {
    if (!message.guild) return;

    const guildSettings = await getGuildSettings(message.guild.id);

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

    const amount = parseInt(arg1);

    if (!arg1)
        return message.client.sendEmbed(message, 'Moderation', 'Missing Arguments: `Amount`', 'Command Usage:\n`{prefix}clear <Amount (MAX: 100)> [Reason]`');

    if (!amount) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', `${arg1} is not a valid number!`);

    if (amount > 100) return message.client.sendEmbed(message, 'Moderation', 'Uh Oh!', 'I can only clear 100 messages at a time!');

    await message.delete({
        timeout: 100,
        reason: 'User Requested a Channel Clear'
    });

    const a = await message.channel.bulkDelete(amount, true).catch(() => null);

    const m = await message.client.sendEmbed(message, 'Moderation', `Cleared ${a?.size || 0} messages.`);

    m.delete({
        timeout: 5000
    });

    const reason = args.slice(1).join(' ');

    const modLog = message.guild.channels.cache.get(moderation.modLog);

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
    usage: '<amount (MAX: 100)> [Reason]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    callback: callback
};
