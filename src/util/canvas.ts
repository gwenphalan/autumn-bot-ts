import Canvas from 'canvas';
import { Guild, GuildMember } from 'discord.js';
import path from 'path';
import { config } from '../../config';
import Color from 'color';
import { getGuildSettings } from '../database';
import { words } from '../constants/words';
//import { style1 } from './autumnforest';
Canvas.registerFont(path.join(__dirname, '../../../assets/fonts/Poppins-Regular.ttf'), { family: 'Poppins', style: 'Regular', weight: '400' });
Canvas.registerFont(path.join(__dirname, '../../../assets/fonts/Poppins-Thin.ttf'), { family: 'Poppins', style: 'Thin', weight: '100' });
Canvas.registerFont(path.join(__dirname, '../../../assets/fonts/Poppins-Bold.ttf'), { family: 'Poppins', style: 'Bold', weight: '700' });
Canvas.registerFont(path.join(__dirname, '../../../assets/fonts/Poppins-Light.ttf'), { family: 'Poppins', style: 'Light', weight: '300' });
export const defaultBackgroundImagePath = path.join(__dirname, `../../../assets/images/${config.backgroundImage}`);
let defaultBackgroundImage: Canvas.Image;
const defaultBackgroundColor = '#2b2929';
const defaultTextColor = '#FFFFFF';

const loadDefaultBackgroundImage = async () => {
    defaultBackgroundImage = await Canvas.loadImage(defaultBackgroundImagePath);
    console.log('Default Welcome Card Background Image Loaded');
};

loadDefaultBackgroundImage();

export const drawCard = async (guild: Guild, member: GuildMember) => {
    /*const guildSettings = await getGuildSettings(guild.id);

    const welcome = guildSettings.welcome;

    const backgroundImage = welcome.profileBackground;
    const backgroundColor = welcome.backgroundColor;
    const profileColor = welcome.profileColor;
    const textColor = welcome.textColor;

    const buff = await style1(
        guild.name,
        member.displayName,
        member.user.displayAvatarURL({ dynamic: true, format: 'png' }),
        backgroundImage,
        profileColor,
        backgroundColor,
        textColor
    );

    return buff;*/
    const t = 5; // * X Offset of profile picture
    const i = 180; // * Profile Picture Size
    const v = 30; // * Margin between text and pfp/side of image
    const z = 10; // * Space between server name and username
    const x = 250; // * width of pfp area
    const o = 40; // * Base font size for server name
    const u = 100; // * Base font size for member name
    const width = 750; // * width of card
    const height = 300; // * height of card

    const guildSettings = await getGuildSettings(guild.id);

    const welcome = guildSettings.welcome;

    const backgroundImage = welcome.profileBackground;
    const backgroundColor = welcome.backgroundColor;
    const profileColor = welcome.profileColor;
    const textColor = welcome.textColor;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const color = Color(profileColor ? profileColor : config.accentColor)
        .darken(0.6)
        .toString();

    ctx.strokeStyle = backgroundColor ? backgroundColor : defaultBackgroundColor;
    ctx.fillStyle = backgroundColor ? backgroundColor : defaultBackgroundColor;
    roundRect(ctx, 0, 0, canvas.width, canvas.height, 25, true, true);

    const w = canvas.width;
    const y = x + v;

    const p = w - y;

    const textWidth = p - 50;

    const c = `Welcome to ${guild.name},`;
    const d = `${member.displayName}!`;

    const a = applyText(canvas, c, 'Poppins Regular', o, textWidth);
    const b = applyText(canvas, d, 'Poppins Thin', u, textWidth);
    // Slightly smaller text placed above the member's display name

    const e = canvas.height;
    const f = (e - a.size + b.size) / 2;
    const g = e - f + b.size + z / 2;
    const h = e - f - z / 2;

    ctx.textAlign = 'center';

    ctx.font = a.font;
    ctx.fillStyle = textColor ? textColor : defaultTextColor;
    ctx.fillText(c, y + textWidth / 2, h);

    // Add an exclamation point here and below
    ctx.font = b.font;
    ctx.fillStyle = textColor ? textColor : defaultTextColor;
    ctx.fillText(d, y + textWidth / 2, g);

    const gradient = ctx.createRadialGradient(0, canvas.height / 2, x - 20, 0, canvas.height / 2, x);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.9, profileColor ? profileColor : config.accentColor);

    ctx.strokeStyle = Color(config.accentColor).darken(0.9).toString();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, canvas.height / 2, x, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.save();

    ctx.beginPath();
    ctx.arc(0, canvas.height / 2, x - 20, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const Background = backgroundImage ? await Canvas.loadImage(backgroundImage) : defaultBackgroundImage;

    const dw = Background.width * (canvas.height / Background.height);
    const dh = canvas.height;

    const dx = -(dw - x - 20) / 2;

    ctx.drawImage(Background, dx, 0, dw, dh);

    /*ctx.restore();
    ctx.beginPath();
    ctx.arc(120, 125, 120, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();*/
    const j = canvas.height;

    const k = (j - i) / 2;
    const l = x - 20;
    const m = (l - i) / 2;
    const n = m - t;

    const q = l / 2 - t;
    const r = j / 2;
    const s = i / 2;

    ctx.fillStyle = defaultBackgroundColor;
    ctx.strokeStyle = defaultBackgroundColor;

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetX = 0;

    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.arc(q, r, s, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(q, r, s, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 512 }));
    ctx.drawImage(avatar, n, k, i, i);

    return canvas.toBuffer();
};

export const labelImage = async (src: string | Buffer, label: string, fontSize: number, font: string, margin?: number) => {
    const image = await Canvas.loadImage(src);

    const a = margin ? margin * 2 : 20;

    const canvas = Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#FFF';
    ctx.fillStyle = '#FFF';

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const b = applyText(canvas, label, font, fontSize, canvas.width);
    ctx.font = b.font;

    ctx.font = b.font;

    ctx.shadowColor = '#545454';
    ctx.shadowBlur = 7;

    ctx.strokeStyle = '#FFF';
    ctx.fillStyle = '#FFF';
    roundRect(
        ctx,
        (canvas.width - ctx.measureText(label).width + a) / 2,
        -canvas.height + b.size + a,
        ctx.measureText(label).width + a,
        canvas.height,
        25,
        true,
        true
    );

    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#000';

    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText(label, canvas.width / 2 + a, b.size + a / 2, ctx.measureText(label).width);

    return canvas.toBuffer();
};

export const applyText = (canvas: Canvas.Canvas, text: string, font: string, fontSize: number, width: number) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let x = fontSize;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${(x -= 1)}pt "${font}"`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > width);

    // Return the result to use in the actual canvas
    return {
        font: ctx.font,
        size: x
    };
};

export const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius?: number,
    fill?: boolean,
    stroke?: boolean
) => {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
    ctx.clip();
};

export const drawExampleCard = async (guild: Guild) => {
    const t = 5; // * X Offset of profile picture
    const i = 180; // * Profile Picture Size
    const v = 30; // * Margin between text and pfp/side of image
    const z = 10; // * Space between server name and username
    const x = 250; // * width of pfp area
    const o = 40; // * Base font size for server name
    const u = 100; // * Base font size for member name
    const width = 750; // * width of card
    const height = 300; // * height of card

    const guildSettings = await getGuildSettings(guild.id);

    const welcome = guildSettings.welcome;

    const backgroundImage = welcome.profileBackground;
    const backgroundColor = welcome.backgroundColor;
    const profileColor = welcome.profileColor;
    const textColor = welcome.textColor;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const adjective = words.adjectives[Math.floor(Math.random() * words.adjectives.length)];
    const noun = words.nouns[Math.floor(Math.random() * words.nouns.length)];

    const avatarURL = `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 4)}.png`;
    const username = (adjective.substr(0, 1).toUpperCase() + adjective.substr(1) + ' ' + noun.substr(0, 1).toUpperCase() + noun.substr(1)).replace(/\s/g, ' ');

    const color = Color(profileColor ? profileColor : config.accentColor)
        .darken(0.6)
        .toString();

    ctx.strokeStyle = backgroundColor ? backgroundColor : defaultBackgroundColor;
    ctx.fillStyle = backgroundColor ? backgroundColor : defaultBackgroundColor;
    roundRect(ctx, 0, 0, canvas.width, canvas.height, 25, true, true);

    const w = canvas.width;
    const y = x + v;

    const p = w - y;

    const textWidth = p - 50;

    const c = `Welcome to ${guild.name},`;
    const d = `${username}!`;

    const a = applyText(canvas, c, 'Poppins Regular', o, textWidth);
    const b = applyText(canvas, d, 'Poppins Thin', u, textWidth);
    // Slightly smaller text placed above the member's display name

    const e = canvas.height;
    const f = (e - a.size + b.size) / 2;
    const g = e - f + b.size + z / 2;
    const h = e - f - z / 2;

    ctx.textAlign = 'center';

    ctx.font = a.font;
    ctx.fillStyle = textColor ? textColor : defaultTextColor;
    ctx.fillText(c, y + textWidth / 2, h);

    // Add an exclamation point here and below
    ctx.font = b.font;
    ctx.fillStyle = textColor ? textColor : defaultTextColor;
    ctx.fillText(d, y + textWidth / 2, g);

    const gradient = ctx.createRadialGradient(0, canvas.height / 2, x - 20, 0, canvas.height / 2, x);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.9, profileColor ? profileColor : config.accentColor);

    ctx.strokeStyle = Color(config.accentColor).darken(0.9).toString();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, canvas.height / 2, x, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.save();

    ctx.beginPath();
    ctx.arc(0, canvas.height / 2, x - 20, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const Background = backgroundImage ? await Canvas.loadImage(backgroundImage) : defaultBackgroundImage;

    const dw = Background.width * (canvas.height / Background.height);
    const dh = canvas.height;

    const dx = -(dw - x - 20) / 2;

    ctx.drawImage(Background, dx, 0, dw, dh);

    /*ctx.restore();
    ctx.beginPath();
    ctx.arc(120, 125, 120, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();*/
    const j = canvas.height;

    const k = (j - i) / 2;
    const l = x - 20;
    const m = (l - i) / 2;
    const n = m - t;

    const q = l / 2 - t;
    const r = j / 2;
    const s = i / 2;

    ctx.fillStyle = defaultBackgroundColor;
    ctx.strokeStyle = defaultBackgroundColor;

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetX = 0;

    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.arc(q, r, s, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(q, r, s, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(avatarURL);
    ctx.drawImage(avatar, n, k, i, i);

    return canvas.toBuffer();
};
