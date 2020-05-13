import { Command, MyMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';

const callback = async (message: MyMessage, args: string[]) => {
    if (!message.guild) return;
    const guildSettings = await getGuildSettings(message.guild.id);

    if (!args[0])
        return message.client.sendEmbed(
            message,
            undefined,
            'Prefix',
            `Your prefix is set to \`${guildSettings.prefix || message.client.config.defaultPrefix}\``
        );

    // Gets the guild's settings and set the prefix
    guildSettings.prefix = args.join(' ');
    guildSettings.save();

    return message.client.sendEmbed(message, undefined, 'Change Prefix', `Your prefix has been set to \`${args.join(' ')}\``);
};

export const command: Command = {
    name: 'prefix',
    category: 'Utility',
    description: 'Sets the prefix on this guild',
    aliases: [],
    usage: '<prefix>',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    userPermissions: 'MANAGE_GUILD',
    botPermissions: '',
    callback: callback
};
