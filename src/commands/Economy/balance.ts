import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../helpers/PromptManager';
import { getUserEconomy } from '../../database/index';

const callback = async (message: AMessage, _args: {}, prompt: PromptManager) => {
    const economy = await getUserEconomy(message.author.id);

    return prompt.embed('Balance', `Balance: **${economy.balance} ¥**`);
};
export const command: Command = {
    name: 'balance',
    category: 'Economy',
    module: 'Economy',
    aliases: ['bal'],
    description: 'View your account balance',
    args: [],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
