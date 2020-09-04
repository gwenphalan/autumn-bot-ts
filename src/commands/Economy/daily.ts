import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../helpers/PromptManager';
import { getUserEconomy } from '../../database/index';
import parseTimestring from 'timestring';
import prettyMs from 'pretty-ms';

const callback = async (message: AMessage, _args: {}, prompt: PromptManager) => {
    const economy = await getUserEconomy(message.author.id);

    const timeLimit = Date.now() - parseTimestring('12h');

    if (economy.lastClaimedDaily > timeLimit)
        return prompt.error(
            `You last claimed your daily bonus **${prettyMs(Date.now() - economy.lastClaimedDaily)}** ago!\nYou must wait **${
                Date.now() - economy.lastClaimedDaily - timeLimit
            }** until you can claim it next!`
        );

    const daily = Math.random() * 100;

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
