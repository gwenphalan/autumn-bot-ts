import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, MyMessage } from '../../interfaces/Client';
import { getChannel } from '../../util';
import { getGuildSettings } from '../../database';

const callback = async (message: MyMessage, args: string[]) => {
    const guildSettings = message.guild?.id ? await getGuildSettings(message.guild?.id) : null;
    const prefix = guildSettings?.prefix || message.client.config.defaultPrefix;

    const embed = new MessageEmbed();

    // * Variable Parsing
    const arg1 = args[0] ? args[0] : null;
    const arg2 = args[1] ? args[1] : null;
    const arg3 = args[2] ? args[2] : null;

    if (arg1 === 'create') {
        if (!arg2) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a text channel!`);

        const channel = await getChannel(message, args, 'text', 1);

        if (!channel || !(channel instanceof TextChannel))
            return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find \`${arg2}\`! Please provide a valid text channel!`);

        const msg = await channel?.send(embed);

        embed
            .setTitle('Custom Embed')
            .setDescription(`You can customize this embed by doing the command \`${prefix}embed edit ${msg.id}\``)
            .setFooter(`ID: ${msg.id}`);

        await msg.edit(embed);

        await message.client.sendEmbed(
            message,
            'Custom Embeds',
            'Embed Created',
            `You can customize the new embed by doing the command \`${prefix}embed edit ${msg.id}\``
        );
    } else if (arg1 === 'edit') {
        const channel = await getChannel(message, args, 'text', 1);

        if (!channel || !(channel instanceof TextChannel))
            return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find \`${arg2}\`! Please provide a valid text channel!`);

        if (!arg3) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Please provide a messageID!`);

        const msg = await channel.messages.fetch(arg3).catch(() => null);

        if (!msg) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `I couldn't find message with ID \`${arg3}\` in ${channel.toString()}!`);

        const msgEmbed = msg.embeds[0];

        if (!msgEmbed) return message.client.sendEmbed(message, 'Custom Embeds', 'Uh Oh!', `Message with ID \`${arg3}\` does not have an embed!`);

        type embedAction =
            | 'setTitle'
            | 'setURL'
            | 'setDescription'
            | 'addField'
            | 'removeField'
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
            'setAuthor',
            'setFooter',
            'setImage',
            'setThumbnail',
            'setColor'
        ];

        const answer = await message.client.sendOptions(message, 'Which action would you like to perform on the embed?', embedActions);

        if (answer.canceled || !answer.choice) return message.client.sendEmbed(message, 'Custom Embeds', 'Embed Edit Canceled');

        const action = answer.choice;

        if (action === 'setTitle') {
            const title = await message.client.sendQuestions(message, [
                {
                    question: 'What would you like to set the title to?',
                    type: 'string',
                    optional: false
                }
            ]);

            if (title.canceled || !title.answers[0]) return message.client.sendEmbed(message, 'Custom Embeds', 'Embed Edit Canceled');

            embed.setTitle(title.answers[0]);
        }
    }
    return;
};

export const command: Command = {
    name: 'embed',
    category: 'Utility',
    aliases: [],
    description: 'Create/Edit a Message Embed',
    usage: '<Create | Edit> <TextChannel> <MessageID (Edit Only)>',
    requiresArgs: 2,
    devOnly: false,
    guildOnly: true,
    userPermissions: 'MANAGE_MESSAGES',
    botPermissions: 'EMBED_LINKS',
    callback: callback
};
