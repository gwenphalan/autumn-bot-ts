import { Message } from 'discord.js';
import { Command } from '../../interfaces/Client';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (_message: Message, args: string[], _prompt: PromptManager) => {
    const error = args.join(' ');

    throw new Error(error || 'Intentional Error');
};

export const command: Command = {
    name: 'error',
    category: 'Dev',
    module: 'Dev',
    aliases: [],
    description: 'Intentionally Throws An Error',
    usage: '[Error]',
    requiresArgs: 0,
    devOnly: true,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
