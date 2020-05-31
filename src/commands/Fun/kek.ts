import { Command, AMessage } from '../../interfaces/Client';
import { MessageEmbed } from 'discord.js';
import { config } from '../../../config';

const callback = async (message: AMessage, _args: string[]) => {
    message.channel.send(new MessageEmbed().setImage('https://i.imgur.com/MN2q244.gif').setColor(config.accentColor));
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
