import { MessageEmbed, TextChannel, EmbedField } from 'discord.js';
import { Command, AMessage } from '../../interfaces/Client';
import { getChannel } from '../../util';
import { getGuildSettings } from '../../database';
import { uploadHaste, fetchHaste } from '../../util/hastebin';
import { client } from '../../index';
import constants from '../../constants/constants';

const callback = async (message: AMessage, args: string[]) => {
    // * Load Guild Settings
    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild?.id) : null;
    const prefix = guildSettings?.general.prefix || message.client.config.defaultPrefix;

    let embed = new MessageEmbed();

    const [arg1, arg2, arg3] = args;

    if (arg1 === 'create') {
        let channel;

        if (arg2) {
            channel = await getChannel(message, args, 'text', 1);
        } else {
            channel = message.channel;
        }

        if (!channel || !(channel instanceof TextChannel))
            return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find \`${arg2}\`! Please provide a valid text channel!`);

        const msg = await channel?.send(embed);

        embed
            .setColor('#2f3136')
            .setTitle('Custom Embed')
            .setDescription(`You can customize this embed by doing the command \`${prefix}embed edit ${msg.channel.toString()} ${msg.id}\``)
            .setFooter(`ID: ${msg.id}`);

        await msg.edit(embed);

        if (channel !== message.channel) {
            await message.client.sendEmbed(
                message,
                'Custom Embeds',
                'Embed Created',
                `You can customize the new embed by doing the command \`${prefix}embed edit ${msg.channel.toString()} ${msg.id}\``
            );
        }
    } else if (arg1 === 'edit') {
        if (!arg2) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a text channel!`);

        const channel = await getChannel(message, args, 'text', 1);

        if (!channel) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find \`${arg2}\`! Please provide a valid text channel!`);
        if (!(channel instanceof TextChannel)) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `\`${arg2}\` is not a text channel!`);

        if (!arg3) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a message ID!`);

        const msg = await channel.messages.fetch(arg3).catch(() => null);

        if (!msg) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find message with ID \`${arg3}\` in ${channel.toString()}!`);

        if (msg.author.id !== client.user?.id) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I can't edit a message I didn't send!`);

        embed = msg.embeds[0];

        if (!msg.embeds.length) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Message with ID \`${arg3}\` does not have an embed!`);

        const GUI = await message.channel.send(`<a:loading:${constants.emotes.aLoading}>`);

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

        const answer = await message.client.sendOptions(GUI, message, 'Which action would you like to perform on the embed?', embedActions);

        if (answer.canceled || !answer.choice) {
            message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
            await GUI.delete({
                timeout: 5000
            }).catch(() => null);
            return;
        }

        const action = answer.choice;

        if (action === 'setTitle') {
            const title = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like to set the title to?',
                    type: 'string',
                    optional: true
                }
            ]);

            if (title.canceled || !title.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            embed.setTitle(title.answers[0] !== 'none' ? title.answers[0] : '');
        } else if (action === 'setURL') {
            const url = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like to set the URL to?',
                    type: 'url',
                    optional: true
                }
            ]);

            if (url.canceled || !url.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            embed.setURL(url.answers[0] !== 'none' ? url.answers[0] : '');
        } else if (action === 'setDescription') {
            const desc = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like to set the description to?',
                    type: 'string',
                    optional: true
                }
            ]);

            if (desc.canceled || !desc.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            embed.setDescription(desc.answers[0] !== 'none' ? desc.answers[0] : '');
        } else if (action === 'addField') {
            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like to set the name to be?',
                    type: 'string',
                    optional: false
                },
                {
                    question: 'What would you like to set the value to be?',
                    type: 'string',
                    optional: false
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const inline = await message.client.sendYesNo(GUI, message.author, 'Would you like the field to be inline?');

            if (inline.canceled) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const [name, value] = answers.answers;

            embed.addField(name, value, inline.reply);
        } else if (action === 'removeField') {
            const options: string[] = [];
            if (!embed.fields.length)
                return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Embed with ID \`${arg3}\` doesn't have any fields to remove!`);
            if (embed.fields.length === 1) {
                embed.fields = [];
            } else {
                embed.fields.forEach(field => options.push(`\n**Name**: ${field.name}\n**Value**: ${field.value}\n**Inline**: ${field.inline}`));
                const reply = await message.client.sendOptions(GUI, message, 'Which field would you like to remove?', options);

                const { canceled, index } = reply;

                if (canceled) {
                    message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                    await GUI.delete({
                        timeout: 5000
                    }).catch(() => null);
                    return;
                }

                const fields = embed.fields;

                const a = fields.indexOf(fields[index], 0);

                if (a > -1) {
                    fields.splice(a, 1);
                }

                embed.fields = fields;
            }
        } else if (action === 'editField') {
            const options: string[] = [];
            if (!embed.fields.length)
                return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Embed with ID \`${arg3}\` doesn't have any fields to edit!`);

            let index = 0;
            if (embed.fields.length > 1) {
                embed.fields.forEach(field => options.push(`\n**Name**: ${field.name}\n**Value**: ${field.value}\n**Inline**: ${field.inline}`));
                const reply = await message.client.sendOptions(GUI, message, 'Which field would you like to edit?', options);

                if (reply.canceled) {
                    message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                    await GUI.delete({
                        timeout: 5000
                    }).catch(() => null);
                    return;
                }

                index = reply.index;
            }

            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like to set the name to be?\n\nReply `none` if you would like this to remain the same.',
                    type: 'string',
                    optional: false
                },
                {
                    question: 'What would you like to set the value to be?\n\nReply `none` if you would like this to remain the same.',
                    type: 'string',
                    optional: false
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const inline = await message.client.sendYesNo(GUI, message.author, 'Would you like the field to be inline?');

            if (inline.canceled) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }
            const oldField = embed.fields[index];

            const [name, value] = answers.answers;

            const field: EmbedField = {
                name: name !== 'none' ? name : oldField.name,
                value: value !== 'none' ? value : oldField.value,
                inline: inline.reply
            };

            embed.fields[index] = field;
        } else if (action === 'setAuthor') {
            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: "What would you like the author's name to be?",
                    type: 'string',
                    optional: false
                },
                {
                    question: "What would you like the author's avatar to be?",
                    type: 'image',
                    optional: true
                },
                {
                    question: "What would you like the author's link to be?",
                    type: 'url',
                    optional: true
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const [name, avatar, link] = answers.answers;

            embed.setAuthor(name, avatar !== 'none' ? avatar : undefined, link !== 'none' ? link : undefined);
        } else if (action === 'setFooter') {
            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like the footer to say?',
                    type: 'string',
                    optional: true
                },
                {
                    question: 'What would you like the icon to be?',
                    type: 'image',
                    optional: true
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const [name, avatar] = answers.answers;

            if (name === 'none') {
                delete embed['footer'];
            } else {
                embed.setFooter(name, avatar !== 'none' ? avatar : undefined);
            }
        } else if (action === 'setImage') {
            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like the image to be?',
                    type: 'image',
                    optional: true
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const image = answers.answers[0];

            if (image === 'none') {
                delete embed['image'];
            } else {
                embed.setImage(image);
            }
        } else if (action === 'setThumbnail') {
            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like the thumbnail to be?',
                    type: 'image',
                    optional: true
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const [image] = answers.answers;

            if (image === 'none') {
                delete embed['thumbnail'];
            } else {
                embed.setThumbnail(image);
            }
        } else if (action === 'setColor') {
            const answers = await message.client.sendQuestions(GUI, message, [
                {
                    question: 'What would you like the color to be?',
                    type: 'color',
                    optional: true
                }
            ]);
            if (answers.canceled || !answers.answers[0]) {
                message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edit Canceled');
                await GUI.delete({
                    timeout: 5000
                }).catch(() => null);
                return;
            }

            const [color] = answers.answers;

            if (color === 'none') {
                embed.setColor('#2f3136');
            } else {
                embed.setColor(color);
            }
        }
        msg.edit(embed);

        message.client.editEmbed(GUI, 'Custom Embeds', 'Embed Edited');

        await GUI.delete({
            timeout: 5000
        }).catch(() => null);
        return;
    } else if (arg1 === 'copy') {
        if (!arg2) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a text channel!`);

        const channel = await getChannel(message, args, 'text', 1);

        if (!channel) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find \`${arg2}\`! Please provide a valid text channel!`);
        if (!(channel instanceof TextChannel)) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `\`${arg2}\` is not a text channel!`);

        if (!arg3) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a message ID!`);

        const msg = await channel.messages.fetch(arg3).catch(() => null);

        if (!msg) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find message with ID \`${arg3}\` in ${channel.toString()}!`);

        if (!msg.embeds.length) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Message with ID \`${arg3}\` does not have an embed!`);

        const key = await uploadHaste(JSON.stringify(msg.embeds[0].toJSON()));

        message.client.sendEmbed(message, 'Custom Embeds', 'Embed Copied', `You can paste the embed with \`${prefix}embed paste <channel> ${key}\``);
    } else if (arg1 === 'paste') {
        if (!arg2) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a text channel!`);

        const channel = await getChannel(message, args, 'text', 1);

        if (!channel) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find \`${arg2}\`! Please provide a valid text channel!`);
        if (!(channel instanceof TextChannel)) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `\`${arg2}\` is not a text channel!`);

        if (!arg3) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a pasteID!`);

        const paste = await fetchHaste(arg3);

        if (!paste) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find a copied embed with id \`${arg3}\`!`);

        try {
            embed = JSON.parse(paste);
        } catch (err) {
            message.client.sendEmbed(message, undefined, 'Error', err);
            return console.log(err);
        }

        channel.send({ embed: embed });

        const response = await message.client.sendEmbed(message, 'Custom Embeds', 'Embed Pasted');
        await response
            .delete({
                timeout: 5000
            })
            .catch(() => null);
    }
    return;
};

export const command: Command = {
    name: 'embed',
    category: 'Utility',
    aliases: [],
    description: 'Create/Edit a Message Embed',
    usage: '<Create | Edit | Copy> <TextChannel> <MessageID | PasteID>',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['EMBED_LINKS'],
    callback: callback
};
