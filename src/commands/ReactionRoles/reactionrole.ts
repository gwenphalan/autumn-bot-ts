import { Command, AMessage, sendQuestions, Question } from '../../interfaces/Client';
import constants from '../../constants/constants';
import { TextChannel, Role, GuildEmoji, ReactionEmoji } from 'discord.js';
import { createReactionRole } from '../../database';
//import { createReactionRole } from '../../database';

const callback = async (message: AMessage, _args: string[]) => {
    if (!message.guild) return;

    const GUI = await message.channel.send(`<a:loading:${constants.emotes.aLoading}>`);

    const questions1: Question[] = [
        {
            question: 'What channel will the reaction role be in?',
            type: 'textChannel',
            optional: false
        },
        {
            question: 'What is the message ID of the reaction message?',
            type: 'snowflake',
            optional: false
        }
    ];

    const answers1 = await sendQuestions(GUI, message, questions1);

    if (answers1.canceled) return message.client.editEmbed(GUI, 'Reaction Roles', 'Reaction Role Canceled');

    const channel = answers1.answers[0];

    if (!(channel instanceof TextChannel)) return message.client.editEmbed(GUI, 'Uh Oh!', `${channel} is not a text channel!`);

    const msg = await channel.messages.fetch(answers1.answers[1]).catch(() => null);

    if (!msg) return message.client.editEmbed(GUI, 'Reaction Roles', 'Uh Oh!', `I couldn't find message with ID ${answers1.answers[1]} in ${channel}!`);

    const emoji = await message.client.getEmoji(GUI, message, 'What emoji would you like the reaction to be?');

    if (emoji === 'canceled') return message.client.editEmbed(GUI, 'Reaction Roles', 'Reaction Role Canceled');

    if (!(emoji instanceof GuildEmoji || emoji instanceof ReactionEmoji)) return message.client.editEmbed(GUI, 'Uh Oh!', `${emoji} is not a valid emoji!`);

    const questions2: Question[] = [
        {
            question: 'What role would you like this reaction to give?',
            type: 'role',
            optional: false
        }
    ];

    const answer2 = await message.client.sendQuestions(GUI, message, questions2);

    if (answer2.canceled) return message.client.editEmbed(GUI, 'Reaction Roles', 'Reaction Role Canceled');

    const role = answer2.answers[0];

    console.log(role);

    if (!(role instanceof Role)) return message.client.editEmbed(GUI, 'Uh Oh!', `${role} is not a role!`);

    GUI.edit(`<a:loading:${constants.emotes.aLoading}>`);

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
