import { Command, AMessage } from '../../interfaces/Client';
import { groups } from './settings/index';
import { EmbedField, Role, GuildMember, GuildChannel } from 'discord.js';
import { sendSetting, parseType } from './settings/util/index';
import { getGuildSettings, updateGuildSettings } from '../../database/index';
import Canvas from 'canvas';
import { labelImage, drawExampleCard } from '../../util/canvas';

const callback = async (message: AMessage, args: string[]) => {
    // Declare arguments as variables
    const [arg1, arg2, arg3] = args;

    // Check if there is a guild, mostly so that TypeScript doesn't give errors when trying to call guild properties.
    if (!message.guild) return message.client.sendEmbed(message, 'Settings', 'Uh Oh!', `This command can only be ran in a server!`);

    // Load Guild Settings.
    const guildSettings = await getGuildSettings(message.guild.id);

    // Declare group and setting arguments
    const group = arg1 ? groups.find(group => group.name.toLowerCase() === args[0]?.toLowerCase()) : null;
    const setting = arg2 ? group?.settings.find(setting => setting.identifier.toLowerCase() === arg2.toLowerCase()) : null;

    // If no arguments are called (EXAMPLE: '-settings')
    if (!args.length) {
        // Compile the names and descriptions of each settings group into an array
        const groupList: string[] = [];
        groups.forEach(group => groupList.push(`\`${group.name}\``));

        // Send a message embed with the list groups
        return message.client.sendEmbed(message, 'Settings', 'Settings Groups', groupList.join('\n'), undefined, undefined, undefined, {
            text: "To view a group's settings do {prefix}settings <group>"
        });
    }

    // if there is only 1 argument (EXAMPLE: '-settings general')
    if (args.length === 1) {
        // Return if the argument is not a valid group.
        if (!group) return message.client.sendEmbed(message, 'Settings', 'Uh Oh! ', `${arg1} is not a settings group!`);

        // Compile the identifer and description of each setting for the group into an array.
        const settingList: string[] = [];
        group.settings.forEach(setting => settingList.push(`\`${setting.identifier}\``));

        // Send an embed with the list of settings.
        return message.client.sendEmbed(
            message,
            'Settings',
            `${group.name} Settings`,
            group.description + '\n\n' + settingList.join('\n'),
            undefined,
            undefined,
            undefined,
            {
                text: `To get more information on a setting do {prefix}settings ${group.name} [setting]`
            }
        );
    }

    // If there is 2 arguments (EXAMPLE: '-settings general prefix')
    if (args.length === 2) {
        // Return if arg1 is not a valid group.
        if (!group) return message.client.sendEmbed(message, 'Settings', 'Settings ', `${arg1} is not a settings group!`);

        // Return if arg2 is not a valid setting in the group.
        if (!setting) return message.client.sendEmbed(message, 'Settings', 'Settings ', `${arg2} is not a setting in ${group.name}!`);

        // Declare an embed field array where the setting info will be stored.
        const settingInfo: EmbedField[] = [];

        // Get the value of the setting if there is one.
        let value = guildSettings.get(group.identifier)[setting.identifier];

        // Push an EmbedField with the value type of the array.
        settingInfo.push({ name: 'Type', value: setting.valueType, inline: true });

        // If there is a value set for the setting and it is a snowflake, convert it to a mention, with the exception of voice channel.
        if (setting.array && value.length) {
            const newValues: string[] = [];
            console.log(value);
            value.forEach((id: any) => {
                switch (setting.valueType) {
                    case 'guildMember':
                        newValues.push('• <@!' + id + '>');
                        break;
                    case 'textChannel':
                        newValues.push('• <#' + id + '>');
                        break;
                    case 'voiceChannel':
                        const voiceChannel = message.guild?.channels.cache.get(id);
                        newValues.push('•' + (voiceChannel ? '<:voiceChannel:710743569572429844> ' + voiceChannel.name : 'Voice Channel ID: ' + id));
                        break;
                    case 'role':
                        newValues.push('• <@&' + id + '>');
                        break;
                    case 'guildChannel':
                        const guildChannel = message.guild?.channels.cache.get(id);
                        newValues.push('• ' + (guildChannel?.toString() || id));
                        break;
                    default:
                        newValues.push('• ' + id);
                        break;
                }
            });
            value = newValues;
        }
        if (!setting.array && value) {
            switch (setting.valueType) {
                case 'guildMember':
                    value = '<@!' + value + '>';
                    break;
                case 'textChannel':
                    value = '<#' + value + '>';
                    break;
                case 'voiceChannel':
                    const voiceChannel = message.guild?.channels.cache.get(value);
                    value = voiceChannel ? '<:voiceChannel:710743569572429844> ' + voiceChannel.name : 'Voice Channel ID: ' + value;
                    break;
                case 'role':
                    value = '<@&' + value + '>';
                    break;
                default:
                    value = value;
                    break;
            }
        }

        (setting.array && value.length > 0) || (!setting.array && value)
            ? settingInfo.push({ name: setting.array ? 'Values' : 'Value', value: setting.array ? value.join('\n') : value.toString(), inline: true })
            : null;

        setting.default?.toString() ? settingInfo.push({ name: 'Default', value: setting.default.toString(), inline: true }) : null;

        // If the setting can have multiple values, push an EmbedField saying so.
        setting.array ? settingInfo.push({ name: 'Array', value: setting.array.toString(), inline: true }) : null;

        let attachment: Buffer | undefined;

        if (group.identifier === 'welcome') {
            const exampleCard = await drawExampleCard(message.guild);

            const labeled = await labelImage(exampleCard, 'Example Card', 30, 'Poppins Light', 15);

            attachment = labeled;
        }

        // Send the an embed with the information regarding the setting.
        message.client.sendEmbed(
            message,
            'Settings',
            `${group.name} Settings - \`${setting.name}\``,
            setting.description,
            undefined,
            settingInfo,
            undefined,
            {
                text: `Do {prefix}settings ${group.identifier} ${setting.identifier} ${setting.array ? '<add | remove>' : 'set'} to change this setting.`
            },
            undefined,
            attachment
        );
    }
    // If there are 3 arguments (EXAMPLE: '-settings general prefix set')
    if (args.length >= 3) {
        // Return if arg1 is not a valid group
        if (!group) return message.client.sendEmbed(message, 'Settings', 'Settings ', `${arg1} is not a settings group!`);

        let arg4: string | null = null;

        const e = message.attachments.first();

        if (args.length > 3) arg4 = args.slice(3).join(' ');

        if (e) arg4 = e.url;

        // Return if arg2 is not a valid setting.
        if (!setting) return message.client.sendEmbed(message, 'Settings', 'Settings ', `${arg2} is not a setting in ${group.name}!`);

        // Return if arg3 is not "set", "add", or "remove".
        if (!['set', 'add', 'remove'].includes(arg3.toLowerCase()))
            return message.client.sendEmbed(
                message,
                'Settings',
                `Invalid Argument: \`${arg3}\``,
                `**Usage**\n\`{prefix}settings [Group] [Setting] [Set | Add | Remove] [Value]\``
            );

        let response: string;

        // Send a message to later be used to load the embed GUI.
        const GUI = await message.channel.send(`<a:loading:${message.client.constants.emotes.aLoading}>`);

        switch (arg3.toLowerCase()) {
            // If arg3 is 'set'
            case 'set':
                // If the setting is an array instead of a single value, return.
                if (setting.array)
                    return message.client.sendEmbed(
                        message,
                        'Settings',
                        'Uh Oh!',
                        `${setting.identifier} is an array!\n\nTo add or remove values from this setting, do \`{prefix}\`settings ${group.identifier} ${setting.identifier} <Add | Remove>`
                    );
                let check: any = null;
                let response4: any = null;

                if (arg4) {
                    check = await parseType(GUI, message, setting.valueType, arg4);
                    if (check === 'canceled') return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');
                    if (check === null) return message.client.editEmbed(GUI, 'Uh Oh!', `\`${arg4}\` is not a valid ${setting.valueType}!`);
                } else {
                    try {
                        // Send a setting embed.
                        response4 = await await sendSetting(GUI, message, setting.identifier, setting.valueType);
                    } catch {
                        console.error;
                    }

                    // Return if the user responded 'canceled'
                    try {
                        if (response4.canceled) return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');
                    } catch {
                        console.error;
                    }
                }

                // Await the Promised answer.
                let value = arg4 ? check : response4.answer;
                let toString1: string | undefined;

                // If the value provided is something that is stored is an ID (TextChannel, Role, GuildMember, VoiceChannel) replace value1 with the id.
                if (value instanceof GuildChannel || value instanceof Role || value instanceof GuildMember) {
                    toString1 = value.toString();
                    value = value.id;
                }

                // Set the setting to the value given by the user.
                guildSettings.get(group.identifier)[setting.identifier] = value;

                /**
                 * * NOTE: I only create a custom method do update the guild settings because for some reason doing guildSettings.save() didn't work.
                 */

                // Update guild settings
                await updateGuildSettings(message.guild.id, guildSettings);
                // Confirm to the user the value was changed.
                response = toString1 || value;
                break;
            // If arg3 is 'add'
            case 'add':
                // Return if the setting is a single value and not an array.
                if (!setting.array)
                    return message.client.sendEmbed(
                        message,
                        'Settings',
                        'Uh Oh!',
                        `${setting.identifier} is not an array!\n\nTo set the value of this setting, do \`{prefix}\`settings ${group.identifier} ${setting.identifier} Set`
                    );

                let check1: any = null;
                let response1: any = null;

                if (arg4) {
                    let valid = false;
                    for (let i = 0; i < 4; i++) {
                        if (!valid) {
                            check1 = await parseType(GUI, message, setting.valueType, arg4);
                            if (check1 === 'canceled') return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');
                            if (check1 !== null) valid = true;
                        }
                    }
                } else {
                    // Send a setting embed.
                    response1 = await (await sendSetting(GUI, message, setting.identifier, setting.valueType)).answer;

                    // Return if the user responded 'canceled'
                    if (response1.canceled) return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');
                }

                // Await the Promised answer.
                let value1 = arg4 ? check1 : response1;
                let toString: string | undefined;

                // If the value provided is something that is stored is an ID (TextChannel, Role, GuildMember, VoiceChannel) replace value1 with the id.
                if (value1 instanceof GuildChannel || value1 instanceof Role || value1 instanceof GuildMember) {
                    toString = value1.toString();
                    value1 = value1.id;
                }

                // Declare the array value in a constant.
                const arrayVal = guildSettings.get(group.identifier)[setting.identifier];

                // If the array doesn't exist, set it to a value that only contains the value. This is to avoid getting a 'cannot read .push() of undefined' error.
                if (!arrayVal) guildSettings.get(group.identifier)[setting.identifier] = [value1];

                // If the array does exist, push the value to it.
                if (arrayVal) guildSettings.get(group.identifier)[setting.identifier].push(value1);

                // Update the guild settings.
                await updateGuildSettings(message.guild.id, guildSettings);
                // Edit the embed confirming the value was added.
                response = toString || value1;
                break;
            // If arg3 is 'remove'
            case 'remove':
                // Return if the setting is a single value and not an array.
                if (!setting.array)
                    return message.client.sendEmbed(
                        message,
                        'Settings',
                        'Uh Oh!',
                        `${setting.identifier} is not an array!\n\nTo set the value of this setting, do \`{prefix}\`settings ${group.identifier} ${setting.identifier} Set`
                    );
                // Declare the array value in a constant.
                const arrayVal1: any[] = guildSettings.get(group.identifier)[setting.identifier];
                // Return if there are no values to remove from the array.
                if (!arrayVal1.length)
                    return message.client.sendEmbed(
                        message,
                        'Settings',
                        'Uh Oh!',
                        `${setting.name} doesn't have any ${setting.valueType}s to remove!\n\nTo add a value to this setting, do \`{prefix}\`settings ${group.identifier} ${setting.identifier} add`
                    );

                let check2: any = null;
                let response2: any = null;

                if (arg4) {
                    let valid = false;
                    for (let i = 0; i < 4; i++) {
                        if (!valid) {
                            check2 = await parseType(GUI, message, setting.valueType, arg4);
                            if (check2 === 'canceled') return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');
                            if (check2 !== null) valid = true;
                        }
                    }

                    // Await the Promised answer.
                    let value1 = arg4 ? check2 : response2;
                    let toString: string | undefined;

                    // If the value provided is something that is stored is an ID (TextChannel, Role, GuildMember, VoiceChannel) replace value1 with the id.
                    if (value1 instanceof GuildChannel || value1 instanceof Role || value1 instanceof GuildMember) {
                        toString = value1.toString();
                        value1 = value1.id;
                    }

                    if (!arrayVal1.find(settingValue => settingValue === value1))
                        return message.client.editEmbed(GUI, 'Settings', 'Uh Oh!', `I couldn't find ${toString} in ${setting.name}`);

                    delete arrayVal1[arrayVal1.indexOf(value1)];
                } else {
                    // Declare a string of choices for the user to pick from.
                    const choices: string[] = [];

                    // For each value in the array, if the type is a snowflake ID, convert it to a mention, with the exception of Voice Channel.
                    arrayVal1.forEach((value: any) => {
                        switch (setting.valueType) {
                            case 'guildMember':
                                choices.push('<@!' + value + '>');
                                break;
                            case 'textChannel':
                                choices.push('<#' + value + '>');
                                break;
                            case 'voiceChannel':
                                const voiceChannel = message.guild?.channels.cache.get(value);
                                choices.push(voiceChannel ? '<:voiceChannel:710743569572429844> ' + voiceChannel.name : 'Voice Channel ID: ' + value);
                                break;
                            case 'role':
                                choices.push('<@&' + value + '>');
                                break;
                            case 'guildChannel':
                                const guildChannel = message.guild?.channels.cache.get(value);
                                choices.push(guildChannel?.toString() || value);
                                break;
                            default:
                                choices.push(value);
                                break;
                        }
                    });
                    // Send the list of choices to the user.
                    const response4 = await message.client.sendOptions(
                        GUI,
                        message.author,
                        `Which ${setting.valueType} would you like to remove from ${setting.identifier}?`,
                        choices
                    );
                    // Return if the user canceled.
                    if (response4.canceled) return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');

                    response2 = response4.choice;

                    // Delete the chosen value from the original array.
                    delete arrayVal1[response4.index];
                }

                // Update the guild settings.
                await updateGuildSettings(message.guild.id, guildSettings);
                // Confirm the value was removed.
                response = response2 || check2;
                break;
            default:
                response = '';
                break;
        }

        // Fetch the updated settings, and assign the updated group the a constant
        const updated = await message.client.settings(message.guild.id);
        const updatedGroup = updated.get(group.identifier);

        // Declared a variable that will be filled with required settings that do not have a value yet.
        const required: string[] = [];

        // Declare a variable that will be filled with settings the changed setting requires to function.
        const dependencies: string[] = [];

        // For each required setting in the group that does not yet have a value, push its identifier to the
        // required array, and for push each dependency that the changes setting requires to the dependencies array.
        group.settings.forEach(set => {
            const value = updatedGroup[set.identifier];

            if (set.required && !value) required.push(set.identifier);
            if (setting.dependencies && setting.dependencies.includes(set.identifier) && !value) dependencies.push(set.identifier);
        });

        const responseArray: string[] = [];

        let attachment: Buffer | string | undefined;
        switch (arg3) {
            case 'set':
                if (setting.valueType === 'image') responseArray.push(`Set **${setting.name}**`);
                if (setting.valueType !== 'image') responseArray.push(`Set **${setting.name}** to **${response.toString()}**`);
                break;
            case 'add':
                if (setting.valueType === 'image') responseArray.push(`Added to **${setting.name}**`);
                if (setting.valueType !== 'image') responseArray.push(`Added **${response.toString()}** to **${setting.name}**`);
                break;
            case 'remove':
                if (setting.valueType === 'image') responseArray.push(`Removed from **${setting.name}**`);
                if (setting.valueType !== 'image') responseArray.push(`Removed **${response.toString()}** from **${setting.name}**`);
                break;
            default:
                break;
        }
        if (setting.valueType === 'color') {
            const canvas = Canvas.createCanvas(700, 300);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = response;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const buffer = await canvas.toBuffer('image/png');

            const labeled = await labelImage(buffer, response, 30, 'Poppins Regular', 10);

            attachment = labeled;
        }

        if (setting.valueType === 'image') attachment = response;

        required.length
            ? responseArray.push(
                  `${group.name} still requires values for the following settings. It will not function until they do.\n\n\`${required.join('`\n`')}\``
              )
            : null;

        dependencies.length
            ? responseArray.push(
                  `${setting.name} depends on the following settings. It will not function until they have settings.\n\n\`${dependencies.join('`\n`')}\``
              )
            : null;

        GUI.delete({
            timeout: 30
        });
        // Send an embed containing the response
        await message.client.sendEmbed(
            GUI,
            'Settings',
            `${group.name} Settings Edited`,
            responseArray.join('\n\n'),
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            attachment
        );

        // Return and call the update method for the group.
        return await group.update(message);
    }
};

// Command Information
export const command: Command = {
    name: 'settings',
    category: 'Administration',
    aliases: ['setting', 's'],
    description: 'Change the settings for your server',
    usage: '[Group] [Setting] [Set | Add | Remove]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: 'MANAGE_GUILD',
    botPermissions: '',
    callback: callback
};
