import { Client } from '../interfaces/Client';
import { TextChannel, MessageEmbed } from 'discord.js';
import { updateActivity } from '../index';

export default async (client: Client) => {
    console.log(process.env);
    // Log useful info to the console
    console.log(`Connected to Discord as ${client.user!.tag} - ${client.user!.id}`);
    console.log(`Serving ${client.guilds.cache.size} guilds and ${client.channels.cache.size} channels.`);
    console.log(`Default prefix: ${client.config.defaultPrefix}`);

    // Get the info channel
    const infoChannel = client.channels.cache.get(client.config.infoChannel) || (await client.channels.fetch(client.config.infoChannel));
    if (!infoChannel || !(infoChannel instanceof TextChannel)) throw new Error('Provided info channel is unreachable or not a text channel.');

    const embed = new MessageEmbed()
        .setAuthor('Bot Information', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setColor(client.config.accentColor)
        .setTitle(`Bot Ready`)
        .setDescription(
            ` • **Connected As:** ${client.user!.tag} (${client.user!.id})\n • **Guilds:** ${client.guilds.cache.size}\n • **Channels:** ${
                client.channels.cache.size
            }\n • **Default Prefix:** ${client.config.defaultPrefix}`
        );
    // Send useful info to the info channel
    infoChannel.send(embed);
    updateActivity();
};
