import { Client } from '../interfaces/Client';
import { MessageReaction, User, TextChannel, MessageEmbed, MessageAttachment } from 'discord.js';
import { getVerifyApp } from '../database';
import { client as botClient } from '../index';
import { drawCard } from '../util/canvas';

export default async (client: Client, reaction: MessageReaction, user: User) => {
    if (user.bot) return;
    const message = reaction.message;

    if (reaction.emoji.id === client.constants.emotes.yes || reaction.emoji.id === client.constants.emotes.no) {
        if (!message.guild) return;

        const guildSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;

        if (!guildSettings) return;

        const verification = guildSettings.verification;

        if (!message.guild || !message.member) return;

        const verifyChannel = message.guild.channels.cache.get(verification.verifyChannel);
        const nonVerifiedRole = message.guild.roles.cache.get(verification.nonVerifiedRole);
        const staffRole = message.guild.roles.cache.get(verification.staffRole);
        const modVerifyChannel = message.guild.channels.cache.get(verification.modVerifyChannel);

        if (
            !verifyChannel ||
            !nonVerifiedRole ||
            !modVerifyChannel ||
            message.channel.id !== modVerifyChannel.id ||
            !verification.manualVerify ||
            !staffRole ||
            !modVerifyChannel ||
            !(modVerifyChannel instanceof TextChannel) ||
            message.channel !== modVerifyChannel
        )
            return;

        const staffMember = await message.guild.members.fetch(user.id);
        if (!staffMember || !staffMember.roles.cache.has(staffRole.id)) return;

        const application = await getVerifyApp(message.guild.id, message.id);
        if (!application) return;

        const member = await message.guild.members.fetch(application.userId);

        if (!member) {
            message.edit(
                new MessageEmbed()
                    .setColor('#ef4949')
                    .setAuthor('Verification', botClient.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setDescription('Automatically Denied: User Left')
                    .setTimestamp()
            );

            return message.reactions.removeAll();
        }

        if (reaction.emoji.id === client.constants.emotes.yes) {
            await message.edit(
                new MessageEmbed()
                    .setColor('#45bb8a')
                    .setAuthor('Verification', botClient.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setTitle(member.user.tag)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setFooter(`Accepted By ${user.username}#${user.discriminator}`, member.user.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setDescription(application.messageContent)
                    .setTimestamp()
            );

            await message.reactions.removeAll();

            await member.roles.remove(nonVerifiedRole.id).catch(() => null);

            await verifyChannel.permissionOverwrites
                .get(application.userId)
                ?.delete()
                .catch(() => null);

            const welcome = guildSettings.welcome;

            if (!welcome.enabled || !welcome.welcomeChannel) return;

            const welcomeChannel = message.guild.channels.cache.get(welcome.welcomeChannel);
            if (!welcomeChannel || !(welcomeChannel instanceof TextChannel)) return;

            const imageBuffer = await drawCard(message.guild, member);

            const card = new MessageAttachment(imageBuffer, `${member.id}_welcome_card.png`);

            return welcomeChannel.send(card);
        } else if (reaction.emoji.id === client.constants.emotes.no) {
            message.edit(
                new MessageEmbed()
                    .setColor('#ef4949')
                    .setAuthor('Verification', botClient.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setTitle(member.user.tag)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setFooter(`Denied By ${user.username}#${user.discriminator}`, user.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setDescription(application.messageContent)
                    .setTimestamp()
            );

            message.reactions.removeAll();

            return verifyChannel.permissionOverwrites
                .get(application.userId)
                ?.delete()
                .catch(() => null);
        }
        return;
    }
    return;
};
