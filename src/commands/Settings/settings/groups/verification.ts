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
    name: 'Verification',
    identifier: 'verification',
    description: 'Verify new users either manually, or automatically, to protect against bots and trolls.',
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
            description: 'Role given to those who manage verification applications.',
            valueType: 'role'
        },
        {
            name: 'Non Verified Role',
            identifier: 'nonVerifiedRole',
            description: 'Role given to non-verified users. Denied access to view all channels. Taken away upon verification.',
            valueType: 'role',
            required: true
        },
        {
            name: 'Non Verified Channels',
            identifier: 'nonVerifiedChannels',
            description: 'Channels that non-verified have access to view.',
            valueType: 'textChannel',
            array: true
        },
        {
            name: 'Verification Channel',
            identifier: 'verifyChannel',
            description: 'Channel where non-verified users get verified.',
            valueType: 'textChannel',
            required: true
        },
        {
            name: 'Manual Verification',
            identifier: 'manualVerify',
            description: 'Whether or not staff have to manually verify new users.',
            valueType: 'boolean',
            default: false,
            dependencies: ['modVerifyChannel', 'staffRole']
        },
        {
            name: 'Moderator Verification Channel',
            identifier: 'modVerifyChannel',
            description: 'Channel where moderators accept or deny user verification applications.',
            valueType: 'textChannel'
        },
        {
            name: 'Ping Staff',
            identifier: 'pingStaff',
            description: 'Ping staff when a user requests verification. (Manual Verification Only).',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Verification Message',
            identifier: 'verifyMessage',
            description: 'Message explaining how to be verified. Automatically sent in the verification channel.',
            valueType: 'string',
            default: 'Type `{prefix}verify` to be verified.'
        },
        {
            name: 'Denied Message',
            identifier: 'denyMessage',
            description: 'Message sent to users denied for verification.',
            valueType: 'string',
            default: 'You have been denied verification in {guildName}.'
        },
        {
            name: 'Accepted Message',
            identifier: 'acceptMessage',
            description: 'Message sent to users accepted for verification.',
            valueType: 'string',
            default: 'You have been accepted for verification in {guildName}.'
        }
    ],
    update: update
};
