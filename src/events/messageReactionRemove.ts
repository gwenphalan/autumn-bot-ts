import { Client } from '../interfaces/Client';
import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { getReactionRole } from '../database';

export default async (client: Client, reaction: MessageReaction, user: User) => {
    if (user.bot) return;

    if (reaction.partial) reaction = await reaction.fetch();
    const message = reaction.message;

    const r = {
        name: reaction.emoji.name,
        id: reaction.emoji.id
    };
    if (message.guild) {
        const reactionRole = await getReactionRole(message.guild.id, reaction.message.id, r);

        const guild = message.guild;

        if (reactionRole) {
            const role = guild.roles.cache.get(reactionRole.roleId);

            if (!role) return;

            const member = guild.members.cache.get(user.id);

            if (!member) return;

            member.roles.remove(role).catch(() => null);

            return user.send(
                new MessageEmbed()
                    .setColor(client.config.accentColor)
                    .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png' }) || undefined)
                    .setDescription(`Removed role \`${role.name}\`.`)
            );
        }
    }

    return;
};
