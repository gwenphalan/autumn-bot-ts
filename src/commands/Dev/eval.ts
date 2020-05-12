import { Message } from 'discord.js';
import { uploadHaste } from '../../util/hastebin';
import { Command, Client } from '../../interfaces/Client';

const callback = async (message: Message, args: string[]) => {
    // Define a bunch of shortcuts which will be usable in your eval code
    const client = message.client as Client;
    //@ts-ignore
    const msg = message,
        guild = message.guild,
        channel = message.channel,
        author = message.author,
        commands = client.commands,
        database = client.database;

    /* 
        Do some voodoo magic to evaluate the input and send it to your channel
        This supports the await keyword
        Please note that whatever you eval will run twice if you don't include a return keyword 
    */
    try {
        let output =
            (await eval(`( async () => {
            ${args.join(' ')}
          })()`)) ||
            (await eval(`( async () => {
            return ${args.join(' ')}
          })()`));

        if (typeof output !== 'string') output = require('util').inspect(output);
        if (output.length > 2000) return message.channel.send(await uploadHaste(output));

        return message.channel.send(output, { code: 'xl' }).catch(err => {
            return message.channel.send(err, { code: 'xl' });
        });
    } catch (err) {
        return message.channel.send(err, { code: 'xl' });
    }
};

export const command: Command = {
    name: 'eval',
    category: 'Dev',
    aliases: ['console', 'debug'],
    description: 'Used to run commands from discord',
    usage: '<code>',
    requiresArgs: 1,
    devOnly: true,
    guildOnly: false,
    userPermissions: '',
    botPermissions: '',
    callback: callback
};
