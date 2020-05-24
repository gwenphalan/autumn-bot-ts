import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { client } from '../..';

const callback = async (message: AMessage, _args: string[]) => {
    let i = 0;
    await Promise.all(
        client.guilds.cache.map(g => {
            getGuildSettings(g.id);
            i++;
        })
    );

    message.reply(`Updated ${i} Database Entries`);
};

export const command: Command = {
    name: 'db',
    category: 'Dev',
    aliases: [],
    description: '',
    usage: '',
    requiresArgs: 0,
    devOnly: true,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
