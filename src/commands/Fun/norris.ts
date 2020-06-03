import { Command, AMessage } from '../../interfaces/Client';
import { fetchNorris } from '../../util';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, _args: {}, _prompt: PromptManager) => {
    const joke = await fetchNorris();

    message.client.sendEmbed(message, 'Chuck Norris', 'Chuck Norris', joke.value);
};

export const command: Command = {
    name: 'norris',
    category: 'Fun',
    module: 'Fun',
    aliases: ['chuck', 'chuck-norris'],
    description: "Chuck Norris doesn't send bot commands. He is the bot command",
    args: [],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES'],
    callback: callback
};
