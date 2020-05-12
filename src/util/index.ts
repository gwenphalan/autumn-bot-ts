import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';
import { Client } from '../interfaces/Client';
import { TextChannel } from 'discord.js';
import { inspect } from 'util';

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
