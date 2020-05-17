import { Client as DClient, Collection, Message as BaseMessage, PermissionString, MessageEmbed, MessageReaction, User, MessageAttachment } from 'discord.js';
import { config } from '../../config';
import { database } from '../database';
import { client } from '../index';
import { format, parseType, replace } from '../util';
import { getGuildSettings } from '../database';
import { valueType } from '../interfaces/SettingsGroup';
import constants from '../constants/constants';

// Our custom client adding new properties to the Discord Client
export class Client extends DClient {
    commands: Collection<string, Command> = new Collection(); // Our commands
    config = config; // Store the config on the client for ease of access
    database = database; // Store the database on the client for ease of access
    constants = constants;
    sendOptions = sendOptions;
    sendConfirm = sendConfirm;
    sendEmbed = sendEmbed;
    sendQuestions = sendQuestions;
    sendYesNo = sendYesNo;
    editEmbed = editEmbed;
    settings = getGuildSettings;
}

export interface Command {
    name: string; // The name of the command
    category: string; // The category of this command, used to separate commands in the help command
    description: string; // The description of the command
    usage: string; // How to use this command
    aliases: string[]; // The aliases of this command, these can be used instead of the name
    requiresArgs: number; // How many args this command requires
    devOnly: boolean; // Whether this command should only be usable by developers
    guildOnly: boolean; // Whether this command should only be usable on a guild
    NSFW: boolean;
    userPermissions: '' | PermissionString;
    botPermissions: '' | PermissionString;
    callback(message: BaseMessage, args: string[]): Promise<void | BaseMessage>; // The command function
}

export interface AMessage extends BaseMessage {
    client: Client;
}
// Client events, no need to touch these unless new events are added to discord.js
export type ClientEventTypes =
    | 'channelCreate'
    | 'channelDelete'
    | 'channelPinsUpdate'
    | 'channelUpdate'
    | 'debug'
    | 'warn'
    | 'disconnect'
    | 'emojiCreate'
    | 'emojiDelete'
    | 'emojiUpdate'
    | 'error'
    | 'guildBanAdd'
    | 'guildBanRemove'
    | 'guildCreate'
    | 'guildDelete'
    | 'guildUnavailable'
    | 'guildIntegrationsUpdate'
    | 'guildMemberAdd'
    | 'guildMemberAvailable'
    | 'guildMemberRemove'
    | 'guildMembersChunk'
    | 'guildMemberSpeaking'
    | 'guildMemberUpdate'
    | 'guildUpdate'
    | 'inviteCreate'
    | 'inviteDelete'
    | 'message'
    | 'messageDelete'
    | 'messageReactionRemoveAll'
    | 'messageReactionRemoveEmoji'
    | 'messageDeleteBulk'
    | 'messageReactionAdd'
    | 'messageReactionRemove'
    | 'messageUpdate'
    | 'presenceUpdate'
    | 'rateLimit'
    | 'ready'
    | 'invalidated'
    | 'roleCreate'
    | 'roleDelete'
    | 'roleUpdate'
    | 'typingStart'
    | 'userUpdate'
    | 'voiceStateUpdate'
    | 'webhookUpdate'
    | 'shardDisconnect'
    | 'shardError'
    | 'shardReady'
    | 'shardReconnecting'
    | 'shardResume';

type EmbedField = {
    name: string;
    value: any;
    inline?: boolean;
};

// src/interfaces/Client.ts
export const editEmbed = async (
    message: AMessage | BaseMessage,
    module?: string,
    title?: string,
    body?: string,
    thumbnail?: string,
    fields?: EmbedField[],
    color?: string,
    image?: Buffer | string
) => {
    const embedPermission = checkPerm(message, 'EMBED_LINKS');

    const embed = new MessageEmbed().setTimestamp().setColor(color ? color : config.accentColor);

    module ? embed.setAuthor(module, client.user?.displayAvatarURL({ dynamic: true, format: 'png' })) : null;
    title ? embed.setTitle(title) : null;
    body ? embed.setDescription(body) : null;
    thumbnail ? embed.setThumbnail(thumbnail) : null;
    fields?.forEach(field => embed.addField(field.name, field.value, field.inline));

    if (image) {
        const attachment = new MessageAttachment(image, 'attachment.png');

        embed.attachFiles([attachment]);
        embed.setImage('attachment://attachment.png');
    }

    let fieldString = '';
    fields?.forEach(field => (fieldString += `\n\n**${field.name}**\n${field.value}`));
    const text = `**${title}**${body ? `\n\n${body}` : ''}${fieldString}`;

    return await message.edit(embedPermission ? embed : text);
};

export const sendEmbed = async (
    message: AMessage | BaseMessage,
    module?: string,
    title?: string,
    body?: string,
    thumbnail?: string,
    fields?: EmbedField[],
    color?: string,
    footer?: {
        text: any;
        iconURL?: string;
    },
    displayAuthor?: boolean,
    image?: string | Buffer
) => {
    const embedPermission = checkPerm(message, 'EMBED_LINKS');

    const guildSettings = message.guild ? await getGuildSettings(message.guild?.id) : null;

    const embed = new MessageEmbed().setTimestamp().setColor(color ? color : config.accentColor);

    const prefix = guildSettings?.general.prefix;

    const placeholders: { [prop: string]: string } = {
        guildName: message.guild ? message.guild.name : message.author.username,
        username: message.author.username,
        defaultPrefix: config.defaultPrefix,
        prefix: prefix ? prefix : config.defaultPrefix
    };

    footer ? embed.setFooter(replace(footer.text, placeholders), footer.iconURL) : null;

    displayAuthor
        ? embed.setFooter(
              `Requested By ${message.author.username}#${message.author.discriminator}`,
              message.author.displayAvatarURL({ dynamic: true, format: 'png' })
          )
        : null;

    module ? embed.setAuthor(replace(module, placeholders), client.user?.displayAvatarURL({ dynamic: true, format: 'png' })) : null;

    title ? embed.setTitle(replace(title, placeholders)) : null;

    body ? embed.setDescription(replace(body, placeholders)) : null;

    thumbnail ? embed.setThumbnail(thumbnail) : null;

    fields?.forEach(field => embed.addField(replace(field.name, placeholders), replace(field.value, placeholders), field.inline));

    if (image) {
        const attachment = new MessageAttachment(image, 'attachment.png');

        embed.attachFiles([attachment]);
        embed.setImage('attachment://attachment.png');
    }

    let fieldString = '';
    fields?.forEach(field => (fieldString += `\n\n**${replace(field.name, placeholders)}**\n${replace(field.value, placeholders)}`));
    const text = `${title ? `***${replace(title, placeholders)}*` : ''}${body ? `\n\n${replace(body, placeholders)}` : ''}${fieldString}`;

    return await message.channel.send(embedPermission ? embed : text);
};

export const sendOptions = async (message: AMessage | BaseMessage, user: User, question: string, options: string[]) => {
    let choice;
    let canceled = false;
    let choiceIndex = 0;

    let choiceString = '';
    let invalid = false;

    options.forEach((option, index) => {
        choiceString += `\`${index}\`: ${option}\n`;
    });

    for (let x = 0; x < 3; x++) {
        if (canceled) {
            return {
                choice: choice,
                canceled: canceled,
                index: 0
            };
        } else if (invalid && choice && !parseType('number', choice)) {
            const retry = await tryAgain(message, user, choice, 'number');

            if (retry) {
                choice = '';
            } else {
                choice = '';
                canceled = true;
            }
        } else if (choice) {
            break;
        } else {
            await editEmbed(
                message,
                'Options',
                `${question}`,
                `Choose one of the options by replying with the number of the option.\n\n${choiceString}\nReply with \`cancel\` to cancel.`
            );

            const filter = (msg: AMessage) => {
                return msg.author.id === user.id;
            };

            const value = (await message.channel.awaitMessages(filter, { max: 1, time: 60000 })).first();

            await message.edit(`<a:loading:${constants.emotes.aLoading}>`);

            const reply = value?.content ? value.content : 'cancel';

            if (reply === 'cancel') {
                choice = '';
                canceled = true;
            }

            if (value) {
                value
                    .delete({
                        timeout: 10
                    })
                    .catch(() => null);
            }

            if (!parseType('number', reply)) {
                invalid = true;
                choice = reply;
            } else {
                const index = parseType('number', reply) ? parseInt(reply) : 0;
                choiceIndex = index;

                choice = options[index];
                break;
            }
        }
    }
    return {
        choice: choice,
        canceled: canceled,
        index: choiceIndex
    };
};

export const checkPerm = (message: AMessage | BaseMessage, permission: PermissionString) => {
    if (!client.user?.id) return false;
    const member = message?.guild?.members.cache.get(client.user.id);
    if (!member) return false;
    if (message.member && message.channel.type === 'text') {
        if (!message.channel.permissionsFor(member)?.has(permission)) return false;
    }
    return true;
};

interface Question {
    question: string;
    type: format;
    optional: boolean;
}

/**
 * * sendQuestions method requires a message already exist.
 * @param message GUI message that will be edited with the questions.
 * @param user User who is being asked the questions.
 * @param questions Array of Question objects that will be asked.
 */
export const sendQuestions = async (message: AMessage | BaseMessage, user: User, questions: Question[]) => {
    const answers: string[] = [];
    let canceled = false;
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        let answer;
        for (let x = 0; x < 3; x++) {
            if (canceled) {
                answers.push(answer ? answer : '');
                return {
                    answers: answers,
                    canceled: canceled
                };
            } else if ((answer && parseType(question.type, answer)) || (question.optional && answer && answer === 'none')) {
                answer = question.optional && answer && answer === 'none' ? answer : parseType(question.type, answer);
                answers.push(answer ? answer : '');
                break;
            } else if (
                (question.optional && answer && answer !== 'none' && !parseType(question.type, answer)) ||
                (!question.optional && answer && !parseType(question.type, answer))
            ) {
                const retry = await tryAgain(message, user, answer, question.type);

                if (retry) {
                    answer = '';
                } else {
                    canceled = true;
                }
            } else {
                await editEmbed(
                    message,
                    'Questions',
                    `${question.question}`,
                    `${question.optional ? '\n\n Reply with `none` if you wish to leave this blank.' : ''}${
                        question.type === 'hexColor' ? '\n\n • [Adobe Color Picker](https://color.adobe.com/create)' : ''
                    }\n\nReply with your answer, or \`cancel\` to cancel.`
                );

                const filter = (msg: AMessage) => {
                    return msg.author.id === user.id;
                };

                const value = (await message.channel.awaitMessages(filter, { max: 1, time: 120000 })).first();

                await message.edit(`<a:loading:${constants.emotes.aLoading}>`);

                answer = value?.content ? value.content : 'cancel';

                if (answer === 'cancel') {
                    answer = '';
                    canceled = true;
                }

                if (value)
                    value
                        .delete({
                            timeout: 10
                        })
                        .catch(() => null);
            }
        }
    }
    return {
        answers: answers,
        canceled: canceled
    };
};

export const sendConfirm = async (message: AMessage | BaseMessage, user: User, question: string) => {
    await editEmbed(message, 'Confirmation', 'Hold on a sec!', `${question}`);

    await message.react('709981119721766955');
    await message.react('709981096066023444');

    const filter = (reaction: MessageReaction, reactionUser: User) =>
        ['709981119721766955', '709981096066023444'].includes(reaction.emoji.id || reaction.emoji.name) && reactionUser.id === user.id;

    const answer = (await message.awaitReactions(filter, { max: 1, time: 60000 })).first();

    await message.edit(`<a:loading:${constants.emotes.aLoading}>`);

    switch (answer?.emoji.id || answer?.emoji.name) {
        case '709981119721766955':
            message.reactions.removeAll();
            return true;
        case '709981096066023444':
            message.reactions.removeAll();
            return false;
        default:
            message.reactions.removeAll();
            return false;
    }
};
export const sendYesNo = async (message: AMessage | BaseMessage, user: User, question: string) => {
    await editEmbed(message, 'Yes/No', `${question}`, `\nReact with <:leave:${constants.emotes.leave}> to cancel.`);
    let reply = false;
    let canceled = false;

    await message.react(constants.emotes.yes);
    await message.react(constants.emotes.no);
    await message.react(constants.emotes.leave);

    const filter = (reaction: MessageReaction, reactionUser: User) =>
        [constants.emotes.yes, constants.emotes.no, constants.emotes.leave].includes(reaction.emoji.id || reaction.emoji.name) && reactionUser.id === user.id;

    const answer = (await message.awaitReactions(filter, { max: 1, time: 60000 })).first();

    await message
        .delete({
            timeout: 10
        })
        .catch(() => null);

    switch (answer?.emoji.id || answer?.emoji.name) {
        case constants.emotes.yes:
            reply = true;
            break;
        case constants.emotes.no:
            reply = false;
            break;
        case constants.emotes.leave:
            canceled = true;
            break;
        default:
            reply = false;
            canceled = true;
            break;
    }

    return {
        reply: reply,
        canceled: canceled
    };
};
export async function tryAgain(message: AMessage | BaseMessage, user: User, value: string, type: format | valueType) {
    await editEmbed(
        message,
        'Invalid Response',
        'Uh Oh!',
        `\`${value}\` is not a valid ${type}!\n\nReact with <:yes:709981119721766955> to give a valid ${type}, or <:no:709981096066023444> to cancel.`
    );

    await message.react('709981119721766955');
    await message.react('709981096066023444');

    const filter = (reaction: MessageReaction, reactionUser: User) => {
        return ['709981119721766955', '709981096066023444'].includes(reaction.emoji.id || reaction.emoji.name) && reactionUser.id === user.id;
    };

    const answer = (await message.awaitReactions(filter, { max: 1, time: 60000 })).first();

    await message.reactions.removeAll();

    switch (answer?.emoji.id || answer?.emoji.name) {
        case '709981119721766955':
            await message.edit(`<a:loading:${constants.emotes.aLoading}>`);
            return true;
        case '709981096066023444':
            await message.edit(`<a:loading:${constants.emotes.aLoading}>`);
            return false;
        default:
            await message.edit(`<a:loading:${constants.emotes.aLoading}>`);
            return false;
    }
}
