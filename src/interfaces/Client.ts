import { Client as DClient, Collection, Message, PermissionString, MessageEmbed, MessageReaction, User } from 'discord.js';
import { config } from '../../config';
import { database } from '../database';
import { client } from '../index';

// Our custom client adding new properties to the Discord Client
export class Client extends DClient {
    commands: Collection<string, Command> = new Collection(); // Our commands
    config = config; // Store the config on the client for ease of access
    database = database; // Store the database on the client for ease of access
    sendOptions = sendOptions;
    sendConfirm = sendConfirm;
    sendEmbed = sendEmbed;
    sendQuestions = sendQuestions;
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
    userPermissions: '' | PermissionString;
    botPermissions: '' | PermissionString;
    callback(message: Message, args: string[]): Promise<void | Message>; // The command function
}

export interface MyMessage extends Message {
    client: Client;
}

type type = 'string' | 'hexColor' | 'number';
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
export const sendEmbed = async (message: Message, module?: string, title?: string, body?: string, thumbnail?: string, fields?: EmbedField[]) => {
    const embedPermission = checkPerm(message, 'EMBED_LINKS');

    const embed = new MessageEmbed()
        .setTimestamp()
        .setFooter(`Requested By ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setColor(config.accentColor);

    module ? embed.setAuthor(module, client.user?.displayAvatarURL({ dynamic: true, format: 'png' })) : null;
    title ? embed.setTitle(title) : null;
    body ? embed.setDescription(body) : null;
    thumbnail ? embed.setThumbnail(thumbnail) : null;
    fields?.forEach(field => embed.addField(field.name, field.value, field.inline));

    let fieldString = '';
    fields?.forEach(field => (fieldString += `\n\n**${field.name}**\n${field.value}`));
    const text = `**${title}**${body ? `\n\n${body}` : ''}${fieldString}`;

    return await message.channel.send(embedPermission ? embed : text);
};

export const sendOptions = async (message: Message, question: string, options: string[]) => {
    let choice;
    let canceled = false;

    let choiceString = '';
    let invalid = false;

    options.forEach((option, index) => {
        choiceString += `\`${index}\`: ${option}\n`;
    });

    for (let x = 0; x < 3; x++) {
        if (canceled) {
            return {
                choice: choice,
                canceled: canceled
            };
        } else if (invalid && choice && !parseType('number', choice)) {
            const retry = await tryAgain(message, choice, 'number');

            if (retry) {
                choice = '';
            } else {
                choice = '';
                canceled = true;
            }
        } else if (choice) {
            break;
        } else {
            const msg = await sendEmbed(
                message,
                'Options',
                `${question}`,
                `Choose one of the options by replying with the number of the option.\n\n${choiceString}\nReply with \`cancel\` to cancel.`
            );

            const filter = (msg: Message) => {
                return msg.author.id === message.author.id;
            };

            const value = (await msg.channel.awaitMessages(filter, { max: 1, time: 60000 })).first();

            await msg.delete({
                timeout: 200
            });

            const reply = value?.content ? value.content : 'cancel';

            if (reply === 'cancel') {
                choice = '';
                canceled = true;
            }

            if (!parseType('number', reply)) {
                invalid = true;
                choice = reply;
            } else {
                const index = parseType('number', reply) ? parseInt(reply) : 0;

                choice = options[index];
                break;
            }
        }
    }
    return {
        choice: choice,
        canceled: canceled
    };
};

export const checkPerm = (message: Message, permission: PermissionString) => {
    if (!client.user?.id) return false;
    const member = message?.guild?.members.cache.get(client.user.id);
    if (!member) return false;
    if (message.member && message.channel.type === 'text') {
        if (!message.channel.permissionsFor(member)?.has(permission)) return false;
    }
    return true;
};

type Question = {
    question: string;
    type: type;
    optional: boolean;
};

export const sendQuestions = async (message: Message, questions: Question[]) => {
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
            } else if (answer && parseType(question.type, answer)) {
                answer = parseType(question.type, answer);
                answers.push(answer ? answer : '');
                break;
            } else if (
                (question.optional && answer && answer !== 'none' && !parseType(question.type, answer)) ||
                (!question.optional && answer && !parseType(question.type, answer))
            ) {
                const retry = await tryAgain(message, answer, question.type);

                if (retry) {
                    answer = '';
                } else {
                    canceled = true;
                }
            } else {
                const msg = await sendEmbed(
                    message,
                    'Questions',
                    `${question.question}`,
                    `${question.optional ? '\n\n Reply with `none` if you wish to leave this blank.' : ''}${
                        question.type === 'hexColor' ? '\n\n • [Google Color Picker](https://www.google.com/search?q=color+picker)' : ''
                    }\n\nReply with your answer, or \`cancel\` to cancel.`
                );

                const filter = (msg: MyMessage) => {
                    return msg.author.id === message.author.id;
                };

                const value = (await msg.channel.awaitMessages(filter, { max: 1, time: 60000 })).first();

                await msg.delete({
                    timeout: 200
                });

                answer = value?.content ? value.content : 'cancel';

                if (answer === 'cancel') {
                    answer = '';
                    canceled = true;
                }
            }
        }
    }
    return {
        answers: answers,
        canceled: canceled
    };
};

export const sendConfirm = async (message: Message, question: string) => {
    const msg = await sendEmbed(message, 'Confirmation', 'Hold on a sec!', `${question}`);

    await msg.react('709981119721766955');
    await msg.react('709981096066023444');

    const filter = (reaction: MessageReaction, user: User) => {
        return ['709981119721766955', '709981096066023444'].includes(reaction.emoji.id || reaction.emoji.name) && user.id === message.author.id;
    };

    const answer = (await msg.awaitReactions(filter, { max: 1, time: 60000 })).first();

    await msg.delete({
        timeout: 200
    });

    switch (answer?.emoji.id || answer?.emoji.name) {
        case '709981119721766955':
            return true;
        case '709981096066023444':
            return false;
        default:
            return false;
    }
};

function parseType(type: type, string: string) {
    if (type === 'number') {
        const result = string.match(/\d+/);
        return result ? result[0] : null;
    } else if (type === 'hexColor') {
        const result = string.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);
        return result ? result[0] : null;
    } else if (type === 'string') {
        return string ? string : null;
    } else {
        return null;
    }
}
async function tryAgain(message: Message, value: string, type: type) {
    const msg = await sendEmbed(
        message,
        'Invalid Response',
        'Uh Oh!',
        `\`${value}\` is not a valid ${type}!\n\nReact with <:yes:709981119721766955> to give a valid ${type}, or <:no:709981096066023444> to cancel.`
    );

    await msg.react('709981119721766955');
    await msg.react('709981096066023444');

    const filter = (reaction: MessageReaction, user: User) => {
        return ['709981119721766955', '709981096066023444'].includes(reaction.emoji.id || reaction.emoji.name) && user.id === message.author.id;
    };

    const answer = (await msg.awaitReactions(filter, { max: 1, time: 60000 })).first();

    await msg.delete({
        timeout: 200
    });

    switch (answer?.emoji.id || answer?.emoji.name) {
        case '709981119721766955':
            return true;
        case '709981096066023444':
            return false;
        default:
            return false;
    }
}
