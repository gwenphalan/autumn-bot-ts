import { AMessage, Client } from '../Client';
import {
    TextChannel,
    DMChannel,
    NewsChannel,
    User,
    MessageEmbed,
    Message,
    Role,
    VoiceChannel,
    GuildChannel,
    GuildMember,
    CategoryChannel,
    MessageReaction,
    GuildEmoji,
    ReactionEmoji
} from 'discord.js';
import { Parse } from './Parse';

interface OptionsResponse {
    index: number;
    choice: string;
}
export class PromptManager {
    readonly client: Client;
    readonly channel: TextChannel | DMChannel | NewsChannel;
    readonly user: User;
    timeout: number;
    trigger: AMessage;
    module?: string;
    GUI?: AMessage;
    parse: Parse;

    constructor(trigger: AMessage, module?: string, timeout?: number) {
        this.client = trigger.client;
        this.user = trigger.author;
        this.channel = trigger.channel;
        this.trigger = trigger;
        this.module = module;
        this.timeout = timeout || 5;
        this.parse = new Parse(this);
    }

    private async init(): Promise<AMessage> {
        if (this.GUI) return this.GUI;

        const GUI = await this.channel.send(`<a:loading:${this.client.constants.emotes.aLoading}>`).catch(() => null);

        this.GUI = GUI as AMessage;

        return this.GUI;
    }

    private async sendEmbed(embed: MessageEmbed): Promise<AMessage> {
        let GUI;

        if (this.GUI) {
            GUI = this.GUI;
            this.GUI.edit(embed).catch(() => null);
        } else {
            GUI = await this.init();

            GUI.edit(embed).catch(() => null);
        }

        return GUI;
    }

    async sendMsg(title?: string, body?: string): Promise<AMessage> {
        const embed = new MessageEmbed().setColor(this.client.config.accentColor).setTimestamp();

        if (title) embed.setTitle(title);
        if (body) embed.setDescription(body);
        if (this.module) embed.setAuthor(this.module, this.client.user?.displayAvatarURL({ format: 'png', dynamic: true }));

        return this.sendEmbed(embed);
    }

    async error(message: string): Promise<void> {
        const embed = new MessageEmbed().setColor('#DB6260').setTimestamp().setTitle('Uh Oh!').setDescription(message);
        if (this.module) embed.setAuthor(this.module, this.client.user?.displayAvatarURL({ format: 'png', dynamic: true }));

        this.channel.send(embed);

        return this.delete();
    }

    private async done(): Promise<void> {
        const GUI = await this.init();

        GUI.edit(`<a:loading:${this.client.constants.emotes.aLoading}>`).catch(() => null);
    }

    async delete() {
        this.GUI?.delete().catch(() => null);
    }

    async string(question: string, optional: true): Promise<string | 'none' | void>;

    async string(question: string, optional?: false): Promise<string | void>;

    async string(question: string, optional?: boolean): Promise<string | 'none' | void> {
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        await this.done();

        return input.content;
    }

    async number(question: string): Promise<number | void>;

    async number(question: string, string: true): Promise<string | void>;

    async number(question: string, optional: true): Promise<number | 'none' | void>;

    async number(question: string, string: true, optional: true): Promise<string | 'none' | void>;

    async number(question: string, string: false, optional: true): Promise<number | 'none' | void>;

    async number(question: string, string?: boolean, optional?: boolean): Promise<number | string | 'none' | void> {
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        let number: string | number | void = await this.parse.number(input.content);

        if (!number) return;

        await this.done();

        if (string) number = number.toString();

        return number;
    }

    async url(question: string, optional: true): Promise<string | 'none' | void>;

    async url(question: string, optional?: false): Promise<string | void>;

    async url(question: string, optional?: boolean): Promise<string | 'none' | void> {
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const url = this.parse.url(input.content);

        if (!url) return;

        await this.done();

        return url;
    }

    async boolean(question: string): Promise<boolean | void> {
        const GUI = await this.sendMsg(question, `\nReact with <:leave:${this.client.constants.emotes.leave}> to cancel.`);

        await GUI.react(this.client.constants.emotes.yes);
        await GUI.react(this.client.constants.emotes.no);
        await GUI.react(this.client.constants.emotes.leave);

        const filter = (reaction: MessageReaction, reactionUser: User) =>
            [this.client.constants.emotes.yes, this.client.constants.emotes.no, this.client.constants.emotes.leave].includes(
                reaction.emoji.id || reaction.emoji.name
            ) && reactionUser.id === this.user.id;

        const answer = (await GUI.awaitReactions(filter, { max: 1, time: 1000 * 60 * this.timeout })).first();

        GUI.reactions.removeAll();

        if (!answer) return this.error('You ran out of time!');

        if (answer.emoji.id === this.client.constants.emotes.leave) return;

        await this.done();

        return answer.emoji.id === this.client.constants.emotes.yes;
    }

    async message(question: string, channel: TextChannel | NewsChannel, optional: true): Promise<AMessage | 'none' | void>;

    async message(question: string, channel: TextChannel | NewsChannel, optional?: false): Promise<AMessage | void>;

    async message(question: string, channel: TextChannel | NewsChannel, optional?: boolean): Promise<AMessage | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Message Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const id = await this.parse.snowflake(input.content);

        if (!id) return;

        const message = await channel.messages.fetch(id);

        if (!message) return this.error(`I couldn't find a message with the id \`${id}\` in ${channel}!`);

        await this.done();

        return message as AMessage;
    }

    async textChannel(question: string, optional: true): Promise<TextChannel | NewsChannel | 'none' | void>;

    async textChannel(question: string, optional?: false): Promise<TextChannel | NewsChannel | void>;

    async textChannel(question: string, optional?: boolean): Promise<TextChannel | NewsChannel | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Channel Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const channel = await this.parse.textChannel(this.trigger.guild, input.content);
        if (!channel) return;

        await this.done();

        return channel;
    }

    async voiceChannel(question: string, optional: true): Promise<VoiceChannel | 'none' | void>;

    async voiceChannel(question: string, optional?: false): Promise<VoiceChannel | void>;

    async voiceChannel(question: string, optional?: boolean): Promise<VoiceChannel | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Voice Channel Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const channel = await this.parse.voiceChannel(this.trigger.guild, input.content);
        if (!channel) return;

        await this.done();

        return channel;
    }

    async categoryChannel(question: string, optional: true): Promise<CategoryChannel | 'none' | void>;

    async categoryChannel(question: string, optional?: false): Promise<CategoryChannel | void>;

    async categoryChannel(question: string, optional?: boolean): Promise<CategoryChannel | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Voice Channel Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const channel = await this.parse.categoryChannel(this.trigger.guild, input.content);
        if (!channel) return;

        await this.done();

        return channel;
    }

    async guildChannel(question: string, optional: true): Promise<GuildChannel | 'none' | void>;

    async guildChannel(question: string, optional?: false): Promise<GuildChannel | void>;

    async guildChannel(question: string, optional?: boolean): Promise<GuildChannel | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Voice Channel Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const channel = await this.parse.guildChannel(this.trigger.guild, input.content);
        if (!channel) return;

        await this.done();

        return channel;
    }

    async member(question: string, optional: true): Promise<GuildMember | 'none' | void>;

    async member(question: string, optional?: false): Promise<GuildMember | void>;

    async member(question: string, optional?: boolean): Promise<GuildMember | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Member Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const member = await this.parse.member(this.trigger.guild, input.content);
        if (!member) return;

        await this.done();

        return member;
    }

    async bannedUser(question: string, optional: true): Promise<User | 'none' | void>;

    async bannedUser(question: string, optional?: false): Promise<User | void>;

    async bannedUser(question: string, optional?: boolean): Promise<User | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Banned User Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const member = await this.parse.bannedUser(this.trigger.guild, input.content);
        if (!member) return;

        await this.done();

        return member;
    }

    async role(question: string, optional: true): Promise<Role | 'none' | void>;

    async role(question: string, optional?: false): Promise<Role | void>;

    async role(question: string, optional?: boolean): Promise<Role | 'none' | void> {
        if (this.channel instanceof DMChannel || !this.trigger.guild) throw new Error('Role Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const role = await this.parse.role(this.trigger.guild, input.content);
        if (!role) return;

        await this.done();

        return role;
    }

    async image(question: string, optional: true): Promise<string | 'none' | void>;

    async image(question: string, optional?: false): Promise<string | void>;

    async image(question: string, optional?: boolean): Promise<string | 'none' | void> {
        if (this.channel instanceof DMChannel) throw new Error('Role Prompt Used In DM');
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        await this.done();

        const link = await this.parse.image(input as AMessage, input.content);

        await this.done();

        return link;
    }

    async color(question: string, optional: true): Promise<string | 'none' | void>;

    async color(question: string, optional?: false): Promise<string | void>;

    async color(question: string, optional?: boolean): Promise<string | 'none' | void> {
        if (this.channel instanceof DMChannel) throw new Error('Role Prompt Used In DM');
        await this.sendMsg(question, `• [Adobe Color Picker](https://color.adobe.com/create)\n\nType \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const color = await this.parse.color(input.content);

        await this.done();

        return color;
    }

    async options(question: string, options: string[], optional: true): Promise<OptionsResponse | 'none' | void>;

    async options(question: string, options: string[], optional?: false): Promise<OptionsResponse | void>;

    async options(question: string, options: string[], optional?: boolean): Promise<OptionsResponse | 'none' | void> {
        if (this.channel instanceof DMChannel) throw new Error('Role Prompt Used In DM');

        const opts = options.map((o, i) => `\`${i + 1}\`: ${o}`);

        await this.sendMsg(question, `${opts.join('\n')}\n\nType \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * this.timeout })).first();

        if (!input) return this.error('You ran out of time!');

        await input.delete({ timeout: 100 }).catch(() => null);

        if (input.content.toLowerCase() === 'cancel') return this.delete();

        if (input.content.toLowerCase() === 'none' && optional) return 'none';

        const index = await this.parse.number(input.content);
        if (!index) return;

        if (index > options.length) return this.error(`There's only ${options.length} options!`);

        await this.done();

        return {
            index: index - 1,
            choice: options[index - 1]
        };
    }

    async emoji(question: string): Promise<void | GuildEmoji | ReactionEmoji> {
        const GUI = await this.sendMsg(question, `React with your chosen emoji, or react with <:leave:${this.client.constants.emotes.leave}> to cancel.`);
        const filter = (_reaction: MessageReaction, reactionUser: User) => {
            return reactionUser.id === this.user.id;
        };

        await GUI.react(this.client.constants.emotes.leave);

        const response = await GUI.awaitReactions(filter, { max: 1, time: 1000 * 60 * this.timeout });

        GUI.reactions.removeAll();

        const reply = response.first();

        if (!response || !reply) return this.error('You ran out of time!');

        if (reply?.emoji.id === this.client.constants.emotes.leave) return this.delete();

        await this.done();

        return reply.emoji;
    }
}
