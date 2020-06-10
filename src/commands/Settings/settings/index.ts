import { readdirSync } from 'fs';
import { join } from 'path';
import { SettingsGroup } from '../../../interfaces/SettingsGroup';
import { Collection, PermissionString, TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../../../index';

export const groups: Collection<string, SettingsGroup> = new Collection();

const groupPath = join(__dirname, './groups');
try {
    readdirSync(groupPath).forEach(file => {
        const group: SettingsGroup = require(join(groupPath, file)).group;
        groups.set(group.identifier, group);
    });
} catch (err) {
    console.log(err);
}

export const updateGuild = async (d: Buffer) => {
    const data = JSON.parse(d.toString());
    const id = data.guild;
    if (!id) return { status: 400, message: 'No Guild Provided' };
    const guild = client.guilds.cache.get(id);
    if (!guild) return { status: 400, message: 'Invalid Guild' };
    const module = data.module;
    if (!module) return { status: 400, message: 'Invalid Module' };
    const group = groups.get(module);
    if (!group) return { status: 400, message: 'Invalid Settings Group' };

    const required: PermissionString[] = [
        'MANAGE_CHANNELS',
        'MANAGE_ROLES',
        'SEND_MESSAGES',
        'EMBED_LINKS',
        'VIEW_CHANNEL',
        'MANAGE_MESSAGES',
        'READ_MESSAGE_HISTORY'
    ];

    const perms = guild.me?.permissions;

    const missing = required.filter(p => !perms?.has(p));

    if (missing.length) return { status: 400, message: `Missing Bot Permissions (${missing.join(', ')})` };

    try {
        await group.update(guild);
    } catch (err) {
        return { status: 300, message: 'Internal Error' };
    }

    // Get the info channel
    const infoChannel = client.channels.cache.get(client.config.infoChannel) || (await client.channels.fetch(client.config.infoChannel));
    if (!infoChannel || !(infoChannel instanceof TextChannel)) throw new Error('Provided info channel is unreachable or not a text channel.');

    const embed = new MessageEmbed()
        .setAuthor('Bot Information', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setColor(client.config.accentColor)
        .setTitle(`Updated Guild Settings`)
        .setDescription(
            `• **ID:** ${guild.id}\n` +
                `• **Name:** ${guild.name}\n` +
                `• **Owner:** ${guild.owner?.user.username}#${guild.owner?.user.discriminator} (${guild?.owner?.id})\n` +
                `• **Module:** ${module}`
        );
    // Send useful info to the info channel
    infoChannel.send(embed);

    return { status: 200, message: `Success` };
};
