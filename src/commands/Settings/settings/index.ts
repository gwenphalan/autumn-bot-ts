import { readdirSync } from 'fs';
import { join } from 'path';
import { SettingsGroup } from '../../../interfaces/SettingsGroup';
import { Collection } from 'discord.js';
import { client } from '../../../index';

export const groups: Collection<string, SettingsGroup> = new Collection();

const groupPath = join(__dirname, './groups');
try {
    readdirSync(groupPath).forEach(file => {
        const group: SettingsGroup = require(join(groupPath, file)).group;
        groups.set(group.identifier, group);
    });
} catch (err) {
    console.log(err);
}

export const updateGuild = async (d: Buffer) => {
    const data = JSON.parse(d.toString());
    const id = data.guild;
    if (!id) return 'Failure';
    const guild = client.guilds.cache.get(id);
    if (!guild) return 'Failure';
    const module = data.module;
    if (!module) return 'Failure';
    const group = groups.get(module);
    if (!group) return 'Failure';

    try {
        await group.update(guild);
    } catch (err) {
        return 'Failure';
    }

    return 'Success';
};
