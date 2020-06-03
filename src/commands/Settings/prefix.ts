import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, args: { prefix?: string }, _prompt: PromptManager) => {
    if (!message.guild) return;
    const guildSettings = await getGuildSettings(message.guild.id);

    if (!args.prefix)
        return message.client.sendEmbed(
            message,
            undefined,
            'Prefix',
            `Your prefix is set to \`${guildSettings.general.prefix || message.client.config.defaultPrefix}\``
        );

    // Gets the guild's settings and set the prefix
    guildSettings.general.prefix = args.prefix;
    guildSettings.save();

    return message.client.sendEmbed(message, undefined, 'Change Prefix', `Your prefix has been set to \`${args.prefix}\``);
};

export const command: Command = {
    name: 'prefix',
    category: 'Administration',
    module: 'Settings',
    description: 'Sets the prefix on this guild',
    aliases: [],
    args: [
        {
            name: 'Prefix',
            key: 'prefix',
            type: 'string',
            optional: true
        }
    ],
    devOnly: true,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    callback: callback
};
