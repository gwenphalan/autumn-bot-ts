import { Command, AMessage } from '../../interfaces/Client';
import { dbl } from '../../';
import { getMember } from '../../util';

const callback = async (message: AMessage, args: string[]) => {
    const member = await getMember(message, args, 0);

    const hasVoted = member ? await dbl.hasVoted(member.id) : await dbl.hasVoted(message.author.id);

    message.client.sendEmbed(
        message,
        'Vote',
        `${hasVoted ? (member ? `${member.user.username} has` : "You've") : member ? `${member.user.username} hasn't` : "You haven't"} voted today!`,
        `\n\nSupport Autumn Bot by voting [here](https://top.gg/bot/672548437346222110/vote)!`
    );
};

export const command: Command = {
    name: 'vote',
    category: 'Utility',
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
