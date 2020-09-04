import { Command, AMessage } from '../../interfaces/Client';
import { client } from '../..';
import { PromptManager } from '../../helpers/PromptManager';
import { GuildSettings } from '../../database/schemas/GuildSettings';

const callback = async (_message: AMessage, _args: {}, prompt: PromptManager) => {
    let c = 0;
    let d = 0;
    await Promise.all(
        client.guilds.cache.map(async g => {
            const guildSettings = await GuildSettings.findOne({ guild: g.id });

            if (!guildSettings) {
                await GuildSettings.create({
                    guild: g.id,
                    general: {},
                    moderation: { enabled: false },
                    verification: { enabled: false },
                    welcome: { enabled: false }
                });

                c++;
            }
        })
    );

    const guilds = await GuildSettings.find();

    for (let i = 0; i < guilds.length; i++) {
        const guild = guilds[i];

        const guildSearch = client.guilds.cache.get(guild.guild);

        if (!guildSearch) {
            d++;
            guild.deleteOne();
        }
    }

    return prompt.embed('Updated Database', `Created ${c} Entries\nDeleted ${d} Entries`);
};

export const command: Command = {
    name: 'db',
    category: 'Dev',
    module: 'Dev',
    aliases: [],
    description: '',
    args: [],
    devOnly: true,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
