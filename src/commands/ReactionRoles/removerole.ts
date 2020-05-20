import { Command, AMessage } from '../../interfaces/Client';
import constants from '../../constants/constants';
import { TextChannel, GuildEmoji } from 'discord.js';
import { getReactionRoles } from '../../database';
import { client } from '../..';
import { ReactionRole } from '../../database/schemas/ReactionRoles';

const callback = async (message: AMessage, _args: string[]) => {
    if (!message.guild) return;

    const GUI = await message.channel.send(`<a:loading:${constants.emotes.aLoading}>`);

    const a = await message.client.sendQuestions(GUI, message, [
        { question: 'What channel is the reaction role in?', type: 'textChannel', optional: false },
        { question: 'What is the message ID of the reaction role?', type: 'snowflake', optional: false }
    ]);

    if (a.canceled) return message.client.editEmbed(GUI, 'Reaction Roles', 'Role Removal Canceled');

    const channel = a.answers[0];

    if (!(channel instanceof TextChannel)) return message.client.editEmbed(GUI, 'Reaction Roles', 'Uh Oh!', `${channel} is not a text channel!`);

    if (!channel) return;

    const messageID = a.answers[1];

    if (!messageID) return message.client.editEmbed(GUI, 'Reaction Roles', 'Role Removal Canceled');

    const msg = await channel.messages.fetch(messageID);

    if (!msg) return message.client.editEmbed(GUI, 'Reaction Roles', 'Uh Oh!', `I couldn't find a message with ID ${messageID} in ${channel}`);

    const reactionRoles = await getReactionRoles(message.guild.id, msg.id);

    if (!reactionRoles) return message.client.editEmbed(GUI, 'Reaction Roles', 'Uh Oh!', `Message with id ${msg.id} doesn't have any reaction roles!`);

    const options: string[] = [];

    reactionRoles.forEach(reactionRole => {
        const rrole = message.guild?.roles.cache.get(reactionRole.roleId);
        let emoji;

        if (!reactionRole.reaction.id) emoji = reactionRole.reaction.name;
        else emoji = client.emojis.cache.get(reactionRole.reaction.id);

        options.push(`${emoji} - ${rrole ? rrole : reactionRole.roleId}`);
    });

    const response = await message.client.sendOptions(GUI, message, 'Which reaction role would you like to remove', options);

    if (response.canceled) return message.client.editEmbed(GUI, 'Reaction Roles', 'Role Removal Canceled');

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

    return message.client.editEmbed(
        GUI,
        'Reaction Roles',
        'Reaction Role Removed',
        ` • Role: ${role || reactionRole.roleId}\n • Channel: ${channel}\n • Reaction: ${rEmoji}\n • Message ID: ${messageID}`
    );
};

export const command: Command = {
    name: 'removerole',
    category: 'Reaction Roles',
    aliases: [],
    description: 'Removes a reaction role from a message.',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_MESSAGES'],
    callback: callback
};
