import { AMessage } from '../../../../interfaces/Client';
import { valueType } from '../../../../interfaces/SettingsGroup';
import { PromptManager } from '../../../../interfaces/helpers/PromptManager';
import { GuildMember, Role, TextChannel, VoiceChannel, GuildChannel, User, Message } from 'discord.js';

export const sendSetting = async (message: AMessage, setting: string, valueType: valueType, prompt: PromptManager, array?: boolean) => {
    if (valueType === 'boolean')
        return prompt.boolean(array ? `What would you like to add to \`${setting}\`?` : `What would you like to change ${setting} to?`);

    const GUI = await prompt.sendMsg(
        array ? `What would you like to add to \`${setting}\`?` : `What would you like to change ${setting} to?`,
        `${valueType === 'color' ? '\n\n • [Adobe Color Picker](https://color.adobe.com/create)' : ''}\n\nReply with your answer, or \`cancel\` to cancel.`
    );

    const filter = (msg: AMessage) => {
        return msg.author.id === message.author.id;
    };

    const value = (await GUI.channel.awaitMessages(filter, { max: 1, time: 1000 * 60 * prompt.timeout })).first();

    if (!value) return prompt.error(`You ran out of time!`);

    value.delete({ timeout: 300 }).catch(() => null);

    if (value.content === 'cancel') return prompt.delete();

    return parseType(value as AMessage, valueType, value.content, prompt);
};

export async function parseType(message: Message | AMessage, type: 'number', str: string, prompt: PromptManager): Promise<number | void>;

export async function parseType(message: Message | AMessage, type: 'color', str: string, prompt: PromptManager): Promise<string | void>;

export async function parseType(message: Message | AMessage, type: 'image', str: string, prompt: PromptManager): Promise<string | void>;

export async function parseType(message: Message | AMessage, type: 'string', str: string, prompt: PromptManager): Promise<string | void>;

export async function parseType(message: Message | AMessage, type: 'url', str: string, prompt: PromptManager): Promise<string | void>;

export async function parseType(message: Message | AMessage, type: 'guildMember', str: string, prompt: PromptManager): Promise<GuildMember | void>;

export async function parseType(message: Message | AMessage, type: 'bannedUser', str: string, prompt: PromptManager): Promise<User | void>;

export async function parseType(message: Message | AMessage, type: 'role', str: string, prompt: PromptManager): Promise<Role | void>;

export async function parseType(message: Message | AMessage, type: 'textChannel', str: string, prompt: PromptManager): Promise<TextChannel | void>;

export async function parseType(message: Message | AMessage, type: 'voiceChannel', str: string, prompt: PromptManager): Promise<VoiceChannel | void>;

export async function parseType(message: Message | AMessage, type: 'guildChannel', str: string, prompt: PromptManager): Promise<GuildChannel | void>;

export async function parseType(message: Message | AMessage, type: 'boolean', str: string, prompt: PromptManager): Promise<boolean | void>;

export async function parseType(message: Message | AMessage, type: 'snowflake', str: string, prompt: PromptManager): Promise<string | void>;

export async function parseType(message: Message | AMessage, type: 'timeLength', str: string, prompt: PromptManager): Promise<number | void>;

export async function parseType(
    message: Message | AMessage,
    type: valueType,
    str: string,
    prompt: PromptManager
): Promise<number | string | GuildMember | Role | VoiceChannel | GuildChannel | boolean | User | void>;

export async function parseType(
    message: Message | AMessage,
    type: valueType,
    str: string,
    prompt: PromptManager
): Promise<number | string | GuildMember | Role | VoiceChannel | GuildChannel | boolean | User | void> {
    switch (type) {
        case 'number':
            return prompt.parse.number(str);
        case 'color':
            return prompt.parse.color(str);
        case 'image':
            return prompt.parse.image(message, str);
        case 'string':
            return str;
        case 'url':
            return prompt.parse.url(str);
        case 'guildMember':
            if (!message.guild) return;

            return prompt.parse.member(message.guild, str);
        case 'bannedUser':
            if (!message.guild) return;

            return prompt.parse.bannedUser(message.guild, str);
        case 'role':
            if (!message.guild) return;

            return prompt.parse.role(message.guild, str);
        case 'textChannel':
            if (!message.guild) return;

            return prompt.parse.textChannel(message.guild, str);
        case 'voiceChannel':
            if (!message.guild) return;

            return prompt.parse.voiceChannel(message.guild, str);
        case 'guildChannel':
            if (!message.guild) return;

            return prompt.parse.guildChannel(message.guild, str);
        case 'boolean':
            return prompt.parse.boolean(str);
        case 'snowflake':
            return prompt.parse.snowflake(str);
        case 'timeLength':
            return prompt.parse.timeLength(str);
        default:
            return;
    }
}
