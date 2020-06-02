import { Command, AMessage } from '../../interfaces/Client';
import { dbl } from '../../';
import { PromptManager } from '../../helpers/PromptManager';
import { GuildMember } from 'discord.js';

const callback = async (message: AMessage, args: string[], prompt: PromptManager) => {
    let member = message.guild && args[0] ? await prompt.parse.member(message.guild, args[0]) : message.author;

    if (member instanceof GuildMember) member = member.user;

    if (!member) return;

    const hasVoted = await dbl.hasVoted(member.id);

    message.client.sendEmbed(
        message,
        'Vote',
        `${hasVoted ? (member ? `${member.username} has` : "You've") : member ? `${member.username} hasn't` : "You haven't"} voted today!`,
        `\n\nSupport Autumn Bot by voting [here](https://top.gg/bot/672548437346222110/vote)!`
    );
};

export const command: Command = {
    name: 'vote',
    category: 'Utility',
    module: 'Vote',
    aliases: ['v'],
    description: "Check to see how many times you've voted for the bot, and if you've voted today..",
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    callback: callback
};
