import { Client } from '../interfaces/Client';
import { GuildChannel, TextChannel, CategoryChannel } from 'discord.js';

export default async (client: Client, channel: GuildChannel) => {
    const guildSettings = await client.settings(channel.guild.id);
    if (!guildSettings) return;

    if (guildSettings.verification.enabled) {
        const verification = guildSettings.verification;
        if (!verification.verifyChannel || !verification.nonVerifiedRole) return;

        const verifyChannel = channel.guild.channels.cache.get(verification.verifyChannel);
        const nonVerifiedRole = channel.guild.roles.cache.get(verification.nonVerifiedRole);
        const nonVerifiedChannels = verification.nonVerifiedChannels;

        if (!verification.enabled || !verifyChannel || !nonVerifiedRole || !(verifyChannel instanceof TextChannel)) return;

        if (channel instanceof CategoryChannel && !nonVerifiedChannels?.includes(channel.id)) {
            channel.createOverwrite(
                nonVerifiedRole,
                {
                    VIEW_CHANNEL: false
                },
                'Required for verification.'
            );
        } else {
            if (channel.parent?.permissionOverwrites !== channel.permissionOverwrites && !nonVerifiedChannels?.includes(channel.id))
                channel.createOverwrite(
                    nonVerifiedRole,
                    {
                        VIEW_CHANNEL: false
                    },
                    'Required for verification.'
                );

            if (nonVerifiedChannels?.includes(channel.id)) {
                channel.createOverwrite(
                    nonVerifiedRole,
                    {
                        VIEW_CHANNEL: true
                    },
                    'Channel in list of non verified channels.'
                );
            }
        }
    }
    return;
};
