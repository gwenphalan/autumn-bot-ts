import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { Message as BaseMessage } from 'discord.js';

const update = async (_message: BaseMessage) => {
    return;
};

export const group: SettingsGroup = {
    name: 'General',
    identifier: 'general',
    description: 'General settings',
    settings: [
        {
            name: 'Prefix',
            identifier: 'prefix',
            description: 'Command prefix',
            valueType: 'string',
            default: '{defaultPrefix}',
            array: false
        },
        {
            name: 'Delete Commands',
            identifier: 'deleteCommands',
            description: 'Delete user commands after the command is complete.',
            valueType: 'boolean',
            array: false
        }
    ],
    update: update
};
