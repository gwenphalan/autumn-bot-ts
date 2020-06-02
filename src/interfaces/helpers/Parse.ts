import color from 'tinycolor2';
import { AMessage } from '../Client';
import Canvas from 'canvas';
import { uploadImgur } from '../../util/imgur';
import { PromptManager } from './PromptManager';
import { GuildMember, Guild, TextChannel, NewsChannel, GuildChannel, Role, VoiceChannel, CategoryChannel, User } from 'discord.js';
import timestring from 'timestring';

const linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const memberFilterInexact = (search: string) => (mem: GuildMember) =>
    mem.displayName.toLowerCase().includes(search.toLowerCase()) || mem.user.tag.toLowerCase().includes(search.toLowerCase());

export const channelFilterInexact = (search: string) => (chan: GuildChannel) =>
    chan.name.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(chan.id);

export const roleFilterInexact = (search: string) => (role: Role) =>
    search.toLowerCase().includes(role.id) ||
    role.name.toLowerCase().includes(search.toLowerCase()) ||
    role.toString().toLowerCase().includes(search.toLowerCase());

interface Ban {
    reason: string;
    user: User;
}

export const bannedMemberFilterInexact = (search: string) => (ban: Ban) =>
    ban.user.username.toLowerCase().includes(search.toLowerCase()) ||
    ban.user.tag.toLowerCase().includes(search.toLowerCase()) ||
    search.toLowerCase().includes(ban.user.id);
export class Parse {
    prompt: PromptManager;

    constructor(prompt: PromptManager) {
        this.prompt = prompt;
    }

    async number(str: string): Promise<number | void> {
        const number = str.match(/\d+/);

        if (!number) return this.prompt.error(`${str} is not a valid number!`);

        return parseInt(number[0]);
    }

    async color(str: string): Promise<string | void> {
        const colorData = color(str);

        if (!colorData.isValid()) return this.prompt.error(`${str} is not a valid color!`);

        return colorData.toHexString();
    }

    async url(str: string): Promise<string | void> {
        const url = str.match(linkRegex);

        if (!url) return this.prompt.error(`${str} is not a valid URL!`);

        return url[0];
    }

    async boolean(str: string): Promise<string | void> {
        const bool = str.match(/(true|false)/gi);

        if (!bool) return this.prompt.error(`${str} is not a valid URL!`);

        return bool[0];
    }

    async snowflake(str: string): Promise<string | void> {
        const snowflake = str.match(/\d{17,19}/gi);

        if (!snowflake) return this.prompt.error(`${str} is not a valid ID!`);

        return snowflake[0];
    }

    async timeLength(str: string): Promise<number | void> {
        try {
            const time = timestring(str, 'ms');
            return time;
        } catch (err) {
            return;
        }
    }

    async image(message: AMessage, str: string): Promise<string | void> {
        let imageUrl;
        const urlSearch = str.match(/https?\:\/\/.*\..*.(gif|png|web(p|m)|jpe?g)/gi);

        if (urlSearch) imageUrl = urlSearch[0];
        else if (message.attachments.first()) imageUrl = message.attachments.first()?.url;
        if (!imageUrl) return this.prompt.error(`${urlSearch ? `${urlSearch[0]} is not a valid image URL!` : `You didn't provide an image!`}`);

        const image = await Canvas.loadImage(imageUrl);

        const canvas = Canvas.createCanvas(image.width * (500 / image.height), 500);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const buffer = canvas.toBuffer();

        const link = await uploadImgur(buffer);
        return link;
    }

    async member(guild: Guild, str: string): Promise<GuildMember | void> {
        const members = guild.members.cache;

        const result = members.filter(memberFilterInexact(str));

        const member = result.first();

        if (result.size === 1) return member;

        if (result.size > 1) {
            const members: GuildMember[] = [];

            result.each((m: GuildMember) => members.push(m));

            const reply = await this.prompt.options(
                'Multiple Members Found',
                members.map(m => `${m}`)
            );

            if (!reply) return;

            return members[reply.index];
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }

    async bannedUser(guild: Guild, str: string): Promise<User | void> {
        const bans = await guild.fetchBans();

        const result = bans.filter(bannedMemberFilterInexact(str));

        const member = result.first()?.user;

        if (result.size === 1) return member;

        if (result.size > 1) {
            const users: User[] = [];

            result.each((m: Ban) => users.push(m.user));

            const reply = await this.prompt.options(
                'Multiple Members Found',
                users.map(m => `${m.username}#${m.discriminator}`)
            );

            if (!reply) return;

            return users[reply.index];
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }

    async role(guild: Guild, str: string): Promise<Role | void> {
        const roles = guild.roles.cache;

        const result = roles.filter(roleFilterInexact(str));

        const role = result.first();

        if (result.size === 1) return role;

        if (result.size > 1) {
            const roles: Role[] = [];

            result.each((r: Role) => roles.push(r));

            const reply = await this.prompt.options(
                'Multiple Roles Found',
                roles.map(r => `${r}`)
            );

            if (!reply) return;

            return roles[reply.index];
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }

    async guildChannel(guild: Guild, str: string): Promise<GuildChannel | void> {
        const channels = guild.channels.cache;

        const result = channels.filter(channelFilterInexact(str));

        const channel = result.first();

        if (result.size === 1) return channel;

        if (result.size > 1) {
            const channels: GuildChannel[] = [];

            result.each((c: GuildChannel) => channels.push(c));

            const reply = await this.prompt.options(
                'Multiple Channels Found',
                channels.map(c => `${c}`)
            );

            if (!reply) return;

            const c = channels[reply.index];

            return c;
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }

    async voiceChannel(guild: Guild, str: string): Promise<VoiceChannel | void> {
        const channels = guild.channels.cache;

        const result = channels.filter(channelFilterInexact(str));

        const channel = result.first();

        if (result.size === 1) {
            if (!(channel instanceof VoiceChannel)) return this.prompt.error(`${channel} is not a Voice Channel!`);
            return channel;
        }

        if (result.size > 1) {
            const channels: GuildChannel[] = [];

            result.each((c: GuildChannel) => channels.push(c));

            const reply = await this.prompt.options(
                'Multiple Channels Found',
                channels.map(c => `${c}`)
            );

            if (!reply) return;

            const c = channels[reply.index];

            if (!(c instanceof VoiceChannel)) return this.prompt.error(`${c} is not a Text Channel!`);

            return c;
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }

    async categoryChannel(guild: Guild, str: string): Promise<CategoryChannel | void> {
        const channels = guild.channels.cache;

        const result = channels.filter(channelFilterInexact(str));

        const channel = result.first();

        if (result.size === 1) {
            if (!(channel instanceof CategoryChannel)) return this.prompt.error(`${channel} is not a Category!`);
            return channel;
        }

        if (result.size > 1) {
            const channels: GuildChannel[] = [];

            result.each((c: GuildChannel) => channels.push(c));

            const reply = await this.prompt.options(
                'Multiple Channels Found',
                channels.map(c => `${c}`)
            );

            if (!reply) return;

            const c = channels[reply.index];

            if (!(c instanceof CategoryChannel)) return this.prompt.error(`${c} is not a Category!`);

            return c;
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }

    async textChannel(guild: Guild, str: string): Promise<TextChannel | NewsChannel | void> {
        const channels = guild.channels.cache;

        const result = channels.filter(channelFilterInexact(str));

        const channel = result.first();

        if (result.size === 1) {
            if (!(channel instanceof TextChannel) && !(channel instanceof NewsChannel)) return this.prompt.error(`${channel} is not a Text Channel!`);
            return channel;
        }

        if (result.size > 1) {
            const channels: GuildChannel[] = [];

            result.each((c: GuildChannel) => channels.push(c));

            const reply = await this.prompt.options(
                'Multiple Channels Found',
                channels.map(c => `${c}`)
            );

            if (!reply) return;

            const c = channels[reply.index];

            if (!(c instanceof TextChannel) && !(c instanceof NewsChannel)) return this.prompt.error(`${c} is not a Text Channel!`);

            return c;
        } else {
            return this.prompt.error(`I couldn't find ${str}`);
        }
    }
}
