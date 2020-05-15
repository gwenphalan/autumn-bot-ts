import { Client } from '../interfaces/Client';
import { updateActivity } from '../index';
//import { getGuildSettings } from '../database';
import { Guild, TextChannel, MessageEmbed } from 'discord.js';

export default async (client: Client, guild: Guild) => {
    // Get the info channel
    const infoChannel = client.channels.cache.get(client.config.infoChannel) || (await client.channels.fetch(client.config.infoChannel));
    if (!infoChannel || !(infoChannel instanceof TextChannel)) throw new Error('Provided info channel is unreachable or not a text channel.');

    const embed = new MessageEmbed()
        .setAuthor('Bot Information', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setColor(client.config.accentColor)
        .setTitle(`Bot Kicked From Guild`)
        .setDescription(` • **ID:** ${guild.id}\n` + ` • **Name:** ${guild.name}\n` + ` • **Owner:** ${guild.owner} (${guild?.owner?.id})\n`);
    // Send useful info to the info channel
    infoChannel.send(embed);
    updateActivity();
};
