import { Command, AMessage } from '../../interfaces/Client';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (_message: AMessage, _args: {}, prompt: PromptManager) => {
    return prompt.embed('Please give me a new home!', `• Invite: http://autm.fr/autumnbot\n• Website: https://www.autumnbot.net/`);
};

export const command: Command = {
    name: 'invite',
    category: 'Utility',
    module: 'Invite',
    aliases: [],
    description: 'Provides the invite link for the bot',
    args: [],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
