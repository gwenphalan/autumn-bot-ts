import { readdirSync } from 'fs';
import { join } from 'path';
import { SettingsGroup } from '../../../interfaces/SettingsGroup';
import { Collection } from 'discord.js';
import { client } from '../../../index';
import { GuildSettings } from '../../../database/schemas/GuildSettings';
import { Logger } from '../../../Logger';

export const groups: Collection<string, SettingsGroup> = new Collection();

const groupPath = join(__dirname, './groups');
try {
    readdirSync(groupPath).forEach(file => {
        const group: SettingsGroup = require(join(groupPath, file)).group;
        groups.set(group.identifier, group);
    });
} catch (err) {
    Logger.error(err);
}

interface Change {
    _id: string;
    updateDescription: any;
}
const updatingGuilds: Collection<string, string> = new Collection();

GuildSettings.watch().on('change', async change => {
    const guildSettings = await GuildSettings.findById(change._id);
    if (!guildSettings) return;

    if (updatingGuilds.has(guildSettings.guild)) return;

    updatingGuilds.set(guildSettings.guild, guildSettings.guild);

    updateGuild({
        // @ts-ignore
        _id: change.documentKey._id,
        // @ts-ignore
        updateDescription: change.updateDescription
    }).then(() => {
        updatingGuilds.delete(guildSettings.guild);
    });
});

export const updateGuild = async (change: Change) => {
    const guildSettings = await GuildSettings.findById(change._id);
    if (!guildSettings) return;

    const updatedFields = change.updateDescription.updatedFields;

    const guild = client.guilds.cache.get(guildSettings.guild);

    if (!guild) return;

    for (const field in updatedFields) {
        const group = groups.get(field);

        if (!group) return;

        Logger.debug(`Updating ${group.name} in ${guild.name} (${guild.id})`, 'Guild Settings');

        group.update(guild).catch(() => null);
    }
};
