import { Client } from '../interfaces/Client';
import { Message } from 'discord.js';

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
    if (args.length < command.requiresArgs)
        return message.channel.send(
            `This command requires ${command.requiresArgs} arguments and you only provided ${args.length}.\nPlease use the command like this: \`${prefix}${command.name} ${command.usage}\``
        );
    if (message.member && message.channel.type === 'text') {
        if (command.userPermissions && !message.channel.permissionsFor(message.member)?.has(command.userPermissions))
            return message.channel.send(`This command requires you to have the \`${command.userPermissions}\` Permission!`);
        if (command.botPermissions && !message.channel.permissionsFor(message.member)?.has(command.botPermissions))
            return message.channel.send(`I need the \`${command.botPermissions}\` Permission to use this command!`);
    }

    // Execute the command and handle any potential errors
    return command.callback(message, args).catch(err => {
        message.reply('Sorry, something went wrong.');
        console.error(err);
    });
};
