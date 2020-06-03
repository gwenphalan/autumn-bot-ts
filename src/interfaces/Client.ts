import { Client as DClient, Collection, Message as BaseMessage, PermissionString, MessageEmbed, MessageAttachment } from 'discord.js';
import { config } from '../../config';
import { database } from '../database';
import { client } from '../index';
import { replace } from '../util';
import { getGuildSettings } from '../database';
import constants from '../constants/constants';
import { PromptManager } from './helpers/PromptManager';
import { Args, Argument, ArgumentManager } from './helpers/ArgumentManager';
import { Guild } from './Guild';
// Our custom client adding new properties to the Discord Client
export class Client extends DClient {
    commands: Collection<string, Command> = new Collection(); // Our commands
    config = config; // Store the config on the client for ease of access
    database = database; // Store the database on the client for ease of access
    constants = constants;
    sendEmbed = sendEmbed;
    settings = getGuildSettings;
    PromptManager = PromptManager;
    ArgumentManager = ArgumentManager;
}

export interface Command {
    name: string; // The name of the command
    category: string; // The category of this command, used to separate commands in the help command
    module: string; // The module displayed on prompts
    description: string; // The description of the command
    aliases: string[]; // The aliases of this command, these can be used instead of the name
    args: Argument[];
    devOnly: boolean; // Whether this command should only be usable by developers
    guildOnly: boolean; // Whether this command should only be usable on a guild
    NSFW: boolean;
    userPermissions: PermissionString[];
    botPermissions: PermissionString[];
    callback(message: BaseMessage, args: Args, prompt: PromptManager): Promise<void | BaseMessage>; // The command function
}

export interface AMessage extends BaseMessage {
    client: Client;
    guild: Guild;
}
// Client events, no need to touch these unless new events are added to discord.js
export type ClientEventTypes =
    | 'channelCreate'
    | 'channelDelete'
    | 'channelPinsUpdate'
    | 'channelUpdate'
    | 'debug'
    | 'warn'
    | 'disconnect'
    | 'emojiCreate'
    | 'emojiDelete'
    | 'emojiUpdate'
    | 'error'
    | 'guildBanAdd'
    | 'guildBanRemove'
    | 'guildCreate'
    | 'guildDelete'
    | 'guildUnavailable'
    | 'guildIntegrationsUpdate'
    | 'guildMemberAdd'
    | 'guildMemberAvailable'
    | 'guildMemberRemove'
    | 'guildMembersChunk'
    | 'guildMemberSpeaking'
    | 'guildMemberUpdate'
    | 'guildUpdate'
    | 'inviteCreate'
    | 'inviteDelete'
    | 'message'
    | 'messageDelete'
    | 'messageReactionRemoveAll'
    | 'messageReactionRemoveEmoji'
    | 'messageDeleteBulk'
    | 'messageReactionAdd'
    | 'messageReactionRemove'
    | 'messageUpdate'
    | 'presenceUpdate'
    | 'rateLimit'
    | 'ready'
    | 'invalidated'
    | 'roleCreate'
    | 'roleDelete'
    | 'roleUpdate'
    | 'typingStart'
    | 'userUpdate'
    | 'voiceStateUpdate'
    | 'webhookUpdate'
    | 'shardDisconnect'
    | 'shardError'
    | 'shardReady'
    | 'shardReconnecting'
    | 'shardResume';

type EmbedField = {
    name: string;
    value: any;
    inline?: boolean;
};

// src/interfaces/Client.ts
export const editEmbed = async (
    message: AMessage | BaseMessage,
    module?: string,
    title?: string,
    body?: string,
    thumbnail?: string,
    fields?: EmbedField[],
    color?: string,
    image?: Buffer | string
) => {
    const embedPermission = checkPerm(message, 'EMBED_LINKS');

    const embed = new MessageEmbed().setTimestamp().setColor(color ? color : config.accentColor);

    module ? embed.setAuthor(module, client.user?.displayAvatarURL({ dynamic: true, format: 'png' })) : null;
    title ? embed.setTitle(title) : null;
    body ? embed.setDescription(body) : null;
    thumbnail ? embed.setThumbnail(thumbnail) : null;
    fields?.forEach(field => embed.addField(field.name, field.value, field.inline));

    if (image) {
        const attachment = new MessageAttachment(image, 'attachment.png');

        embed.attachFiles([attachment]);
        embed.setImage('attachment://attachment.png');
    }

    let fieldString = '';
    fields?.forEach(field => (fieldString += `\n\n**${field.name}**\n${field.value}`));
    const text = `**${title}**${body ? `\n\n${body}` : ''}${fieldString}`;

    return await message.edit(embedPermission ? embed : text);
};

export const sendEmbed = async (
    message: AMessage | BaseMessage,
    module?: string,
    title?: string,
    body?: string,
    thumbnail?: string,
    fields?: EmbedField[],
    color?: string,
    footer?: {
        text: any;
        iconURL?: string;
    },
    displayAuthor?: boolean,
    image?: string | Buffer
) => {
    const embedPermission = checkPerm(message, 'EMBED_LINKS');

    const guildSettings = message.guild ? await getGuildSettings(message.guild?.id) : null;

    const embed = new MessageEmbed().setTimestamp().setColor(color ? color : config.accentColor);

    const prefix = guildSettings?.general.prefix;

    const placeholders: { [prop: string]: string } = {
        guildName: message.guild ? message.guild.name : message.author.username,
        username: message.author.username,
        defaultPrefix: config.defaultPrefix,
        prefix: prefix ? prefix : config.defaultPrefix
    };

    footer ? embed.setFooter(replace(footer.text, placeholders), footer.iconURL) : null;

    displayAuthor
        ? embed.setFooter(
              `Requested By ${message.author.username}#${message.author.discriminator}`,
              message.author.displayAvatarURL({ dynamic: true, format: 'png' })
          )
        : null;

    module ? embed.setAuthor(replace(module, placeholders), client.user?.displayAvatarURL({ dynamic: true, format: 'png' })) : null;

    title ? embed.setTitle(replace(title, placeholders)) : null;

    body ? embed.setDescription(replace(body, placeholders)) : null;

    thumbnail ? embed.setThumbnail(thumbnail) : null;

    fields?.forEach(field => embed.addField(replace(field.name, placeholders), replace(field.value, placeholders), field.inline));

    if (image) {
        const attachment = new MessageAttachment(image, 'attachment.png');

        embed.attachFiles([attachment]);
        embed.setImage('attachment://attachment.png');
    }

    let fieldString = '';
    fields?.forEach(field => (fieldString += `\n\n**${replace(field.name, placeholders)}**\n${replace(field.value, placeholders)}`));
    const text = `${title ? `***${replace(title, placeholders)}*` : ''}${body ? `\n\n${replace(body, placeholders)}` : ''}${fieldString}`;

    return await message.channel.send(embedPermission ? embed : text);
};

export const checkPerm = (message: AMessage | BaseMessage, permission: PermissionString) => {
    if (!client.user?.id) return false;
    const member = message?.guild?.members.cache.get(client.user.id);
    if (!member) return false;
    if (message.member && message.channel.type === 'text') {
        if (!message.channel.permissionsFor(member)?.has(permission)) return false;
    }
    return true;
};
