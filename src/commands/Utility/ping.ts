import { Command, AMessage } from '../../interfaces/Client';

const callback = async (message: AMessage, _args: string[]) => {
    const msg = await message.channel.send('Pinging...');
    return msg.edit(`Pong! Took ${msg.createdTimestamp - message.createdTimestamp}ms`);
};

export const command: Command = {
    name: 'ping',
    category: 'Utility',
    aliases: [],
    description: 'Checks the ping',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
