import { config } from '../../config';
import FormData from 'form-data';
// @ts-ignore
import { fetch } from './index';
import Axios from 'axios';
function createForm(params: { [key: string]: any } = {}, formDataOptions: { [key: string]: any } = {}): FormData {
    const form = new FormData(formDataOptions);
    Object.keys(params).forEach(key => {
        form.append(key, params[key]);
    });
    return form;
}

export const uploadImgur = async (img: string): Promise<string | void> => {
    const body = createForm();
    console.log(1);
    body.append('image', img);
    console.log(2);

    const result = await await Axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        data: {
            image: img
        },
        headers: {
            authorization: `Client-ID ${config.imgurID}`
        }
    });
    // const result = await fetch('https://api.imgur.com/3/upload', {
    //     method: 'POST',
    //     headers: { Authorization: `Client-ID ${config.imgurID}` },
    //     body: `img=${img}`
    // });
    console.log(result.data.data.link);
    return result ? result.data.data.link : null;
};
