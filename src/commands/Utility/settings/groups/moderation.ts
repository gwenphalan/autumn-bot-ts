import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { AMessage } from '../../../../interfaces/Client';
import { CategoryChannel } from 'discord.js';

const update = async (message: AMessage) => {
    if (!message.guild) throw new Error('Settings Group Update Method called in DMs');
    const settings = (await message.client.settings(message.guild.id)).moderation;
    if (!settings.enabled || !settings.mutedRole || !settings.staffRole) return;

    const mutedRole = message.guild.roles.cache.get(settings.mutedRole);

    if (!mutedRole) return;

    const channels = message.guild.channels.cache;

    channels.forEach(channel => {
        if (channel instanceof CategoryChannel) {
            channel.overwritePermissions(
                [
                    {
                        id: mutedRole.id,
                        deny: ['SEND_MESSAGES']
                    }
                ],
                'Required to mute users.'
            );
        } else {
            if (channel.parent?.permissionOverwrites !== channel.permissionOverwrites)
                channel.overwritePermissions(
                    [
                        {
                            id: mutedRole.id,
                            deny: ['SEND_MESSAGES']
                        }
                    ],
                    'Required to mute users.'
                );
        }
    });
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
            name: 'Staff Role',
            identifier: 'staffRole',
            description: 'Role allowed to do moderation commands',
            valueType: 'role',
            required: true
        },
        {
            name: 'Mod Log',
            identifier: 'modLog',
            description: 'Channel where moderation events are logged.',
            valueType: 'textChannel'
        },
        {
            name: 'Muted Role',
            identifier: 'mutedRole',
            description: 'Role given to uses who are muted. Denied permission to speak in all channels.',
            valueType: 'role',
            required: true
        }
    ],
    update: update
};
