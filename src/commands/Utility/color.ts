import { Command, AMessage } from '../../interfaces/Client';
import color from 'tinycolor2';
import Canvas from 'canvas';
import { PromptManager } from '../../helpers/PromptManager';

const callback = async (_message: AMessage, args: { color?: string }, prompt: PromptManager) => {
    const arg = args.color || color.random().toHexString();

    const colorData = color(arg);

    const canvas = Canvas.createCanvas(700, 700);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = colorData.toHexString();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const buffer = await canvas.toBuffer('image/png');

    return prompt.embed(
        `${colorData.toName() || 'Unnamed'}`,
        ` • Hex: ${colorData.toHexString()}\n • RGB: ${colorData.toRgbString()}\n • HSV: ${colorData.toHsvString()}\n • HSL: ${colorData.toHslString()}`,
        undefined,
        undefined,
        colorData.toHexString(),
        undefined,
        undefined,
        buffer
    );
};

export const command: Command = {
    name: 'color',
    category: 'Utility',
    module: 'Utility',
    aliases: [],
    description: 'Displays the provided color, or gives a random one.',
    args: [
        {
            name: 'Color',
            key: 'color',
            type: 'color',
            optional: true
        }
    ],
    devOnly: false,
    guildOnly: false,
    NSFW: false,
    userPermissions: [],
    botPermissions: [],
    callback: callback
};
