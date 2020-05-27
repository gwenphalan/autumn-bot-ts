import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { CategoryChannel, Guild } from 'discord.js';
import { createMutedRole } from '../../../../util';
import { updateGuildSettings, getGuildSettings } from '../../../../database';

const update = async (guild: Guild) => {
    const guildSettings = await getGuildSettings(guild.id);
    if (!guildSettings.moderation.enabled) return;

    const mutedRole = guild.roles.cache.get(guildSettings.moderation.mutedRole);

    const channels = guild.channels.cache;

    if (mutedRole) {
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
    } else {
        const muteRole = await createMutedRole(guild);

        guildSettings.moderation.mutedRole = muteRole.id;

        updateGuildSettings(guild.id, guildSettings);
    }
};

export const group: SettingsGroup = {
    name: 'Moderation',
    identifier: 'moderation',
    description: 'Moderate your server to improve member experience',
    settings: [
        {
            name: 'Enabled',
            identifier: 'enabled',
            description: 'Determines whether or not the moderation plugin is enabled on this.',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Warning Expiration',
            identifier: 'warnExpire',
            description: 'How long until a warning expires.',
            valueType: 'timeLength',
            default: '30d'
        },
        {
            name: 'Mod Log',
            identifier: 'modLog',
            description: 'Channel where moderation events are logged.',
            valueType: 'textChannel'
        }
    ],
    update: update
};
