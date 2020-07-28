import { CronJob } from 'cron';
import { client } from '../index';
import { database, updateGuildSettings } from '../database/index';
import { createMutedRole } from '../util';

const taskCallback = async (): Promise<void> => {
    const guilds = client.guilds.cache;

    guilds.forEach(async guild => {
        const guildSettings = await database.guildSettings.findOne({ guild: guild.id });
        if (!guildSettings) return;

        if (!guildSettings.moderation.enabled) return;

        const infractions = await database.infractions.find({ guild: guild.id, needsTiming: true });

        infractions.forEach(async infraction => {
            const iType = infraction.infractionType;

            if (!infraction.endTimestamp) return;

            if (infraction.endTimestamp > Date.now()) return;

            let mutedRole = guild.roles.cache.get(guildSettings.moderation.mutedRole);

            if (!mutedRole) {
                mutedRole = await createMutedRole(guild);

                guildSettings.moderation.mutedRole = mutedRole.id;

                updateGuildSettings(guild.id, guildSettings);
            }

            switch (iType) {
                case 'mute':
                    const user = guild.members.cache.get(infraction.user);
                    if (!user) return;
                    user.roles.remove(mutedRole).catch(() => null);
                    infraction.needsTiming = false;
                    await database.infractions.updateOne(
                        {
                            guild: guild.id,
                            user: infraction.user,
                            infractionType: infraction.infractionType,
                            timestamp: infraction.timestamp,
                            endTimestamp: infraction.endTimestamp,
                            case: infraction.case
                        },
                        infraction
                    );
                    break;
                case 'ban':
                    guild.members.unban(infraction.user);
                    infraction.needsTiming = false;
                    await database.infractions.updateOne(
                        {
                            guild: guild.id,
                            user: infraction.user,
                            infractionType: infraction.infractionType,
                            timestamp: infraction.timestamp,
                            endTimestamp: infraction.endTimestamp,
                            case: infraction.case
                        },
                        infraction
                    );
                    break;
                case 'warn':
                    infraction.needsTiming = false;
                    await database.infractions.updateOne(
                        {
                            guild: guild.id,
                            user: infraction.user,
                            infractionType: infraction.infractionType,
                            timestamp: infraction.timestamp,
                            endTimestamp: infraction.endTimestamp,
                            case: infraction.case
                        },
                        infraction
                    );
                    break;
                default:
                    break;
            }
        });
    });
};

export const task = new CronJob('*/60 * * * * *', taskCallback);
