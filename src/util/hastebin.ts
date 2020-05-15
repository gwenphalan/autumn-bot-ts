import { fetch } from './index';

// This uploads the provided text to hasteb.in
export const uploadHaste = async (text: string) => {
    const result = await fetch('https://hasteb.in/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text,
        redirect: 'follow'
    });
    return result ? result.key : null;
};

export const fetchHaste = async (key: string) => {
    const result = await fetch(`https://hasteb.in/documents/${key}`, {
        method: 'GET',
        headers: { 'Content-Type': 'text/plain' },
        redirect: 'follow'
    });
    return result ? result.data : null;
};
