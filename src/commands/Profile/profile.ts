import { Command, AMessage } from '../../interfaces/Client';
import { getMember } from '../../util';
import { getUserProfile, createUserProfile, updateUserProfile, getGuildSettings, profileProperty } from '../../database';
import { client } from '../../index';
import { valueType } from '../../interfaces/SettingsGroup';

//* Command Code

const callback = async (message: AMessage, args: string[]) => {
    const actions = ['edit', 'create'];

    const action = args[0] && actions.includes(args[0].toString()) ? args[0].toLowerCase() : null;
    const requireUser = !action && args[0] ? true : false;

    const user = await getMember(message, args, 0);
    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild?.id) : null;

    if (!user && requireUser) {
        message.client.sendEmbed(message, 'Profiles', `Uh Oh!`, `I couldn't find \`${args[0]}\`! Please provide a valid server member!`);
        return;
    }
    if (user && requireUser) {
        const Profile = await getUserProfile(user.id);

        if (Profile) {
            const fields = [];
            Profile.age ? fields.push({ name: 'Age', value: Profile.age, inline: true }) : null;
            Profile.gender ? fields.push({ name: 'Gender', value: Profile.gender, inline: true }) : null;
            Profile.pronouns ? fields.push({ name: 'Pronouns', value: Profile.pronouns, inline: true }) : null;

            message.client.sendEmbed(
                message,
                'Profiles',
                `${user.user.username}#${user.user.discriminator}`,
                Profile.biography ? `${Profile.biography}` : undefined,
                user.user.displayAvatarURL({
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
                `${user.user} doesn't have a profile!\nHowever they can set one up with \`${
                    guildSettings?.general.prefix || client.config.defaultPrefix
                }profile create\`.`
            );
            return;
        }
    } else if (!action && !requireUser) {
        const Profile = await getUserProfile(message.author.id);

        if (Profile) {
            const fields = [];
            Profile.age ? fields.push({ name: 'Age', value: Profile.age, inline: true }) : null;
            Profile.gender ? fields.push({ name: 'Gender', value: Profile.gender, inline: true }) : null;
            Profile.pronouns ? fields.push({ name: 'Pronouns', value: Profile.pronouns, inline: true }) : null;

            message.client.sendEmbed(
                message,
                'Profiles',
                `${message.author.username}#${message.author.discriminator}`,
                Profile.biography ? `${Profile.biography}` : undefined,
                message.author.displayAvatarURL({
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
                `You don't have a profile!\nHowever you can set one up with \`${guildSettings?.general.prefix || client.config.defaultPrefix}profile create\`.`
            );
            return;
        }
    } else if (action?.toLowerCase() === 'create') {
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
        const GUI = await message.channel.send('Loading GUI...');

        const begin = await message.client.sendConfirm(GUI, message.author, 'Are you sure you want to create a profile?');

        if (begin) {
            const x = await message.client.sendQuestions(GUI, message, [
                {
                    question: '`biography`\n\nTell me about yourself!',
                    type: 'string',
                    optional: true
                },
                {
                    question: '`age`\n\nHow old are you?',
                    type: 'number',
                    optional: true
                },
                {
                    question: '`gender`\n\nWhat is your gender?',
                    type: 'string',
                    optional: true
                },
                {
                    question: '`pronouns`\n\nWhat are your pronouns?',
                    type: 'string',
                    optional: true
                },
                {
                    question: '`color`\n\nWhat color do you want your profile to be?',
                    type: 'color',
                    optional: true
                }
            ]);

            const answers = x.answers;
            const canceled = x.canceled;

            if (canceled) {
                message.client.sendEmbed(message, 'Profiles', 'Profile Creation Canceled');
                return;
            }

            const profile = {
                color: answers[4] !== 'none' ? answers[4] : '',
                pronouns: answers[3] !== 'none' ? answers[3] : '',
                gender: answers[2] !== 'none' ? answers[2] : '',
                age: answers[1] !== 'none' ? answers[1] : '',
                biography: answers[0] !== 'none' ? answers[0] : ''
            };

            createUserProfile(message.author.id, profile.color, profile.pronouns, profile.gender, profile.age, profile.biography);

            message.client.sendEmbed(
                message,
                'Profiles',
                `Profile Created`,
                `You can view your new profile with \`${guildSettings?.general.prefix || client.config.defaultPrefix}profile\`.`
            );
            return;
        }
    } else if (action?.toLowerCase() === 'edit') {
        const GUI = await message.channel.send('Loading GUI...');

        const reply = await message.client.sendOptions(GUI, message, 'Which property of your profile would you like to edit?', [
            'color',
            'biography',
            'age',
            'pronouns',
            'gender'
        ]);

        if (reply.canceled || !reply.choice) {
            message.client.sendEmbed(message, 'Profiles', 'Profile Edit Canceled');
            return;
        }

        let type: valueType;
        let property: profileProperty;

        switch (reply.choice) {
            case 'color':
                type = 'color';
                property = 'color';
                break;
            case 'biograpy':
                type = 'string';
                property = 'biography';
                break;
            case 'pronouns':
                type = 'string';
                property = 'pronouns';
                break;
            case 'age':
                type = 'number';
                property = 'age';
                break;
            case 'gender':
                type = 'string';
                property = 'gender';
                break;
            default:
                type = 'string';
                property = 'biography';
                break;
        }

        const answer = await message.client.sendQuestions(GUI, message, [
            {
                question: `What would you like to set ${reply.choice} to?`,
                optional: true,
                type: type
            }
        ]);

        if (answer.canceled || !answer.answers) {
            message.client.sendEmbed(message, 'Profiles', 'Profile Edit Canceled');
            return;
        }

        const value = answer.answers[0];

        updateUserProfile(message.author.id, property, value);
        message.client.sendEmbed(
            message,
            'Profiles',
            `Profile Edited`,
            `\`${property}\` has been set to \`${value}\`\n\nDo \`${
                guildSettings?.general.prefix || client.config.defaultPrefix
            }profile\` to view your changes.`
        );
        return;
    }
};

export const command: Command = {
    name: 'profile',
    category: 'Profile',
    aliases: [],
    description: `View someone's profile or edit your own!`,
    usage: '[User | Edit | Create]',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: true,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES'],
    callback: callback
};
