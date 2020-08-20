import { Command, AMessage } from '../../interfaces/Client';
import { getReactionRoles } from '../../database';
import { client } from '../..';
import { ReactionRole } from '../../database/schemas/ReactionRoles';
import { GuildEmoji } from 'discord.js';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, _args: {}, prompt: PromptManager) => {
    if (!message.guild) return;

    const channel = await prompt.textChannel('What channel is the reaction role in?');
    if (!channel) return;

    const msg = await prompt.message('What is the message ID of the reaction role?', channel);
    if (!msg) return;

    const reactionRoles = await getReactionRoles(message.guild.id, msg.id);

    if (!reactionRoles) return prompt.error(`That message doesn't have any reaction roles!`);

    const options: string[] = [];

    reactionRoles.forEach(reactionRole => {
        const rrole = message.guild?.roles.cache.get(reactionRole.roleId);
        let emoji;

        if (!reactionRole.reaction.id) emoji = reactionRole.reaction.name;
        else emoji = client.emojis.cache.get(reactionRole.reaction.id);

        options.push(`${emoji} - ${rrole ? rrole : reactionRole.roleId}`);
    });

    const response = await prompt.options('Which reaction role would you like to remove?', options);
    if (!response) return;

    prompt.delete();

    const reactionRole = reactionRoles[response.index];

    let rEmoji: GuildEmoji | string | undefined;

    if (!reactionRole.reaction.id) rEmoji = reactionRole.reaction.name;
    else rEmoji = client.emojis.cache.get(reactionRole.reaction.id);

    await msg.reactions.cache
        .find(reaction => {
            return reaction.emoji.name === rEmoji || reaction.emoji === rEmoji;
        })
        ?.remove()
        .catch(() => null);

    await ReactionRole.deleteOne(reactionRoles[response.index]);

    const role = message.guild.roles.cache.get(reactionRole.roleId);

    return prompt.embed(
        'Reaction Role Removed',
        ` • Role: ${role || reactionRole.roleId}\n • Channel: ${channel}\n • Reaction: ${rEmoji}\n • Message ID: ${msg.id}`
    );
};

export const command: Command = {
    name: 'removerole',
    category: 'Utility',
    module: 'Reaction Roles',
    aliases: [],
    description: 'Removes a reaction role from a message.',
    args: [],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_MESSAGES'],
    callback: callback
};
