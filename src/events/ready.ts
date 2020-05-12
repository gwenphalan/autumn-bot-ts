import { Client } from '../interfaces/Client';
import { TextChannel } from 'discord.js';

export default async (client: Client) => {
    // Log useful info to the console
    console.log(`Connected to Discord as ${client.user!.tag} - ${client.user!.id}`);
    console.log(`Serving ${client.guilds.cache.size} guilds and ${client.channels.cache.size} channels.`);
    console.log(`Default prefix: ${client.config.defaultPrefix}`);

    // Get the info channel
    const infoChannel = client.channels.cache.get(client.config.infoChannel) || (await client.channels.fetch(client.config.infoChannel));
    if (!infoChannel || !(infoChannel instanceof TextChannel)) throw new Error('Provided info channel is unreachable or not a text channel.');

    // Send useful info to the info channel
    infoChannel.send(
        `Connected to Discord as ${client.user!.tag} - ${client.user!.id}\nServing ${client.guilds.cache.size} guilds and ${
            client.channels.cache.size
        } channels.\nDefault prefix: ${client.config.defaultPrefix}`
    );
};
