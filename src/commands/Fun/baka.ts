import { Command, AMessage } from '../../interfaces/Client';
import { neko } from '../../neko';
import Color from 'color';
import { MessageEmbed } from 'discord.js';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (message: AMessage, _args: {}, _prompt: PromptManager) => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 100%, 80%)';

    const color = Color(pastel).hex();

    const result = await neko.sfw.baka();

    message.channel.send(new MessageEmbed().setColor(color).setImage(result.url).setTimestamp());
};

export const command: Command = {
    name: 'baka',
    category: 'Fun',
    module: 'Fun',
    aliases: [],
    description: 'Is someone being a baka??',
    args: [],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
