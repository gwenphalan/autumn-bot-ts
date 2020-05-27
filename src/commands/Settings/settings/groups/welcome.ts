import { SettingsGroup } from '../../../../interfaces/SettingsGroup';
import { Guild } from 'discord.js';

const update = async (_guild: Guild) => {
    return;
};

export const group: SettingsGroup = {
    name: 'Welcome',
    identifier: 'welcome',
    description: 'Welcome new server members with a customized welcome card.',
    settings: [
        {
            name: 'Enabled',
            identifier: 'enabled',
            description: 'Whether or not welcome cards are enabled',
            valueType: 'boolean',
            default: false
        },
        {
            name: 'Welcome Channel',
            identifier: 'welcomeChannel',
            description: 'Channel where welcome cards are sent.',
            valueType: 'textChannel',
            required: true
        },
        {
            name: 'Background Color',
            identifier: 'backgroundColor',
            description: 'Background color of the welcome card.',
            valueType: 'color',
            default: '#2b2929'
        },
        {
            name: 'Text Color',
            identifier: 'textColor',
            description: 'Text color of the welcome card.',
            valueType: 'color',
            default: '#2b2929'
        },
        {
            name: 'Profile Color',
            identifier: 'profileColor',
            description: 'Accent color of the profile picture area.',
            valueType: 'color',
            default: '{accentColor}'
        },
        {
            name: 'Profile Background',
            identifier: 'profileBackground',
            description: 'Background image behind the users profile picture.',
            valueType: 'image'
        }
    ],
    update: update
};
