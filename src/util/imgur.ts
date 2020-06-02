import { fetch } from './index';
import { config } from '../../config';

export const uploadImgur = async (img: Buffer): Promise<string | void> => {
    const result = await fetch('https://api.imgur.com/3/upload', {
        method: 'POST',
        headers: { Authorization: `Client-ID ${config.imgurID}` },
        body: img
    });
    return result ? result.data.link : null;
};
