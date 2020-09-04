import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../helpers/PromptManager';
import { getUserEconomy } from '../../database/index';
import { User } from 'discord.js';

const callback = async (message: AMessage, args: { user: User; amount: number }, prompt: PromptManager) => {
    const economy = await getUserEconomy(message.author.id);
    const userEconomy = await getUserEconomy(args.user.id);

    if (args.amount <= 0) return prompt.error('You must pay more than **0 ¥**!');

    economy.balance -= args.amount;
    userEconomy.balance += args.amount;

    return prompt.embed('Balance', `Payed **${args.amount} ¥** to **${args.user.username}#${args.user.discriminator}**!`);
};
export const command: Command = {
    name: 'pay',
    category: 'Economy',
    module: 'Economy',
    aliases: [],
    description: 'Pay another user.',
    args: [
        {
            name: 'User',
            description: 'User that will be payed.',
            key: 'user',
            type: 'user'
        },
        {
            name: 'Amount',
            description: 'How much will be payed',
            key: 'amount',
            type: 'number'
        }
    ],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
