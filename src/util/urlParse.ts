import { parse } from 'url';
import Axios from 'axios';
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
export const isUrl = (string: string) => {
    if (typeof string !== 'string') {
        return false;
    }

    const match = string.match(protocolAndDomainRE);
    if (!match) {
        return false;
    }

    const everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
        return false;
    }

    if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
        return true;
    }

    return false;
};
export const isImage = async (url: string): Promise<string | undefined> => {
    let i = 0;
    console.log(i++);
    if (!url) return;
    const http = url.lastIndexOf('http');
    if (http != -1) url = url.substring(http);
    console.log(i++);
    if (!isUrl(url)) return;
    console.log(i++);
    let pathname = parse(url).pathname;
    if (!pathname) return;
    const last = pathname.search(/[:?&]/);
    if (last != -1) pathname = pathname.substring(0, last);
    console.log(i++);
    if (/styles/i.test(pathname)) return;
    const res = await Axios({
        method: 'GET',
        url: url
    });
    console.log(i++);
    if (!res) return;
    const headers = res.headers;
    if (!headers) return;
    console.log(i++);
    const contentType = headers['content-type'];
    console.log(i++);
    if (!contentType) return;
    console.log(i++);
    return contentType.search(/^image\//) != -1 ? url : undefined;
};

console.log(isUrl('https://i.chzbgr.com/full/6286328064/h9EBF17DC/i-want-you-to-suck-my-dick'));
