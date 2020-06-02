import { Command, AMessage } from '../../interfaces/Client';
import constants from '../../constants/constants';
import { createReactionRole } from '../../database';
import { PromptManager } from '../../interfaces/helpers/PromptManager';
//import { createReactionRole } from '../../database';

const callback = async (message: AMessage, _args: string[], prompt: PromptManager) => {
    if (!message.guild) return;

    const GUI = await message.channel.send(`<a:loading:${constants.emotes.aLoading}>`);

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

    await createReactionRole(message.guild.id, msg.id, { name: emoji.name, id: emoji.id }, role.id);

    return message.client.editEmbed(
        GUI,
        'Reaction Roles',
        'Reaction Role Created',
        ` • Role: ${role}\n • Channel: ${channel}\n • Reaction: ${emoji}\n • Message ID: ${msg.id}`
    );
};

export const command: Command = {
    name: 'reactionrole',
    category: 'Reaction Roles',
    module: 'Reaction Roles',
    aliases: ['rr'],
    description: 'Creates a message reaction that gives users the specified role.',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_ROLES', 'ADD_REACTIONS', 'EMBED_LINKS'],
    callback: callback
};
