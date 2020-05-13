import { Message } from 'discord.js';
import { Command } from '../../interfaces/Client';

const callback = async (_message: Message, args: string[]) => {
    const error = args.join(' ');

    throw new Error(error || 'Intentional Error');
};

export const command: Command = {
    name: 'error',
    category: 'Dev',
    aliases: [],
    description: 'Intentionally Throws An Error',
    usage: '[Error]',
    requiresArgs: 0,
    devOnly: true,
    guildOnly: false,
    userPermissions: '',
    botPermissions: '',
    callback: callback
};
