import { Command, AMessage } from '../../interfaces/Client';
import { neko } from '../../neko';
import Color from 'color';
import { MessageEmbed } from 'discord.js';
import { PromptManager } from '../../interfaces/helpers/PromptManager';

const callback = async (message: AMessage, _args: string[], _prompt: PromptManager) => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 100%, 80%)';

    const color = Color(pastel).hex();

    const result = await neko.sfw.goose();

    message.channel.send(new MessageEmbed().setDescription(`Goose.`).setColor(color).setImage(result.url).setTimestamp());
};

export const command: Command = {
    name: 'goose',
    category: 'Fun',
    module: 'Fun',
    aliases: [],
    description: 'Goose.',
    usage: '',
    requiresArgs: 0,
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
