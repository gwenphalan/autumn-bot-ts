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

    const channels = guild.channels.cache;

    const available = channels.filter(c => (client.user ? c.permissionsFor(client.user)?.has('SEND_MESSAGES') || false : false) && c instanceof TextChannel);

    const channel = available.first();

    if (client.user ? channel?.permissionsFor(client.user)?.has('EMBED_LINKS') : null) {
        if (channel instanceof TextChannel)
            channel.send(
                new MessageEmbed()
                    .setAuthor(client.user?.username, client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setTimestamp()
                    .setColor(client.config.accentColor)
                    .setTitle('Thanks for inviting me!')
                    .setDescription(
                        `If you need any help setting up the bot, feel free to join our [support server](https://discord.gg/DfByvyN)!\n\nDo \`${client.config.defaultPrefix}settings\` to set up the bot. You can also do \`${client.config.defaultPrefix}prefix\` to change the bot prefix.`
                    )
            );
    }

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
