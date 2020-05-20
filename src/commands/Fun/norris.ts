import { Command, AMessage } from '../../interfaces/Client';
import { fetchNorris } from '../../util';

const callback = async (message: AMessage, _args: string[]) => {
    const joke = await fetchNorris();

    message.client.sendEmbed(message, 'Chuck Norris', 'Chuck Norris', joke.value, joke.icon_url);
};

export const command: Command = {
    name: 'norris',
    category: 'Fun',
    aliases: ['chuck', 'chuck-norris'],
    description: "Chuck Norris doesn't send bot commands. He is the bot command",
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES'],
    callback: callback
};
