import { Message } from 'discord.js';
import { Command } from '../../interfaces/Client';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (_message: Message, args: { error?: string }, _prompt: PromptManager) => {
    throw new Error(args.error || 'Intentional Error');
};

export const command: Command = {
    name: 'error',
    category: 'Dev',
    module: 'Dev',
    aliases: [],
    description: 'Intentionally Throws An Error',
    args: [
        {
            name: 'Error',
            key: 'error',
            description: 'Error emitted.',
            type: 'string',
            optional: true
        }
    ],
    devOnly: true,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
