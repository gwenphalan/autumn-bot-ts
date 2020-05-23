import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { AMessage } from '../../../../interfaces/Client';
import { CategoryChannel } from 'discord.js';
import { createMutedRole } from '../../../../util';
import { updateGuildSettings } from '../../../../database';

const update = async (message: AMessage) => {
    if (!message.guild) throw new Error('Settings Group Update Method called in DMs');
    const guildSettings = await message.client.settings(message.guild.id);
    if (!guildSettings.moderation.enabled) return;

    const mutedRole = message.guild.roles.cache.get(guildSettings.moderation.mutedRole);

    const channels = message.guild.channels.cache;

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
        const muteRole = await createMutedRole(message.guild);

        guildSettings.moderation.mutedRole = muteRole.id;

        updateGuildSettings(message.guild.id, guildSettings);
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
