import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (_message: AMessage, _args: {}, prompt: PromptManager) => {
    const string = await prompt.string(`String`);
    if (!string) return;

    const textChannel = await prompt.textChannel(`Text Channel`);
    if (!textChannel) return;

    const voiceChannel = await prompt.voiceChannel(`Voice Channel`);
    if (!voiceChannel) return;

    const categoryChannel = await prompt.categoryChannel(`Category Channel`);
    if (!categoryChannel) return;

    const guildChannel = await prompt.guildChannel(`Guild Channel`);
    if (!guildChannel) return;

    const member = await prompt.member(`Member`);
    if (!member) return;

    const role = await prompt.role(`Role`);
    if (!role) return;

    const opts = ['Option 1', 'Option 2', 'Option 3'];

    const options = await prompt.options(`Options`, opts);
    if (!options) return;

    const color = await prompt.color(`Color`);
    if (!color) return;

    const emoji = await prompt.emoji(`Emoji`);
    if (!emoji) return;

    const image = await prompt.image(`Image`);
    if (!image) return;

    prompt.embed(
        "You're all done!",
        `String: ${string}\nTextChannel: ${textChannel}\nVoiceChannel: ${voiceChannel}\nCategoryChannel: ${categoryChannel}\nGuildChannel: ${guildChannel}\nMember: ${member}\nRole: ${role}\nOptions: ${
            options.choice
        }\nColor: ${color}\nEmoji: ${emoji.toString()}\nImage: ${image}`
    );

    prompt.delete();
};

export const command: Command = {
    name: 'prompt',
    category: 'Dev',
    module: 'Dev',
    aliases: ['pr'],
    description: 'Gives a series of sample prompts',
    args: [],
    devOnly: true,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['MANAGE_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS'],
    callback: callback
};
