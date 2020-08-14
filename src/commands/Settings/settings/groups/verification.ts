import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { AMessage } from '../../../../interfaces/Client';
import { CategoryChannel, TextChannel, MessageEmbed, Collection, Guild } from 'discord.js';
import { config } from '../../../../../config';
import { client as botClient } from '../../../../index';
import { getGuildSettings } from '../../../../database';
import { createVerifyChannel, createNonVerifiedRole, createModVerifyChannel } from '../../../../util';

const update = async (guild: Guild) => {
    if (!guild) return;
    const guildSettings = await getGuildSettings(guild.id);
    if (!guildSettings) return;
    const verification = guildSettings.verification;
    const channels = guild.channels.cache;

    if (!verification.enabled) return;

    const nonVerifiedRole = (verification.nonVerifiedRole ? guild.roles.cache.get(verification.nonVerifiedRole) : null) || (await createNonVerifiedRole(guild));
    const verifyChannel = (verification.verifyChannel ? guild.channels.cache.get(verification.verifyChannel) : null) || (await createVerifyChannel(guild));
    const staffRole = verification.staffRole ? guild.roles.cache.get(verification.staffRole) : null;
    const modVerifyChannel = verification.manualVerify
        ? (verification.modVerifyChannel ? guild.channels.cache.get(verification.modVerifyChannel) : null) || (await createModVerifyChannel(guild))
        : undefined;
    const nonVerifiedChannels = verification.nonVerifiedChannels;

    if (!(verifyChannel instanceof TextChannel)) return;

    let messages = (await verifyChannel.messages.fetch({ limit: 50 }).catch(() => null)) as Collection<string, AMessage>;
    if (messages) {
        messages = messages.filter(m => m.author.id === botClient.user?.id);

        await verifyChannel.bulkDelete(messages, true).catch(() => null);
    }

    await verifyChannel.send(
        new MessageEmbed()
            .setTitle('Verification')
            .setDescription(verification.verifyMessage || `Type \`${guildSettings.general?.prefix || config.defaultPrefix}verify\` to be verified.`)
            .setColor(config.accentColor)
            .setAuthor(
                guild.name,
                guild.iconURL({
                    dynamic: true,
                    format: 'png'
                }) || undefined
            )
    );

    channels.forEach(channel => {
        if (channel instanceof CategoryChannel && !nonVerifiedChannels?.includes(channel.id)) {
            channel.createOverwrite(
                nonVerifiedRole,
                {
                    VIEW_CHANNEL: false
                },
                'Required for verification'
            );
        } else {
            if (channel.parent?.permissionOverwrites !== channel.permissionOverwrites && !nonVerifiedChannels?.includes(channel.id))
                channel.createOverwrite(
                    nonVerifiedRole,
                    {
                        VIEW_CHANNEL: false
                    },
                    'Required for verification'
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
    });
    verifyChannel.createOverwrite(
        nonVerifiedRole,
        {
            VIEW_CHANNEL: true
        },
        'Required for verification.'
    );
    verifyChannel.createOverwrite(
        guild.roles.everyone,
        {
            VIEW_CHANNEL: false
        },
        'Required for verification.'
    );

    if (!verification.manualVerify || !verification.modVerifyChannel || !verification.staffRole) return;

    if (!staffRole || !modVerifyChannel || !(modVerifyChannel instanceof TextChannel)) return;

    modVerifyChannel.createOverwrite(
        staffRole,
        {
            VIEW_CHANNEL: true
        },
        'Required for Manual Verification.'
    );
    modVerifyChannel.createOverwrite(
        guild.roles.everyone,
        {
            VIEW_CHANNEL: false
        },
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
            name: 'Non Verified Channels',
            identifier: 'nonVerifiedChannels',
            description: 'Channels that non-verified have access to view.',
            valueType: 'guildChannel',
            array: true
        },
        {
            name: 'Manual Verification',
            identifier: 'manualVerify',
            description: "Staff must manually accept or deny user's verification application. Does not require users to type `-verify`",
            valueType: 'boolean',
            default: false,
            dependencies: ['modVerifyChannel', 'staffRole']
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
