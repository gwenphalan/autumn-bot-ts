import { AMessage, Client } from '../interfaces/Client';
import { TextChannel, DMChannel, NewsChannel, User, MessageEmbed, Message } from 'discord.js';

export class PromptManager {
    readonly client: Client;
    readonly channel: TextChannel | DMChannel | NewsChannel;
    readonly user: User;
    module?: string;
    GUI?: AMessage;

    constructor(client: Client, user: User, channel: TextChannel | DMChannel | NewsChannel, module?: string) {
        this.client = client;
        this.user = user;
        this.channel = channel;
        this.module = module;
    }

    private async init() {
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

    private async sendMsg(title?: string, body?: string): Promise<AMessage> {
        const embed = new MessageEmbed().setColor(this.client.config.accentColor).setTimestamp();

        if (title) embed.setTitle(title);
        if (body) embed.setDescription(body);
        if (this.module) embed.setAuthor(this.module, this.client.user?.displayAvatarURL({ format: 'png', dynamic: true }));

        return this.sendEmbed(embed);
    }

    private async cancel(): Promise<void> {
        const embed = new MessageEmbed().setColor('#DB6260').setTimestamp().setTitle('Canceled');
        if (this.module) embed.setAuthor(this.module, this.client.user?.displayAvatarURL({ format: 'png', dynamic: true }));

        this.sendEmbed(embed);

        return;
    }

    private async error(message: string): Promise<void> {
        const embed = new MessageEmbed().setColor('#DB6260').setTimestamp().setTitle('Uh Oh!').setDescription(message);
        if (this.module) embed.setAuthor(this.module, this.client.user?.displayAvatarURL({ format: 'png', dynamic: true }));

        this.sendEmbed(embed);

        return;
    }

    async delete() {
        this.GUI?.delete();
    }

    async string(question: string, timeout: number): Promise<string | void> {
        await this.sendMsg(question, `Type \`cancel\` to cancel at any time.`);

        const input = (await this.channel.awaitMessages((msg: Message) => msg.author.id === this.user.id, { max: 1, time: 1000 * 60 * timeout })).first();

        if (!input) return this.error('You ran out of time!');

        input.delete({ timeout: 100 }).catch(() => null);

        if ('cancel'.startsWith(input.content.toLowerCase())) return this.cancel();

        return input.content;
    }
}
