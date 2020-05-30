import { Command, AMessage } from '../../interfaces/Client';
import { MessageAttachment } from 'discord.js';

const callback = async (message: AMessage, _args: string[]) => {
    message.channel.send(new MessageAttachment('https://i.imgur.com/MN2q244.gif'));
};

export const command: Command = {
    name: 'kek',
    category: 'Fun',
    aliases: [''],
    description: 'Kek',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['ATTACH_FILES'],
    callback: callback
};
