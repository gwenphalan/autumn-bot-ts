import { Client } from '../interfaces/Client';
import { TextChannel, MessageEmbed } from 'discord.js';
import { updateActivity, startTasks } from '../index';
import { Logger } from '../Logger';
import { BotInfo, CommandInfo } from '../database/schemas/BotInfo';

export default async (client: Client) => {
    // Log useful info to the console
    Logger.print(`Connected to Discord as ${client.user!.tag} - ${client.user!.id}`, 'Bot');
    Logger.print(`Serving ${client.guilds.cache.size} guilds and ${client.channels.cache.size} channels.`, 'Bot');
    Logger.print(`Default prefix: ${client.config.defaultPrefix}`, 'Bot');

    // Get the info channel
    const infoChannel = client.channels.cache.get(client.config.infoChannel) || (await client.channels.fetch(client.config.infoChannel));
    if (!infoChannel || !(infoChannel instanceof TextChannel)) throw new Error('Provided info channel is unreachable or not a text channel.');

    const embed = new MessageEmbed()
        .setAuthor('Bot Information', client.user?.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setColor(client.config.accentColor)
        .setTitle(`Bot Ready`)
        .setDescription(
            ` • **Connected As:** ${client.user!.tag} (${client.user!.id})\n • **Guilds:** ${client.guilds.cache.size}\n • **Channels:** ${
                client.channels.cache.size
            }\n • **Default Prefix:** ${client.config.defaultPrefix}`
        );
    // Send useful info to the info channel
    infoChannel.send(embed);
    updateActivity();
    startTasks();

    if (!client.user) return;

    const info = (await BotInfo.find())[0];

    const commands: CommandInfo[] = client.commands
        .filter(command => !command.devOnly)
        .map(command => {
            return {
                name: command.name,
                category: command.category,
                description: command.description,
                aliases: command.aliases,
                args: command.args,
                guildOnly: command.guildOnly,
                NSFW: command.NSFW,
                userPermissions: command.userPermissions,
                botPermissions: command.botPermissions
            };
        });

    info.commands = commands;
    info.botId = client.user?.id;
    info.name = client.user?.username;

    await info.save();
};
