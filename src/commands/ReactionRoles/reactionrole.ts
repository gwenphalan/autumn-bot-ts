import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, _args: {}, prompt: PromptManager) => {
    if (!message.guild) return;

    const channel = await prompt.textChannel('What channel with the reaction role be in?');
    if (!channel) return;

    const msg = await prompt.message('What is the message ID of the reaction message?', channel);
    if (!msg) return;

    const emoji = await prompt.emoji('What emoji would you like the reaction to be?');
    if (!emoji) return;

    const role = await prompt.role('What role would you like this reaction to give?');
    if (!role) return;

    prompt.delete();

    await msg.react(emoji);

    await message.guild.createReactionRole(msg.id, { name: emoji.name, id: emoji.id }, role.id);

    return prompt.embed('Reaction Role Created', ` • Role: ${role}\n • Channel: ${channel}\n • Reaction: ${emoji}\n • Message ID: ${msg.id}`);
};

export const command: Command = {
    name: 'reactionrole',
    category: 'Reaction Roles',
    module: 'Reaction Roles',
    aliases: ['rr'],
    description: 'Creates a message reaction that gives users the specified role.',
    args: [],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_ROLES', 'ADD_REACTIONS', 'EMBED_LINKS'],
    callback: callback
};
