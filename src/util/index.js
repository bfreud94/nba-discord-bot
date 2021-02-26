// External dependencies
import nodeHtmlToImage from 'node-html-to-image';

export const parseMessageContent = (message, prefix) => message.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

export const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

export const createHTMLImage = async (htmlTemplate) => (
    await nodeHtmlToImage({
        html: htmlTemplate,
        quality: 100,
        type: 'jpeg',
        puppeteerArgs: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
        },
        encoding: 'buffer'
    })
);

export const missingPlayerName = ([firstName, lastName]) => { 
    if (!firstName || !lastName) {
        return missingPlayerNameArguments;
    }
};