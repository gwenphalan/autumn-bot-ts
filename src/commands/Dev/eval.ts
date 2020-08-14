import { uploadHaste } from '../../util/hastebin';
import { Command, Client, AMessage } from '../../interfaces/Client';
import { MessageEmbed, Permissions } from 'discord.js';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, args: { code: string }, _prompt: PromptManager) => {
    // Define a bunch of shortcuts which will be usable in your eval code
    const client = message.client as Client;
    //@ts-ignore
    const msg = message,
        guild = message.guild,
        channel = message.channel,
        author = message.author,
        commands = client.commands,
        database = client.database,
        embed = MessageEmbed;

    //@ts-ignore
    const naia = true,
        adorable = true,
        ugly = false,
        gwen = false,
        cute = true,
        attractive = true,
        perms = Permissions;
    /* 
        Do some voodoo magic to evaluate the input and send it to your channel
        This supports the await keyword
        Please note that whatever you eval will run twice if you don't include a return keyword 
    */

    try {
        let output =
            (await eval(`( async () => {
            ${args.code}
          })()`)) ||
            (await eval(`( async () => {
            return ${args.code}
          })()`));

        if (typeof output !== 'string') output = require('util').inspect(output);
        if (output.length > 2000) {
            // const res = await uploadHaste(output);

            return message.channel.send(`https://hastebin.com/${await uploadHaste(output)}`);
        }

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
    module: 'Dev',
    aliases: ['console', 'debug'],
    description: 'Used to run commands from discord',
    args: [
        {
            name: 'Code',
            key: 'code',
            description: 'JavaScript code to run.',
            type: 'string'
        }
    ],
    devOnly: true,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
