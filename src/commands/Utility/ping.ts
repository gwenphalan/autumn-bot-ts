import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, _args: {}, _prompt: PromptManager) => {
    const msg = await message.channel.send('Pinging...');
    return msg.edit(`Pong! Took ${msg.createdTimestamp - message.createdTimestamp}ms`);
};

export const command: Command = {
    name: 'ping',
    category: 'Utility',
    module: 'Stats',
    aliases: [],
    description: 'Checks the ping',
    args: [],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
