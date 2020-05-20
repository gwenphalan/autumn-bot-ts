import { Client } from '../interfaces/Client';
import { GuildMember, TextChannel, MessageAttachment } from 'discord.js';
import { drawCard } from '../util/canvas';
import { toCamelCase } from '../util';

export default async (client: Client, member: GuildMember) => {
    const guild = member.guild;

    const guildSettings = await client.settings(guild.id);

    if (!guildSettings) return;

    if (guildSettings.verification.enabled) {
        const verification = guildSettings.verification;
        const verifyChannel = guild.channels.cache.get(verification.verifyChannel);
        const nonVerifiedRole = guild.roles.cache.get(verification.nonVerifiedRole);

        if (!verifyChannel || !nonVerifiedRole || !(verifyChannel instanceof TextChannel)) return;
        if (member.user.bot) return;

        member.roles.add(nonVerifiedRole);
    }

    if (guildSettings.general.memberRole) {
        const verification = guildSettings.verification;
        const verifyChannel = guild.channels.cache.get(verification.verifyChannel);
        const nonVerifiedRole = guild.roles.cache.get(verification.nonVerifiedRole);
        const staffRole = guild.roles.cache.get(verification.staffRole);
        const modVerifyChannel = guild.channels.cache.get(verification.modVerifyChannel);

        if (verifyChannel && nonVerifiedRole && verifyChannel instanceof TextChannel && !member.user.bot) return;
        if (staffRole && modVerifyChannel && modVerifyChannel instanceof TextChannel && !member.user.bot) return;

        const memberRole = guild.roles.cache.get(guildSettings.general.memberRole);

        if (!memberRole) return;

        member.roles.add(memberRole);
    }

    const welcome = guildSettings.welcome;

    if (welcome.enabled && welcome.welcomeChannel) {
        const verification = guildSettings.verification;
        const verifyChannel = guild.channels.cache.get(verification.verifyChannel);
        const nonVerifiedRole = guild.roles.cache.get(verification.nonVerifiedRole);
        const staffRole = guild.roles.cache.get(verification.staffRole);
        const modVerifyChannel = guild.channels.cache.get(verification.modVerifyChannel);

        if (verifyChannel && nonVerifiedRole && verifyChannel instanceof TextChannel) return;
        if (staffRole && modVerifyChannel && modVerifyChannel instanceof TextChannel) return;

        const welcomeChannel = guild.channels.cache.get(welcome.welcomeChannel);
        if (!welcomeChannel || !(welcomeChannel instanceof TextChannel)) return;

        const imageBuffer = await drawCard(guild, member);

        const card = new MessageAttachment(imageBuffer, `${toCamelCase(member.displayName)}WelcomeCard.png`);

        await welcomeChannel.send(card);
        return welcomeChannel.send(member.toString()).then(msg => msg.delete({ timeout: 100 }));
    }
    return;
};
