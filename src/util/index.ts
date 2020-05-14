import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';
import { Client, MyMessage } from '../interfaces/Client';
import { TextChannel, MessageEmbed, User, GuildMember, MessageReaction, GuildChannel } from 'discord.js';
import { inspect } from 'util';
import { client } from '../index';

// Fetches remote content
export const fetch = async (requestInfo: RequestInfo, requestOptions?: RequestInit) => {
    const result = await nodeFetch(requestInfo, requestOptions)
        .then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        })
        .catch(console.error);
    return result;
};

//Shortens a string to the provided amount and appends three dots if shortened.
export const trimString = (str: string, n: number) => {
    return str.length > n ? str.substring(0, n - 3) + '...' : str;
};

// Handles errors: Logs them to console and error-channel defined in config
export const handleError = async (client: Client, err: Error) => {
    console.error(err);
    if (!client.user) return;

    const errorChannel = client.channels.cache.get(client.config.errorChannel) || (await client.channels.fetch(client.config.errorChannel));
    if (!errorChannel || !(errorChannel instanceof TextChannel)) throw new Error('Provided error channel is unreachable or not a text channel.');

    errorChannel.send(
        (await Promise.all(client.config.developers.map(dev => client.users.cache.get(dev) || client.users.fetch(dev)))).join(' ') +
            '\n```' +
            (err instanceof Error ? err.stack : inspect(err)) +
            '```'
    );
};

type GuildChannelType = 'text' | 'voice' | 'category' | 'news' | 'store';

const channelFilterInexact = (search: string) => (chan: GuildChannel) =>
    chan.name.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(chan.id);

export const getChannel = async (message: MyMessage, args: string[], channelType: GuildChannelType, spot?: number) => {
    if (!message.guild) throw new Error('getChannel was used in a DmChannel.');

    if (!args[0]) return null;

    const input = spot || spot === 0 ? args[spot].toLowerCase() : args.join(' ').toLowerCase();

    const channels = message.guild.channels.cache;

    const result = channels.filter(channelFilterInexact(input));

    let channel = result.first() ? result.first() : null;

    if (result.size > 1) {
        const channelsFound: string[] = [];

        result.each((channel: GuildChannel) => channelsFound.push(channel.toString()));

        const reply = await options(message, 'Multiple Channels Found', channelsFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return null;

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        const x = id ? message.guild.channels.cache.get(id) : null;

        channel = x ? x : null;
    } else if (!result.size) {
        return null;
    }
    if (channel?.type !== channelType) return null;
    return channel;
};

const memberFilterInexact = (search: string) => (mem: GuildMember) =>
    mem.displayName.toLowerCase().includes(search.toLowerCase()) || mem.user.tag.toLowerCase().includes(search.toLowerCase());

export const getMember = async (message: MyMessage, args: string[], spot?: number) => {
    if (!message.guild) throw new Error('getMember was used in a DmChannel.');

    if (!args[0]) return null;

    const input = spot || spot === 0 ? args[spot].toLowerCase() : args.join(' ').toLowerCase();

    const members = message.guild.members.cache;

    const result = members.filter(memberFilterInexact(input));

    const member = result.first();

    if (result.size === 1) return member;

    if (result.size > 1) {
        const membersFound: string[] = [];

        result.each((member: GuildMember) => membersFound.push(member.toString()));

        const reply = await options(message, 'Multiple Members Found', membersFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return null;

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        return id ? message.guild.members.cache.get(id) : null;
    } else if (!result.size) {
        return null;
    }
    return null;
};

export type format = 'string' | 'hexColor' | 'number' | 'url' | 'imageUrl';

export const linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const parseType = (type: format, str: string) => {
    switch (type) {
        case 'number':
            const number = str.match(/\d+/);
            return number ? number[0] : null;
        case 'hexColor':
            const hexColor = str.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);
            return hexColor ? hexColor[0] : null;
        case 'imageUrl':
            const imageUrl = str.match(/https?\:\/\/.*\..*.(gif|png|web(p|m)|jpe?g)/gi);
            console.log(imageUrl);
            return imageUrl ? imageUrl[0] : null;
        case 'string':
            return str || null;
        case 'url':
            const url = str.match(linkRegex);
            console.log(url);
            return url ? url[0] : null;
        default:
            return null;
    }
};

const options = async (message: MyMessage, question: string, options: string[]) => {
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
            const response = new MessageEmbed()
                .setColor(message.client.config.accentColor)
                .setAuthor('Autumn Bot', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
                .setTimestamp()
                .setTitle(`${question}`)
                .setDescription(`Choose one of the options by replying with the number of the option.\n\n ${choiceString}\n\nReply with \`cancel\` to cancel.`);

            const msg = await message.channel.send(response);

            const filter = (msg: MyMessage) => {
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

const tryAgain = async (message: MyMessage, value: string, type: format) => {
    const response = new MessageEmbed()
        .setColor(message.client.config.accentColor)
        .setAuthor('Profiles', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setTitle('Uh Oh!')
        .setDescription(
            `\`${value}\` is not a valid ${type}!\n\nReact with <:yes:709981119721766955> to give a valid ${type}, or <:no:709981096066023444> to cancel.`
        );
    const msg = await message.channel.send(response);

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
