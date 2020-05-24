import { Client } from '../interfaces/Client';
import { updateActivity } from '../index';
//import { getGuildSettings } from '../database';
import { Guild, TextChannel, MessageEmbed } from 'discord.js';
import { getGuildSettings } from '../database';

export default async (client: Client, guild: Guild) => {
    // Get the info channel
    const infoChannel = client.channels.cache.get(client.config.infoChannel) || (await client.channels.fetch(client.config.infoChannel));
    if (!infoChannel || !(infoChannel instanceof TextChannel)) throw new Error('Provided info channel is unreachable or not a text channel.');

    await getGuildSettings(guild.id);

    const embed = new MessageEmbed()
        .setAuthor('Bot Information', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setColor(client.config.accentColor)
        .setTitle(`Bot Invited To Guild`)
        .setDescription(
            ` • **ID:** ${guild.id}\n` +
                ` • **Name:** ${guild.name}\n` +
                ` • **Owner:** ${guild.owner?.user.username}#${guild.owner?.user.discriminator} (${guild?.owner?.id})\n` +
                ` • **Channels:** ${guild.channels.cache.size}\n` +
                ` • **Users:** ${guild.members.cache.size}\n`
        );
    // Send useful info to the info channel
    infoChannel.send(embed);
    updateActivity();
};
