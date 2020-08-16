import { MessageEmbed } from 'discord.js';
import { Command, Client, AMessage } from '../../interfaces/Client';
import { client } from '../../index';
import { config } from '../../../config';
import { PromptManager } from '../../interfaces/helpers/PromptManager';
import { ArgumentManager } from '../../interfaces/helpers/ArgumentManager';

const bot = client;

const callback = async (message: AMessage, args: { command?: string }, _prompt: PromptManager) => {
    // Get the guild's settings if on a guild and determine the prefix that needs to be used in the help
    const client = message.client as Client;
    const guildSettings = message.guild ? await client.database.guildSettings.findOne({ guild: message.guild.id }) : null;
    const prefix = guildSettings?.general?.prefix || client.config.defaultPrefix;
    const developers = config.developers;

    // Initiate the output embed
    const output = new MessageEmbed()
        .setTimestamp()
        .setColor(message.client.config.accentColor)
        .setAuthor(
            'Help Command',
            bot?.user?.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 512
            })
        );

    // If no arguments are provided, send all commands
    if (!args.command) {
        // Do some Voodoo magic to create an object having all commands sorted by their category
        const commandList: { [key: string]: string[] } = {};
        client.commands.forEach(command => {
            if (command.devOnly && !developers.includes(message.author.id)) return;
            if (!commandList[command.category]) commandList[command.category] = [];
            commandList[command.category].push(`\`${prefix}${command.name}\` - ${command.description || 'This command has no description.'}`);
        });

        const pages: string[] = Object.keys(commandList).map(category => {
            return `**${category}**\n\n${commandList[category].join('\n')}`;
        });

        const book = client.guis.books.new('Help Menu', pages, message.author, message.channel, 1, false, 'INFO');
        await book.init();
        return;
    }

    // Get the command from the provided args
    const commandName = args.command;
    const command = client.commands.find(cmd => cmd.name === commandName || cmd.aliases.includes(commandName));
    if (!command) return message.channel.send('That is not a valid command!');

    const argsManager = new ArgumentManager(command, prefix);

    output
        .setTitle(command.name)
        .setDescription(command.description)
        .addFields([
            { name: 'Usage', value: `${argsManager.usage}` },
            { name: 'Aliases', value: command.aliases.join(', ') || 'This command has no aliases.' }
        ]);

    return message.channel.send(output);
};

export const command: Command = {
    name: 'help',
    category: 'Utility',
    module: 'Help',
    aliases: ['h'],
    description: 'Get a list of all commands or info on a specific command',
    args: [
        {
            name: 'Command Name',
            key: 'command',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['EMBED_LINKS'],
    callback: callback
};
