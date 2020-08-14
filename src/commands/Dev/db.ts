import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { client } from '../..';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, _args: {}, _prompt: PromptManager) => {
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
    module: 'Dev',
    aliases: [],
    description: '',
    args: [],
    devOnly: true,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
