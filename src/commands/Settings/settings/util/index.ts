import { AMessage, editEmbed, tryAgain, sendOptions } from '../../../../interfaces/Client';
import { Message as BaseMessage, User, GuildChannel, Role } from 'discord.js';
import { valueType } from '../../../../interfaces/SettingsGroup';
import { TextChannel, VoiceChannel, GuildMember, MessageReaction, MessageEmbed } from 'discord.js';
import Color from 'color';
import Canvas from 'canvas';
import { uploadImgur } from '../../../../util/imgur';

export const sendSetting = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, setting: string, valueType: valueType, array?: boolean) => {
    let canceled = false;
    let invalid = false;
    let answer = null;
    let response: any = null;

    if (valueType === 'boolean') {
        const bool = await sendYesNoSetting(GUI, message.author, setting);
        if (bool.canceled)
            return {
                answer: null,
                canceled: true
            };

        answer = bool.reply;

        return {
            answer: answer,
            canceled: canceled
        };
    } else {
        for (let x = 0; x < 4; x++) {
            if (canceled) {
                answer = null;
                return {
                    answer: answer,
                    canceled: canceled
                };
            } else if (!invalid && answer) {
                return {
                    answer: answer,
                    canceled: canceled
                };
            } else if (invalid) {
                const retry = await tryAgain(GUI, message.author, response, valueType);

                if (retry) {
                    answer = null;
                    invalid = false;
                } else {
                    canceled = true;
                }
            } else {
                await editEmbed(
                    GUI,
                    'Settings',
                    array ? `What would you like to add to \`${setting}\`?` : `What would you like to change ${setting} to?`,
                    `${
                        valueType === 'color' ? '\n\n • [Adobe Color Picker](https://color.adobe.com/create)' : ''
                    }\n\nReply with your answer, or \`cancel\` to cancel.`
                );

                const filter = (msg: AMessage) => {
                    return msg.author.id === message.author.id;
                };

                const value = (await GUI.channel.awaitMessages(filter, { max: 1, time: 120000 })).first();

                await GUI.edit(new MessageEmbed());

                const content = value ? value.content : null;

                const attachment = value?.attachments.first() ? value.attachments.first() : null;

                if (content || attachment) {
                    response = content ? content : attachment ? attachment.url : null;
                }

                if (response === 'cancel') {
                    answer = null;
                    canceled = true;
                }

                answer = await parseType(GUI, message, valueType, response);

                if (answer === 'canceled') {
                    answer = null;
                    canceled = true;
                }

                if (!answer) {
                    invalid = true;
                }

                if (value)
                    value
                        .delete({
                            timeout: 10
                        })
                        .catch(() => null);
            }
        }
        return {
            answer: answer,
            canceled: canceled
        };
    }
};

const linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const parseType = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, type: valueType, str: string) => {
    switch (type) {
        case 'number':
            const number = str.match(/\d+/);
            return number ? number[0] : null;
        case 'color':
            try {
                return Color(str).hex();
            } catch (err) {
                if (err) return null;
            }
        case 'image':
            let imageUrl;
            const urlSearch = str.match(/https?\:\/\/.*\..*.(gif|png|web(p|m)|jpe?g)/gi);

            if (urlSearch) imageUrl = urlSearch[0];
            else if (message.attachments.first()) imageUrl = message.attachments.first()?.url;
            if (!imageUrl) return null;

            const image = await Canvas.loadImage(imageUrl);

            const canvas = Canvas.createCanvas(image.width * (500 / image.height), 500);
            const ctx = canvas.getContext('2d');

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const buffer = canvas.toBuffer();

            const link = await uploadImgur(buffer);
            return link;
        case 'string':
            return str || null;
        case 'url':
            const url = str.match(linkRegex);
            return url ? url[0] : null;
        case 'guildMember':
            const member = await getMember(GUI, message, str);
            if (member === 'canceled') return 'canceled';
            return member ? member : null;
        case 'role':
            const role = await getRole(GUI, message, str);
            if (role === 'canceled') return 'canceled';
            return role ? role : null;
        case 'textChannel':
            const textChannel = await getTextChannel(GUI, message, str);
            if (textChannel === 'canceled') return 'canceled';
            return textChannel ? textChannel : null;
        case 'voiceChannel':
            const voiceChannel = await getVoiceChannel(GUI, message, str);
            if (voiceChannel === 'canceled') return 'canceled';
            return voiceChannel ? voiceChannel : null;
        case 'guildChannel':
            const channel = await getGuildChannel(GUI, message, str);
            if (channel === 'canceled') return 'canceled';
            return channel ? channel : null;
        case 'boolean':
            const bool = str.match(/(true|false)/gi);
            return bool ? bool[0] === 'true' : null;
        case 'snowflake':
            const snowflake = str.match(/\d{17,19}/gi);
            return snowflake ? snowflake[0] : null;
        default:
            return null;
    }
};

const sendYesNoSetting = async (message: AMessage | BaseMessage, user: User, setting: string) => {
    await editEmbed(message, 'Settings', `What would you like to set \`${setting}\` to?`, `\n\nReact with <:leave:710930994060066818> to cancel.`);
    let reply = false;
    let canceled = false;

    await message.react('709981119721766955');
    await message.react('709981096066023444');
    await message.react('710930994060066818');

    const filter = (reaction: MessageReaction, reactionUser: User) =>
        ['709981119721766955', '709981096066023444', '710930994060066818'].includes(reaction.emoji.id || reaction.emoji.name) && reactionUser.id === user.id;

    const answer = (await message.awaitReactions(filter, { max: 1, time: 60000 })).first();

    switch (answer?.emoji.id || answer?.emoji.name) {
        case '709981119721766955':
            reply = true;
            break;
        case '709981096066023444':
            reply = false;
            break;
        case '710930994060066818':
            canceled = false;
            break;
        default:
            reply = false;
            canceled = true;
            break;
    }

    message.reactions.removeAll();

    return {
        reply: reply,
        canceled: canceled
    };
};

const memberFilterInexact = (search: string) => (mem: GuildMember) =>
    mem.displayName.toLowerCase().includes(search.toLowerCase()) || mem.user.tag.toLowerCase().includes(search.toLowerCase());

const getMember = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, input: string) => {
    if (!message.guild) throw new Error('getMember was used in a DmChannel.');

    const members = message.guild.members.cache;

    const result = members.filter(memberFilterInexact(input));

    const member = result.first();

    if (result.size === 1) return member;

    if (result.size > 1) {
        const membersFound: string[] = [];

        result.each((member: GuildMember) => membersFound.push(member.toString()));

        const reply = await sendOptions(GUI, message, 'Multiple Members Found', membersFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return 'canceled';

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        return id ? message.guild.members.cache.get(id) : null;
    } else if (!result.size) {
        return null;
    }
    return null;
};
const channelFilterInexact = (search: string) => (chan: GuildChannel) =>
    chan.name.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(chan.id);

const getTextChannel = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, input: string) => {
    if (!message.guild) throw new Error('getTextChannel was used in a DmChannel.');

    const channels = message.guild.channels.cache;

    const result = channels.filter(channelFilterInexact(input));

    let channel = result.first() ? result.first() : null;

    if (result.size > 1) {
        const channelsFound: string[] = [];

        result.each((channel: GuildChannel) => channelsFound.push(`**${channel.name}** - ${channel.parent?.name} (${channel.id})`));

        const reply = await sendOptions(GUI, message, 'Multiple Channels Found', channelsFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return 'canceled';

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        const x = id ? message.guild.channels.cache.get(id) : null;

        channel = x ? x : null;
    } else if (!result.size) {
        return null;
    }
    if (!(channel instanceof TextChannel)) return null;
    return channel;
};

const getGuildChannel = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, input: string) => {
    if (!message.guild) throw new Error('getGuildChannel was used in a DmChannel.');

    const channels = message.guild.channels.cache;

    const result = channels.filter(channelFilterInexact(input));

    let channel = result.first() ? result.first() : null;

    if (result.size > 1) {
        const channelsFound: string[] = [];

        result.each((channel: GuildChannel) => channelsFound.push(`**${channel.name}** - ${channel.parent?.name} (${channel.id})`));

        const reply = await sendOptions(GUI, message, 'Multiple Channels Found', channelsFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return 'canceled';

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        const x = id ? message.guild.channels.cache.get(id) : null;

        channel = x ? x : null;
    } else if (!result.size) {
        return null;
    }
    if (!channel) return null;
    return channel;
};

const getVoiceChannel = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, input: string) => {
    if (!message.guild) throw new Error('getVoiceChannel was used in a DmChannel.');

    const channels = message.guild.channels.cache;

    const result = channels.filter(channelFilterInexact(input));

    let channel = result.first() ? result.first() : null;

    if (result.size > 1) {
        const channelsFound: string[] = [];

        result.each((channel: GuildChannel) => channelsFound.push(`**${channel.name}** - ${channel.parent?.name} (${channel.id})`));

        const reply = await sendOptions(GUI, message, 'Multiple Channels Found', channelsFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return 'canceled';

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        const x = id ? message.guild.channels.cache.get(id) : null;

        channel = x ? x : null;
    } else if (!result.size) {
        return null;
    }
    if (!(channel instanceof VoiceChannel)) return null;
    return channel;
};
const roleFilterInexact = (search: string) => (role: Role) => search.toLowerCase().includes(role.id) || role.name.toLowerCase().includes(search);

const getRole = async (GUI: AMessage | BaseMessage, message: AMessage | BaseMessage, input: string) => {
    if (!message.guild) throw new Error('getMember was used in a DmChannel.');

    const roles = message.guild.roles.cache;

    const result = roles.filter(roleFilterInexact(input));

    const role = result.first();

    if (result.size === 1) return role;

    if (result.size > 1) {
        const rolesFound: string[] = [];

        result.each((role: Role) => rolesFound.push(role.toString()));

        const reply = await sendOptions(GUI, message, 'Multiple Roles Found', rolesFound);

        const idRegex = /\d+/g;

        if (reply.canceled || reply.choice === '') return 'canceled';

        const idMatch = reply.choice?.match(idRegex);

        const id = idMatch ? idMatch[0] : null;

        return id ? message.guild.roles.cache.get(id) : null;
    } else if (!result.size) {
        return null;
    }
    return null;
};
