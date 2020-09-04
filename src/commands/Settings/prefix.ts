import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (message: AMessage, args: { prefix?: string }, prompt: PromptManager) => {
    if (!message.guild) return;
    const guildSettings = await getGuildSettings(message.guild.id);

    if (!args.prefix) return prompt.embed(`Your prefix is set to \`${guildSettings.general.prefix || message.client.config.defaultPrefix}\``);

    // Gets the guild's settings and set the prefix
    guildSettings.general.prefix = args.prefix;
    guildSettings.save();

    return prompt.embed(`Your prefix has been set to \`${args.prefix}\``);
};

export const command: Command = {
    name: 'prefix',
    category: 'Utility',
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
