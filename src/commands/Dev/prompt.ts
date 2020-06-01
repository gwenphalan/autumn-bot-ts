import { Command, AMessage } from '../../interfaces/Client';

const callback = async (message: AMessage, _args: string[]) => {
    const prompt = new message.client.PromptManager(message.client, message.author, message.channel, 'Prompts');

    const string = await prompt.string(`What is your favorite food?`, 1);
    if (!string) return;

    prompt.delete();

    message.client.sendEmbed(message, 'Prompts', "You're all done!", `Food: ${string}`);
};

export const command: Command = {
    name: 'prompt',
    category: 'Dev',
    aliases: ['pr'],
    description: 'Gives a series of sample prompts',
    usage: '',
    requiresArgs: 0,
    devOnly: true,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['MANAGE_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS'],
    callback: callback
};
