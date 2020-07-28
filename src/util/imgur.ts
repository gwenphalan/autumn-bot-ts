import { fetch } from './index';
import { config } from '../../config';
import FormData from 'form-data';

function createForm(params: { [key: string]: any } = {}, formDataOptions: { [key: string]: any } = {}): FormData {
    const form = new FormData(formDataOptions);
    Object.keys(params).forEach(key => {
        form.append(key, params[key]);
    });
    return form;
}

export const uploadImgur = async (img: Buffer): Promise<string | void> => {
    const body = createForm();
    console.log(1);
    body.append('image', img);
    console.log(2);
    const result = await fetch('https://api.imgur.com/3/upload', {
        method: 'POST',
        headers: { Authorization: `Client-ID ${config.imgurID}` },
        body: body
    });
    console.log(3);
    return result ? result.data.link : null;
};
