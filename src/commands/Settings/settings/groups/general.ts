import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { Guild } from 'discord.js';

const update = async (_guild: Guild) => {
    return;
};

export const group: SettingsGroup = {
    name: 'General',
    identifier: 'general',
    description: 'Control the general behavior of the bot.',
    settings: [
        {
            name: 'Prefix',
            identifier: 'prefix',
            description: 'Prefix indicating a message is a command.',
            valueType: 'string',
            default: '{defaultPrefix}',
            array: false
        },
        {
            name: 'Delete Commands',
            identifier: 'deleteCommands',
            description: 'Delete user commands after the command is complete.',
            valueType: 'boolean',
            default: false,
            array: false
        },
        {
            name: 'Member Role',
            identifier: 'memberRole',
            description: "Role given to members. If verification is enabled, users won't receive this until verified.",
            valueType: 'role'
        }
    ],
    update: update
};
