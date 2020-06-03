import { Command, AMessage } from '../../interfaces/Client';
import { getUserProfile, createUserProfile, updateUserProfile, getGuildSettings, profileProperty } from '../../database';
import { client } from '../../index';
import { PromptManager } from '../../interfaces/helpers/PromptManager';
import { GuildMember } from 'discord.js';

//* Command Code

const callback = async (message: AMessage, args: { action?: 'view' | 'edit' | 'create'; member?: GuildMember }, prompt: PromptManager) => {
    const action = args.action;

    const user = args.member?.user || message.author;
    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild?.id) : null;
    if (action === 'view' || !action) {
        const Profile = await getUserProfile(user.id);

        if (Profile) {
            const fields = [];
            Profile.age !== '' ? fields.push({ name: 'Age', value: Profile.age, inline: true }) : null;
            Profile.gender !== '' ? fields.push({ name: 'Gender', value: Profile.gender, inline: true }) : null;
            Profile.pronouns !== '' ? fields.push({ name: 'Pronouns', value: Profile.pronouns, inline: true }) : null;

            message.client.sendEmbed(
                message,
                'Profiles',
                `${user.username}#${user.discriminator}`,
                Profile.biography !== '' ? `${Profile.biography}` : undefined,
                user.displayAvatarURL({
                    dynamic: true,
                    format: 'png'
                }),
                fields,
                Profile.color
            );
            return;
        } else {
            message.client.sendEmbed(
                message,
                'Profiles',
                `Uh Oh!`,
                `${user} doesn't have a profile!\nHowever they can set one up with \`${
                    guildSettings?.general.prefix || client.config.defaultPrefix
                }profile create\`.`
            );
            return;
        }
    } else if (action === 'create') {
        const Profile = await getUserProfile(message.author.id);
        if (Profile) {
            message.client.sendEmbed(
                message,
                'Profiles',
                `Uh Oh!`,
                `You already have a profile! You can view it with \`${
                    guildSettings?.general.prefix || client.config.defaultPrefix
                }profile\` or edit it with \`${guildSettings?.general.prefix || client.config.defaultPrefix}profile edit\``
            );
            return;
        }

        const bio = await prompt.string('`Biography` - Tell me about yourself!');
        if (!bio) return;

        const age = await prompt.number('`Age` - How old are you?');
        if (!age) return;

        const gender = await prompt.string('`Gender` - What is your gender?');
        if (!gender) return;

        const pronouns = await prompt.string('`Pronouns` - What are your pronouns?');
        if (!pronouns) return;

        const color = await prompt.color('`Color` - What color would you like your profile to be?');
        if (!color) return;

        createUserProfile(message.author.id, color, pronouns, gender, age.toString(), bio);

        message.client.sendEmbed(
            message,
            'Profiles',
            `Profile Created`,
            `You can view your new profile with \`${guildSettings?.general.prefix || client.config.defaultPrefix}profile\`.`
        );
        return prompt.delete();
    } else if (action === 'edit') {
        const options = await prompt.options('Which property of your profile would you like to edit?', ['color', 'biography', 'age', 'pronouns', 'gender']);
        if (!options) return;
        const property: profileProperty = options.choice as profileProperty;
        let value: string | void;

        switch (options.choice) {
            case 'color':
                value = await prompt.color(`What would you like to set ${options.choice} to?`, true);
                break;
            case 'biography':
                value = await prompt.string(`What would you like to set ${options.choice} to?`, true);
                break;
            case 'pronouns':
                value = await prompt.string(`What would you like to set ${options.choice} to?`, true);
                break;
            case 'age':
                value = await prompt.number(`What would you like to set ${options.choice} to?`, true, true);
                break;
            case 'gender':
                value = await prompt.string(`What would you like to set ${options.choice} to?`, true);
                break;
            default:
                value = 'none';
                break;
        }

        prompt.delete();

        if (!value) return;

        updateUserProfile(message.author.id, property, value);
        message.client.sendEmbed(
            message,
            'Profiles',
            `Profile Edited`,
            `\`${options.choice}\` has been set to \`${value}\`\n\nDo \`${
                guildSettings?.general.prefix || client.config.defaultPrefix
            }profile\` to view your changes.`
        );
        return;
    }
};

export const command: Command = {
    name: 'profile',
    category: 'Profile',
    module: 'Profiles',
    aliases: [],
    description: `View someone's profile or edit your own!`,
    args: [
        {
            name: 'Action',
            description: 'What you would like to do',
            key: 'action',
            type: 'string',
            acceptedValues: ['View', 'Edit', 'Create'],
            optional: true
        },
        {
            name: 'User',
            description: 'What you would like to do',
            key: 'member',
            type: 'guildMember',
            optional: true,
            cases: { action: 'view' }
        }
    ],
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
    callback: callback
};
