import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';
import { Client, AMessage } from '../interfaces/Client';
import { TextChannel, MessageEmbed, GuildMember, GuildChannel, Message as BaseMessage, PermissionString, Message } from 'discord.js';
import { inspect } from 'util';
import { client } from '../index';
import constants from '../constants/constants';

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

export const toCamelCase = (str: string) => {
    const match = str.match(constants.regexps.camelCase);

    let result = '';

    if (!match?.length) return;

    for (let i = 0, len = match.length; i < len; i++) {
        const currentStr = match[i];

        let tempStr = currentStr.toLowerCase();

        if (i != 0) {
            tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
        }

        result += tempStr;
    }

    return result;
};

export const missingPermissions = (message: Message, permissions: PermissionString[], member?: GuildMember | 'self') => {
    if (message.channel.type === 'dm') return;
    const targetMember = member === 'self' ? message.guild!.me! : member || message.member!;
    const allPermissions = message.channel.permissionsFor(targetMember) || targetMember.permissions;
    const missing = permissions.filter(p => !allPermissions?.has(p));
    return missing.length ? missing : undefined;
};

export const nicerPermissions = (perm: PermissionString) => {
    return perm
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');
};

export const replace = (str: string, obj: { [prop: string]: string }) => {
    for (const prop in obj) {
        str = str.replace(new RegExp('{' + prop + '}', 'g'), obj[prop]);
    }
    return str;
};

type GuildChannelType = 'text' | 'voice' | 'category' | 'news' | 'store';

const channelFilterInexact = (search: string) => (chan: GuildChannel) =>
    chan.name.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(chan.id);

export const getChannel = async (message: AMessage | BaseMessage, args: string[], channelType: GuildChannelType, spot?: number) => {
    if (!message.guild) throw new Error('getChannel was used in a DmChannel.');

    if (!args[0]) return null;

    const input = spot || spot === 0 ? args[spot].toLowerCase() : args.join(' ').toLowerCase();

    const channels = message.guild.channels.cache;

    const result = channels.filter(channelFilterInexact(input));

    let channel = result.first() ? result.first() : null;

    if (result.size > 1) {
        const channelsFound: string[] = [];

        result.each((channel: GuildChannel) => channelsFound.push(channel.toString()));

        const GUI = await message.channel.send(new MessageEmbed());

        const reply = await client.sendOptions(GUI, message.author, 'Multiple Channels Found', channelsFound);

        await GUI.delete({
            timeout: 100
        });

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
    mem.displayName.toLowerCase().includes(search.toLowerCase()) ||
    mem.user.tag.toLowerCase().includes(search.toLowerCase()) ||
    search.toLowerCase().includes(mem.id);

export const getMember = async (message: AMessage | BaseMessage, args: string[], spot?: number) => {
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

        const GUI = await message.channel.send(new MessageEmbed());

        const reply = await client.sendOptions(GUI, message.author, 'Multiple Members Found', membersFound);

        await GUI.delete({
            timeout: 100
        });

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
            return imageUrl ? imageUrl[0] : null;
        case 'string':
            return str || null;
        case 'url':
            const url = str.match(linkRegex);
            return url ? url[0] : null;
        default:
            return null;
    }
};
