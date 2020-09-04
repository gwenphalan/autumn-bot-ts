import { MessageEmbed, TextChannel, EmbedField, NewsChannel, DMChannel } from 'discord.js';
import { Command, AMessage } from '../../interfaces/Client';
import { getGuildSettings } from '../../database';
import { uploadHaste, fetchHaste } from '../../util/hastebin';
import { client } from '../../index';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (
    message: AMessage,
    args: { action?: 'edit' | 'copy' | 'create' | 'paste'; channel?: TextChannel | NewsChannel | DMChannel; id?: string },
    prompt: PromptManager
) => {
    // * Load Guild Settings
    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild?.id) : null;
    const prefix = guildSettings?.general?.prefix || message.client.config.defaultPrefix;

    if (!message.guild) return;

    let embed = new MessageEmbed();

    const act = args.action;
    let channel = args.channel;
    const id = args.id;

    if (act === 'create' || !act) {
        if (!channel) channel = message.channel;

        const msg = await channel.send(embed);

        embed
            .setColor('#2f3136')
            .setTitle('Custom Embed')
            .setDescription(`You can customize this embed by doing the command \`${prefix}embed edit ${msg.channel.toString()} ${msg.id}\``)
            .setFooter(`ID: ${msg.id}`);

        await msg.edit(embed);

        if (channel !== message.channel) {
            await prompt.embed(
                'Embed Created',
                `You can customize the new embed by doing the command \`${prefix}embed edit ${msg.channel.toString()} ${msg.id}\``
            );
        }
    } else if (act === 'edit') {
        if (!channel) return prompt.error(`Please provide a text channel!`);

        if (!id) return prompt.error(`Please provide a message ID!`);

        const msg = await channel.messages.fetch(id).catch(() => null);

        if (!msg) return prompt.error(`I couldn't find message with ID \`${id}\` in ${channel.toString()}!`);

        if (msg.author.id !== client.user?.id) return prompt.error(`I can't edit a message I didn't send!`);

        embed = msg.embeds[0];

        if (!msg.embeds.length) return prompt.error(`Message with ID \`${id}\` does not have an embed!`);

        type embedAction =
            | 'setTitle'
            | 'setURL'
            | 'setDescription'
            | 'addField'
            | 'removeField'
            | 'editField'
            | 'setAuthor'
            | 'setFooter'
            | 'setImage'
            | 'setThumbnail'
            | 'setColor';

        const embedActions: embedAction[] = [
            'setTitle',
            'setURL',
            'setDescription',
            'addField',
            'removeField',
            'editField',
            'setAuthor',
            'setFooter',
            'setImage',
            'setThumbnail',
            'setColor'
        ];

        const answer = await prompt.options('Which action would you like to perform on the embed?', embedActions);
        if (!answer) return;

        const action = answer.choice;

        if (action === 'setTitle') {
            const title = await prompt.string('What would you like to set the title to?', true);
            if (!title) return;
            embed.setTitle(title !== 'none' ? title : '');
        } else if (action === 'setURL') {
            const url = await prompt.url('What would you like to set the URL to?', true);
            if (!url) return;
            embed.setURL(url !== 'none' ? url : '');
        } else if (action === 'setDescription') {
            const desc = await prompt.string('What would you like to set the description to?', true);
            if (!desc) return;
            embed.setDescription(desc !== 'none' ? desc : '');
        } else if (action === 'addField') {
            const name = await prompt.string('What would you like to set the name to be?');
            if (!name) return;
            const value = await prompt.string('What would you like to set the name to be?');
            if (!value) return;
            const inline = await prompt.boolean('Would you like the field to be inline?');
            if (!inline && inline !== false) return;
            embed.addField(name, value, inline);
        } else if (action === 'removeField') {
            const options: string[] = [];
            if (!embed.fields.length) return prompt.error(`Embed with ID \`${id}\` doesn't have any fields to remove!`);
            if (embed.fields.length === 1) {
                embed.fields = [];
            } else {
                embed.fields.forEach(field => options.push(`\n**Name**: ${field.name}\n**Value**: ${field.value}\n**Inline**: ${field.inline}`));
                const reply = await prompt.options('Which field would you like to remove?', options);
                if (!reply) return;

                const fields = embed.fields;

                const a = fields.indexOf(fields[reply.index], 0);

                if (a > -1) {
                    fields.splice(a, 1);
                }

                embed.fields = fields;
            }
        } else if (action === 'editField') {
            const options: string[] = [];
            if (!embed.fields.length) return prompt.error(`Embed with ID \`${id}\` doesn't have any fields to edit!`);

            let index = 0;
            if (embed.fields.length > 1) {
                embed.fields.forEach(field => options.push(`\n**Name**: ${field.name}\n**Value**: ${field.value}\n**Inline**: ${field.inline}`));
                const reply = await prompt.options('Which field would you like to edit?', options);

                if (!reply) return;

                index = reply.index;
            }
            const name = await prompt.string('What would you like to set the name to be?', true);
            if (!name) return;
            const value = await prompt.string('What would you like to set the name to be?', true);
            if (!value) return;
            const inline = await prompt.boolean('Would you like the field to be inline?');
            if (!inline && inline !== false) return;
            const oldField = embed.fields[index];
            const field: EmbedField = {
                name: name !== 'none' ? name : oldField.name,
                value: value !== 'none' ? value : oldField.value,
                inline: inline
            };
            embed.fields[index] = field;
        } else if (action === 'setAuthor') {
            const name = await prompt.string("What would you like the author's name to be?");
            if (!name) return;
            const avatar = await prompt.image("What would you like the author's avatar to be?", true);
            if (!avatar) return;
            const link = await prompt.url("What would you like the author's link to be?", true);
            if (!link) return;

            embed.setAuthor(name, avatar !== 'none' ? avatar : undefined, link !== 'none' ? link : undefined);
        } else if (action === 'setFooter') {
            const name = await prompt.string('What would you like to set the name to be?');
            if (!name) return;
            const avatar = await prompt.image('What would you like to set the avatar to be?', true);
            if (!avatar) return;

            if (name === 'none') {
                delete embed['footer'];
            } else {
                embed.setFooter(name, avatar !== 'none' ? avatar : undefined);
            }
        } else if (action === 'setImage') {
            const image = await prompt.image('What would you like the image to be?');
            if (!image) return;

            if (image === 'none') {
                delete embed['image'];
            } else {
                embed.setImage(image);
            }
        } else if (action === 'setThumbnail') {
            const image = await prompt.image('What would you like the thumbnail to be?');
            if (!image) return;

            if (image === 'none') {
                delete embed['thumbnail'];
            } else {
                embed.setThumbnail(image);
            }
        } else if (action === 'setColor') {
            const color = await prompt.color('What would you like the color to be?');
            if (!color) return;

            if (color === 'none') {
                embed.setColor('#2f3136');
            } else {
                embed.setColor(color);
            }
        }
        msg.edit(embed);

        prompt.sendMsg('Embed Edited');
        return prompt.delete();
    } else if (act === 'copy') {
        if (!channel) return prompt.error(`Please provide a text channel!`);

        if (!id) return prompt.error(`Please provide a message ID!`);

        const msg = await channel.messages.fetch(id).catch(() => null);

        if (!msg) return prompt.error(`I couldn't find message with ID \`${id}\` in ${channel.toString()}!`);

        if (!msg.embeds.length) return prompt.error(`Message with ID \`${id}\` does not have an embed!`);

        const key = await uploadHaste(JSON.stringify(msg.embeds[0].toJSON()));

        prompt.embed('Embed Copied', `You can paste the embed with \`${prefix}embed paste <channel> ${key}\``);
    } else if (act === 'paste') {
        if (!channel) return prompt.error(`Please provide a text channel!`);

        if (!id) return prompt.error(`Please provide a pasteID!`);

        const paste = await fetchHaste(id);

        if (!paste) return prompt.error(`I couldn't find a copied embed with id \`${id}\`!`);

        embed = JSON.parse(paste);

        channel.send({ embed: embed });

        prompt.embed('Embed Pasted');
    }
    return;
};

export const command: Command = {
    name: 'embed',
    category: 'Utility',
    module: 'Custom Embeds',
    aliases: [],
    description: 'Create/Edit a Message Embed',
    args: [
        {
            name: 'Action',
            key: 'action',
            type: 'string',
            acceptedValues: ['Create', 'Edit', 'Copy', 'Paste'],
            optional: true
        },
        {
            name: 'Channel',
            key: 'channel',
            type: 'textChannel',
            optional: true
        },
        {
            name: 'MessageID/PasteID',
            key: 'id',
            type: 'string',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES', 'ADD_REACTIONS'],
    callback: callback
};
