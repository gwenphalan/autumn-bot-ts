import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';
import { Client } from '../interfaces/Client';
import { TextChannel, GuildMember, PermissionString, Message, Guild, CategoryChannel } from 'discord.js';
import { inspect } from 'util';
import constants from '../constants/constants';
import { getGuildSettings, updateGuildSettings } from '../database';
import { client } from '..';

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

export const createMutedRole = async (guild: Guild) => {
    const channels = guild.channels.cache;

    const mutedRole = await guild.roles.create({
        data: {
            name: 'Muted',
            color: '#4d4d4d'
        },
        reason: 'Required to Mute Users'
    });

    channels.forEach(channel => {
        if (channel instanceof CategoryChannel) {
            channel.createOverwrite(
                mutedRole,
                {
                    SEND_MESSAGES: false
                },
                'Required to mute users.'
            );
        } else {
            if (channel.parent?.permissionOverwrites !== channel.permissionOverwrites)
                channel.createOverwrite(
                    mutedRole,
                    {
                        SEND_MESSAGES: false
                    },
                    'Required to mute users.'
                );
        }
    });

    return mutedRole;
};

export const createNonVerifiedRole = async (guild: Guild) => {
    const channels = guild.channels.cache;
    const settings = await getGuildSettings(guild.id);

    const nonVerifiedRole = await guild.roles.create({
        data: {
            name: 'Non-Verified',
            color: '#4d4d4d'
        },
        reason: 'Required for Verification'
    });

    channels.forEach(channel => {
        if (channel.id !== settings.verification.verifyChannel && !settings.verification.nonVerifiedChannels.includes(channel.id)) {
            if (channel instanceof CategoryChannel) {
                channel.createOverwrite(
                    nonVerifiedRole,
                    {
                        VIEW_CHANNEL: false
                    },
                    'Required for Verification'
                );
            } else {
                if (channel.parent?.permissionOverwrites !== channel.permissionOverwrites)
                    channel.createOverwrite(
                        nonVerifiedRole,
                        {
                            VIEW_CHANNEL: false
                        },
                        'Required for Verification'
                    );
            }
        }
    });

    settings.verification.nonVerifiedRole = nonVerifiedRole.id;

    await updateGuildSettings(guild.id, settings);

    return nonVerifiedRole;
};

export const createVerifyChannel = async (guild: Guild) => {
    const settings = await getGuildSettings(guild.id);
    if (!settings) return;

    if (!client.user) return;

    const nonVerifiedRole = guild.roles.cache.get(settings.verification.nonVerifiedRole) || (await createNonVerifiedRole(guild));

    const channel = await guild.channels.create('verify', {
        type: 'text',
        permissionOverwrites: [
            {
                id: nonVerifiedRole?.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
                id: guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
                id: client.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
        ],
        reason: 'Required for Verification'
    });

    settings.verification.verifyChannel = channel.id;

    await updateGuildSettings(guild.id, settings);

    return channel;
};

export const createModVerifyChannel = async (guild: Guild) => {
    const settings = await getGuildSettings(guild.id);
    if (!settings || !client.user) return;

    const staffRole = guild.roles.cache.get(settings.verification.staffRole);

    if (!staffRole) return;

    const channel = await guild.channels.create('mod-verify', {
        type: 'text',
        permissionOverwrites: [
            {
                id: staffRole?.id,
                allow: ['VIEW_CHANNEL']
            },
            {
                id: guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: client.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
        ]
    });

    settings.verification.modVerifyChannel = channel.id;

    await updateGuildSettings(guild.id, settings);

    return channel;
};

export const fetchNorris = async () => {
    const result = await fetch(`https://api.chucknorris.io/jokes/random`, {
        method: 'GET',
        headers: { 'Content-Type': 'text/plain' },
        redirect: 'follow'
    });
    return result;
};
