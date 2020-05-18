import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { AMessage } from '../../../../interfaces/Client';
import { CategoryChannel, TextChannel, MessageEmbed } from 'discord.js';
import { config } from '../../../../../config';

const update = async (message: AMessage) => {
    if (!message.guild) return;
    const guildSettings = await message.client.settings(message.guild.id);
    if (!guildSettings) return;
    const verification = guildSettings.verification;
    if (!message.guild || !message.member || !verification?.enabled || message.author.bot) return;
    const channels = message.guild.channels.cache;

    if (!verification.verifyChannel || !verification.nonVerifiedRole) return;

    const verifyChannel = message.guild.channels.cache.get(verification.verifyChannel);
    const nonVerifiedRole = message.guild.roles.cache.get(verification.nonVerifiedRole);
    const staffRole = message.guild.roles.cache.get(verification.staffRole);
    const modVerifyChannel = message.guild.channels.cache.get(verification.modVerifyChannel);
    const nonVerifiedChannels = verification.nonVerifiedChannels;

    if (!verification.enabled || !verifyChannel || !nonVerifiedRole || !(verifyChannel instanceof TextChannel)) return;

    verifyChannel.bulkDelete(100);

    verifyChannel.send(
        new MessageEmbed()
            .setTitle('Verification')
            .setDescription(verification.verifyMessage || `Type \`${guildSettings.general.prefix}verify\` to be verified.`)
            .setColor(config.accentColor)
            .setAuthor(message.guild.name, message.guild.iconURL() || undefined)
    );

    channels.forEach(channel => {
        if (channel instanceof CategoryChannel && !nonVerifiedChannels.includes(channel.id)) {
            channel.overwritePermissions(
                [
                    {
                        id: nonVerifiedRole.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ],
                'Required for verification.'
            );
        } else {
            if (channel.parent?.permissionOverwrites !== channel.permissionOverwrites && !nonVerifiedChannels.includes(channel.id))
                channel.overwritePermissions(
                    [
                        {
                            id: nonVerifiedRole.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ],
                    'Required to mute users.'
                );

            if (nonVerifiedChannels.includes(channel.id)) {
                channel.overwritePermissions(
                    [
                        {
                            id: nonVerifiedRole.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ],
                    'Channel in list of non verified channels.'
                );
            }
        }
    });

    verifyChannel.overwritePermissions(
        [
            {
                id: nonVerifiedRole.id,
                allow: ['VIEW_CHANNEL']
            },
            {
                id: message.guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL']
            }
        ],
        'Required for verification.'
    );

    if (!verification.manualVerify || !verification.modVerifyChannel || !verification.staffRole) return;

    if (!staffRole || !modVerifyChannel || !(modVerifyChannel instanceof TextChannel)) return;

    modVerifyChannel.overwritePermissions(
        [
            {
                id: staffRole.id,
                allow: ['VIEW_CHANNEL']
            },
            {
                id: message.guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL']
            }
        ],
        'Required for Manual Verification.'
    );
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
            valueType: 'guildChannel',
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
            default: "You've been denied verification.\n\nContact staff to find out why."
        },
        {
            name: 'Accepted Message',
            identifier: 'acceptMessage',
            description: 'Message sent to users accepted for verification.',
            valueType: 'string',
            default: "You've been verified!"
        }
    ],
    update: update
};
