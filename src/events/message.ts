import { Client, sendEmbed, AMessage } from '../interfaces/Client';
import { TextChannel, MessageEmbed, Message, MessageAttachment, PermissionString, DMChannel } from 'discord.js';
import { client as botClient } from '../index';
import { createVerifyApp } from '../database';
import { drawCard } from '../util/canvas';
import { toCamelCase, missingPermissions, nicerPermissions } from '../util';
import { PromptManager } from '../helpers/PromptManager';
import { ArgumentManager } from '../helpers/ArgumentManager';

export default async (client: Client, message: Message) => {
    // We have partials enabled, so we have to make sure the message is fetched
    if (message.partial) message = await message.fetch();

    // Ignore messages from bots
    if (message.author.bot) return;

    // Get the settings for the current guild and use the prefix defined there, or use the default prefix if no settings found.
    const guildSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;
    const guildPrefix = guildSettings?.general?.prefix || client.config.defaultPrefix;
    const prefixRegex = new RegExp(`^(<@!?${client.user!.id}>|${guildPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);
    const pingRegex = new RegExp(`(<@!?${client.user!.id}>)`);
    const matched = message.content.match(prefixRegex);
    const prefix = matched ? matched[0] : null;

    const verification = guildSettings?.verification;

    // Verification Module
    if (guildSettings && guildSettings.verification.enabled) {
        if (!message.guild || !message.member || !verification?.enabled || message.author.bot) return;

        const verifyChannel = verification.verifyChannel ? message.guild.channels.cache.get(verification.verifyChannel) : null;
        const nonVerifiedRole = verification.nonVerifiedRole ? message.guild.roles.cache.get(verification.nonVerifiedRole) : null;
        const staffRole = verification.staffRole ? message.guild.roles.cache.get(verification.staffRole) : null;
        const modVerifyChannel = verification.modVerifyChannel ? message.guild.channels.cache.get(verification.modVerifyChannel) : null;

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

            if (verification.pingStaff) modVerifyChannel.send(staffRole.toString()).then(msg => msg.delete());

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
                .updateOverwrite(
                    message.author,
                    {
                        VIEW_CHANNEL: false
                    },
                    'User requested verification.'
                )
                .catch(() => null);
            return;
        }
    }

    if (guildSettings?.general?.memeResponses) {
        const kek = [
            '<:kekwHands:716365354917429359>',
            '<:sadkek:716365351436288011>',
            '<:KEKW:716365353852207174>',
            '<:kekjpg:716365352262696991>',
            '<:KEKWPog:716736949288697986>',
            '<:KEKW1:716736951696359466><:KEKW2:716736957623042128>\n<:KEKW3:716736956427534397><:KEKW4:716736954313736253>',
            '<:KEKWFAKE:716736955202928726>',
            '<a:KEKWDEAD:716736960294551562>',
            '<:KEKWPRIDE:716736950303850557>',
            '<a:KEKWPLS:716736963591536723>',
            '<:KekWat:716736952371511559>',
            '<a:3KEKW:716736961339064390>'
        ];

        const pog = [
            '<:PogWeird:716762015116558368>',
            '<:PogW:716762009051594752>',
            '<:PogDuck:716762007830921237>',
            '<:Pog1:716762013023338516>',
            '<:PogOmega:716762006199468143>',
            '<:PogE:716762013690363965>',
            '<:PogUUU:716762011001684010>',
            '<:Pog:716762007189323887>',
            '<:PogXD:716762012134146108>'
        ];

        const peepo = [
            '<:WidePeepoHappy1:718186403439050752><:WidePeepoHappy2:718186416030351451><:WidePeepoHappy3:718186413283213454>',
            '<a:pepeDD:718186411970265100>',
            '<:PeepoChick:718187394989424641>',
            '<:PeepoEek:718187395459186758>',
            '<:peepoHappyLove:718187395090219069>',
            '<:peepoggers:718186401891483699>',
            '<:PeepoUmaru:718187395006332988>'
        ];

        const pepe = [
            '<:PepeLaugh:718186414797357116>',
            '<:Pepega:718186418379292733>',
            '<:pepecross:718187394741829723>',
            '<:pepeblush:718187395089956995>',
            '<a:9784_weh_bean:718187393374748703>',
            '<:feelssickman:718187396029481030>',
            '<a:5813_vegan_pepe:718187393110507641>'
        ];

        const emotes: { [meme: string]: string[] } = {
            kek: kek,
            pog: pog,
            pogchamp: pog,
            peepo: peepo,
            pepe: pepe
        };

        for (const meme in emotes) {
            const memes: string[] = emotes[meme];

            if (message.content.toLowerCase().includes(meme) && (!prefix || !message.content.startsWith(prefix)))
                message.channel.send(memes[Math.floor(Math.random() * memes.length)]);
        }
    }

    if (!prefix || !message.content.startsWith(prefix)) return;
    if (!message.content.replace(prefix, '').length && pingRegex.test(prefix))
        return client.sendEmbed(message, 'Prefix', undefined, `My prefix is set to \`${guildPrefix}\`\n\nDo \`${guildPrefix}help\` for a list of commands`);
    // Prepare args
    const argsArray = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = argsArray.shift();
    if (!commandName) return;

    // Find command
    const command = client.commands.get(commandName) || client.commands.find(command => command.aliases.includes(commandName));
    if (!command) return;

    // Check the conditions set in the command
    if (command.devOnly && !client.config.developers.includes(message.author.id)) return;
    if (command.guildOnly && !message.guild) return message.channel.send('This command can only be used on a server!');
    if (command.NSFW && message.channel instanceof TextChannel && !message.channel.nsfw)
        return client.sendEmbed(message, 'NSFW', 'Uh Oh!', `The command \`${prefix}${command.name}\` can only be used in channels marked as **NSFW**!`);

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

    const prompt = new PromptManager(message as AMessage, command.module);

    const argsManager = new ArgumentManager(command, prefix, prompt, message, argsArray.join(' '));

    const args = await argsManager.parseArgs().catch(err => {
        const oops = new MessageEmbed()
            .setTimestamp()
            .setColor(client.config.accentColor)
            .setTitle(`Oops! Something went wrong!`)
            .setDescription(
                "Don't  worry, the developers have been notified and are getting to work on fixing the issue!\n\nIn the meantime, please join the [Autumn Bot Support Server](https://discord.gg/DfByvyN)."
            );
        message.channel.send(oops);
        console.error(err);
        if (err) {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setColor(client.config.accentColor)
                .setTitle(`ERROR`)
                .setDescription(
                    `\`\`\`${err.stack ? err.stack : err}\`\`\`\n\n** • Command: **${command.name}${
                        argsManager.argString ? `\n** • Args: **${argsManager.argString}` : ''
                    }${message.guild ? `\n** • Guild: **${message.guild} (ID: ${message.guild.id})` : ''}\n** • Author: **${message.author.username}#${
                        message.author.discriminator
                    } (ID: ${message.author.id})`
                );
            const errorChannel = client.channels.cache.get(client.config.errorChannel);
            if (!errorChannel || !(errorChannel instanceof TextChannel)) throw new Error('Provided error channel is unreachable or not a text channel.');
            errorChannel.send(embed);
        }
        prompt.delete();
    });

    if (!args) return;

    if (!(message.channel instanceof DMChannel) && !message.channel.permissionsFor(message.guild!.me!)?.has('SEND_MESSAGES')) return;
    // Execute the command and handle any potential errors
    return command
        .callback(message, args || {}, prompt)
        .then(async () => {
            const updatedSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;
            if (updatedSettings && updatedSettings.general?.deleteCommands) await message.delete({ timeout: 10 }).catch(() => null);
            prompt.delete();
        })
        .catch(err => {
            const oops = new MessageEmbed()
                .setTimestamp()
                .setColor(client.config.accentColor)
                .setTitle(`Oops! Something went wrong!`)
                .setDescription(
                    `\`${
                        err.message || err
                    }\`\n\nDon't  worry, the developers have been notified and are getting to work on fixing the issue!\n\nIn the meantime, please join the [Autumn Bot Support Server](https://discord.gg/DfByvyN).`
                );
            message.channel.send(oops);
            console.error(err);
            if (err) {
                const embed = new MessageEmbed()
                    .setTimestamp()
                    .setColor(client.config.accentColor)
                    .setTitle(`ERROR`)
                    .setDescription(
                        `\`\`\`${err.stack ? err.stack : err}\`\`\`\n\n** • Command: **${command.name}${
                            argsManager.argString ? `\n** • Args: **${argsManager.argString}` : ''
                        }${message.guild ? `\n** • Guild: **${message.guild} (ID: ${message.guild.id})` : ''}\n** • Author: **${message.author.username}#${
                            message.author.discriminator
                        } (ID: ${message.author.id})`
                    );
                const errorChannel = client.channels.cache.get(client.config.errorChannel);
                if (!errorChannel || !(errorChannel instanceof TextChannel)) throw new Error('Provided error channel is unreachable or not a text channel.');
                errorChannel.send(embed);
            }
            prompt.delete();
        });
};
