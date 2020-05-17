import { readdirSync } from 'fs';
import { join } from 'path';
import { SettingsGroup } from '../../../interfaces/SettingsGroup';
import { Collection } from 'discord.js';

export const groups: Collection<string, SettingsGroup> = new Collection();

const groupPath = join(__dirname, './groups');
try {
    readdirSync(groupPath).forEach(file => {
        const group: SettingsGroup = require(join(groupPath, file)).group;
        groups.set(group.name, group);
    });
} catch (err) {
    console.log(err);
}
