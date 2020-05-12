import { fetch } from './index';
import { inspect } from 'util';

// This uploads the provided text to hasteb.in
export const uploadHaste = async (text: string) => {
    const result = await fetch('https://hasteb.in/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: inspect(text),
        redirect: 'follow'
    });
    return result ? `https://hasteb.in/${result.key}` : 'Failed to upload to hastebin!';
};
