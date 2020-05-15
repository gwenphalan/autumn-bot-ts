import { Command, AMessage } from '../../interfaces/Client';
import { groups } from './settings/';
import { EmbedField, TextChannel, Role, GuildMember, VoiceChannel } from 'discord.js';
import { sendSetting } from './settings/util/index';
import { getGuildSettings, updateGuildSettings } from '../../database/index';

//type action = 'set' | 'remove' | 'add';

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
        groups.forEach(group => groupList.push(`\`${group.name}\` - ${group.description}`));

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
        group.settings.forEach(setting => settingList.push(`\`${setting.identifier}\` - ${setting.description}`));

        // Send an embed with the list of settings.
        return message.client.sendEmbed(message, 'Settings', `${group.name} Settings`, settingList.join('\n\n'), undefined, undefined, undefined, {
            text: `To get more information on a setting do {prefix}settings ${group.name} [setting]`
        });
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
        const value = guildSettings.get(group.identifier)[setting.identifier];

        // Push an EmbedField with the description of the setting.
        settingInfo.push({ name: 'Description', value: setting.description, inline: false });

        // Push an EmbedField with the value type of the array.
        settingInfo.push({ name: 'Type', value: setting.valueType, inline: false });

        // If there is a value set for the setting, push an EmbedFiled with that. Otherwise if there is a default setting, push an embed for that. If neither of those occur do nothing,
        value
            ? settingInfo.push({ name: 'Value', value: value, inline: false })
            : setting.default?.toString()
            ? settingInfo.push({ name: 'Default', value: setting.default.toString(), inline: false })
            : null;

        // If the setting can have multiple values, push an EmbedField saying so.
        setting.array ? settingInfo.push({ name: 'Array', value: setting.array.toString(), inline: false }) : null;

        // Send the an embed with the information regarding the setting.
        message.client.sendEmbed(message, 'Settings', `${group.name} Settings - \`${setting.name}\``, undefined, undefined, settingInfo, undefined, {
            text: `Do {prefix}settings ${group.identifier} ${setting.identifier} ${setting.array ? '<add | remove>' : 'set'} to change this setting.`
        });
    }
    // If there are 3 arguments (EXAMPLE: '-settings general prefix set')
    if (args.length === 3) {
        // Return if arg1 is not a valid group
        if (!group) return message.client.sendEmbed(message, 'Settings', 'Settings ', `${arg1} is not a settings group!`);

        // Return if arg2 is not a valid setting.
        if (!setting) return message.client.sendEmbed(message, 'Settings', 'Settings ', `${arg2} is not a setting in ${group.name}!`);

        // Return if arg3 is not "set", "add", or "remove".
        if (!['set', 'add', 'remove'].includes(arg3.toLowerCase()))
            return message.client.sendEmbed(
                message,
                'Settings',
                `Invalid Argument: \`${arg3}\``,
                `**Usage**\n\`{prefix}[Group] [Setting] [Set | Add | Remove]\``
            );

        // Send a message to later be used to load the embed GUI.
        const GUI = await message.channel.send('Loading GUI...');

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

                // Send a setting embed.
                const response = await sendSetting(GUI, message, setting.identifier, setting.valueType);

                // Return if the user responded 'canceled'
                if (response.canceled) return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');

                // Await the Promised answer.
                const value = await response.answer;

                // Set the setting to the value given by the user.
                guildSettings.get(group.identifier)[setting.identifier] = value;

                /**
                 * * NOTE: I only create a custom method do update the guild settings because for some reason doing guildSettings.save() didn't work.
                 */

                // Update guild settings
                await updateGuildSettings(message.guild.id, guildSettings);

                // Confirm to the user the value was changed.
                message.client.editEmbed(GUI, 'Settings', `Setting ${setting.name} set to ${value}`);
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

                // Send a setting embed.
                const response1 = await sendSetting(GUI, message, setting.identifier, setting.valueType, true);

                // If the user canceled, return.
                if (response1.canceled) return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');

                // Await the Promised answer.
                let value1 = await response1.answer;

                // If the value provided is something that is stored is an ID (TextChannel, Role, GuildMember, VoiceChannel) replace value1 with the id.
                if (value1 instanceof TextChannel || value1 instanceof Role || value1 instanceof GuildMember || value1 instanceof VoiceChannel) {
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
                message.client.editEmbed(GUI, 'Settings', `Added ${value1} to ${setting.name}.`);
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
                const arrayVal1 = guildSettings.get(group.identifier)[setting.identifier];

                // Return if there are no values to remove from the array.
                if (!arrayVal1.length)
                    return message.client.sendEmbed(
                        message,
                        'Settings',
                        'Uh Oh!',
                        `${setting.name} doesn't have any ${setting.valueType}s to remove!\n\nTo add a value to this setting, do \`{prefix}\`settings ${group.identifier} ${setting.identifier} add`
                    );

                // Declare a string of choices for the user to pick from.
                const choices: string[] = [];

                // For each value in the array, if the type is a snowflake ID, convert it to a mention, with the exception of Voice Channel.
                arrayVal!.forEach((value: any) => {
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
                        default:
                            choices.push(value);
                            break;
                    }
                });

                // Send the list of choices to the user.
                const response2 = await message.client.sendOptions(
                    GUI,
                    message.author,
                    `Which ${setting.valueType} would you like to remove from ${setting.identifier}?`,
                    choices
                );
                // Return if the user canceled.
                if (response2.canceled) return message.client.editEmbed(GUI, 'Settings', 'Settings Change Canceled');

                // Delete the chosen value from the original array.
                delete arrayVal1[response2.index];

                // Update the guild settings.
                await updateGuildSettings(message.guild.id, guildSettings);

                // Confirm the value was removed.
                message.client.editEmbed(GUI, 'Settings', `Removed ${response2.choice} from ${setting.name}.`);
                break;
            default:
                break;
        }
        // Return and call the update method for the group.
        return await group.update(message);
    }
    return;
};

// Command Information
export const command: Command = {
    name: 'settings',
    category: 'Utility',
    aliases: ['setting'],
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
