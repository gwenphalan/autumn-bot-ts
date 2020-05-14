import { Client, sendEmbed } from '../interfaces/Client';
import { TextChannel, MessageEmbed, Message } from 'discord.js';

export default async (client: Client, message: Message) => {
    // We have partials enabled, so we have to make sure the message is fetched
    if (message.partial) message = await message.fetch();

    // Ignore messages from bots
    if (message.author.bot) return;

    // Get the settings for the current guild and use the prefix defined there, or use the default prefix if no settings found.
    const guildSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;
    const prefix = guildSettings?.prefix || client.config.defaultPrefix;

    // Check whether message starts with the prefix determined above
    if (!message.content.startsWith(prefix)) return;

    // Prepare args
    const args = message.content.slice(prefix.length).trim().split(' ');
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
    if (message.member && message.channel.type === 'text') {
        if (command.userPermissions && !message.channel.permissionsFor(message.member)?.has(command.userPermissions))
            return sendEmbed(
                message,
                'Commands',
                'Oh No!',
                `You need to have the \`${command.userPermissions}\` permission to run \`${prefix}${command.name}\``
            );
        if (command.botPermissions && !message.channel.permissionsFor(message.member)?.has(command.botPermissions))
            return sendEmbed(message, 'Commands', 'Oh No!', `I need to have the \`${command.userPermissions}\` permission to run \`${prefix}${command.name}\``);
    }
    // Execute the command and handle any potential errors
    return command.callback(message, args).catch(err => {
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
