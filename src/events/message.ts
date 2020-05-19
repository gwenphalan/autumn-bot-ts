import { Client, sendEmbed } from '../interfaces/Client';
import { TextChannel, MessageEmbed, Message, MessageAttachment, PermissionString } from 'discord.js';
import { client as botClient } from '../index';
import { createVerifyApp } from '../database';
import { drawCard } from '../util/canvas';
import { toCamelCase, missingPermissions, nicerPermissions } from '../util';

export default async (client: Client, message: Message) => {
    // We have partials enabled, so we have to make sure the message is fetched
    if (message.partial) message = await message.fetch();

    // Ignore messages from bots
    if (message.author.bot) return;

    // Get the settings for the current guild and use the prefix defined there, or use the default prefix if no settings found.
    const guildSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;
    const guildPrefix = guildSettings?.general.prefix || client.config.defaultPrefix;
    const prefixRegex = new RegExp(`^(<@!?${client.user!.id}>|${guildPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);
    const pingRegex = new RegExp(`(<@!?${client.user!.id}>)`);
    const matched = message.content.match(prefixRegex);
    const prefix = matched ? matched[0] : null;

    const verification = guildSettings?.verification;

    // Verification Module
    if (guildSettings && guildSettings.verification.enabled) {
        if (!message.guild || !message.member || !verification?.enabled || message.author.bot) return;

        const verifyChannel = message.guild.channels.cache.get(verification.verifyChannel);
        const nonVerifiedRole = message.guild.roles.cache.get(verification.nonVerifiedRole);
        const staffRole = message.guild.roles.cache.get(verification.staffRole);
        const modVerifyChannel = message.guild.channels.cache.get(verification.modVerifyChannel);

        if (message.channel.id === verifyChannel?.id) {
            if (!verifyChannel || !nonVerifiedRole || message.channel != verifyChannel || !(verifyChannel instanceof TextChannel)) return;

            if (!message.member.roles.cache.has(nonVerifiedRole.id)) return;
            if (!verification.manualVerify) {
                if (message.content !== `${prefix}verify`)
                    return message.delete({
                        timeout: 50,
                        reason: 'User did not send the verification command.'
                    });

                message.delete({
                    timeout: 50,
                    reason: 'User verified.'
                });
                message.author.send(
                    new MessageEmbed()
                        .setColor('#75F1BD')
                        .setTitle(`${message.guild.name} Verification`)
                        .setDescription(verification.acceptMessage || "You've been verified!")
                );
                message.member.roles.remove(nonVerifiedRole.id);
                const welcome = guildSettings.welcome;

                if (!welcome.enabled || !welcome.welcomeChannel) return;

                const welcomeChannel = message.guild.channels.cache.get(welcome.welcomeChannel);
                if (!welcomeChannel || !(welcomeChannel instanceof TextChannel)) return;

                const imageBuffer = await drawCard(message.guild, message.member);

                const card = new MessageAttachment(imageBuffer, `${toCamelCase(message.member.displayName)}WelcomeCard.png`);
                await welcomeChannel.send(card);
                return welcomeChannel.send(message.author.toString()).then(msg => msg.delete({ timeout: 100 }));
            }
            if (!verification.manualVerify || !staffRole || !modVerifyChannel || !(modVerifyChannel instanceof TextChannel)) return;

            const application = await modVerifyChannel.send(
                new MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('Verification', botClient.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setTitle(message.author.tag)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setFooter(`Awaiting Verification By Staff`)
                    .setDescription(message.content)
                    .setTimestamp()
            );

            modVerifyChannel.send(staffRole.toString()).then(msg => msg.delete());

            await message
                .delete({
                    timeout: 10,
                    reason: 'User requested verification.'
                })
                .catch(() => null);

            await createVerifyApp(message.guild.id, message.author.id, application.id, message.content);

            await application.react(client.constants.emotes.yes);
            await application.react(client.constants.emotes.no);

            await verifyChannel
                .overwritePermissions(
                    [
                        {
                            id: message.author.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ],
                    'User requested verification.'
                )
                .catch(() => null);
            return;
        }
    }
    if (!prefix || !message.content.startsWith(prefix)) return;
    if (!message.content.replace(prefix, '').length && pingRegex.test(prefix))
        return client.sendEmbed(message, 'Prefix', undefined, `My prefix is set to \`${guildPrefix}\`\n\nDo \`${guildPrefix}help\` for a list of commands`);
    // Prepare args
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift();
    if (!commandName) return;

    // Find command
    const command = client.commands.get(commandName) || client.commands.find(command => command.aliases.includes(commandName));
    if (!command) return;

    // Check the conditions set in the command
    if (command.devOnly && !client.config.developers.includes(message.author.id)) return;
    if (command.guildOnly && !message.guild) return message.channel.send('This command can only be used on a server!');
    if (command.NSFW && message.channel instanceof TextChannel && !message.channel.nsfw)
        return client.sendEmbed(message, 'NSFW', 'Uh Oh!', `The command \`${prefix}${command.name}\` can only be used in channels marked as **NSFW**!`);
    if (args.length < command.requiresArgs)
        return message.channel.send(
            `This command requires ${command.requiresArgs} arguments and you only provided ${args.length}.\nPlease use the command like this: \`${prefix}${command.name} ${command.usage}\``
        );

    if (command.botPermissions && missingPermissions(message, command.botPermissions, 'self'))
        return sendEmbed(
            message,
            'Commands',
            'Oh No!',
            `I require the following permissions to use this command: \`${missingPermissions(message, command.botPermissions, 'self')!
                .map((perm: PermissionString) => nicerPermissions(perm))
                .join('`, `')}\``
        );

    if (command.userPermissions && missingPermissions(message, command.userPermissions))
        return sendEmbed(
            message,
            'Commands',
            'Oh No!',
            `You require the following permissions to use this command: \`${missingPermissions(message, command.userPermissions)!
                .map((perm: PermissionString) => nicerPermissions(perm))
                .join('`, `')}\``
        );
    // Execute the command and handle any potential errors
    return command
        .callback(message, args)
        .then(async () => {
            const updatedSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;

            if (updatedSettings && updatedSettings.general.deleteCommands) message.delete({ timeout: 10 }).catch(() => null);
        })
        .catch(err => {
            const oops = new MessageEmbed()
                .setTimestamp()
                .setColor(client.config.accentColor)
                .setTitle(`Oops! Something went wrong!`)
                .setDescription("Don't  worry, the developers have been notified and are getting to work on fixing the issue!");
            message.channel.send(oops);
            console.error(err);
            if (err) {
                const embed = new MessageEmbed()
                    .setTimestamp()
                    .setColor(client.config.accentColor)
                    .setTitle(`ERROR`)
                    .setDescription(err.stack ? err.stack : err);
                const errorChannel = client.channels.cache.get(client.config.errorChannel);
                if (!errorChannel || !(errorChannel instanceof TextChannel)) throw new Error('Provided error channel is unreachable or not a text channel.');
                errorChannel.send(embed);
            }
        });
};
