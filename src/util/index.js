// External dependencies
import _ from 'lodash';
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

export const getRowName = (rowHeader, statType) => {
    if (rowHeader === 'plusMinus') return '+/-';
    if (rowHeader === 'totreb') return 'Rebounds';
    if (statType === 'basicTotalStats2') return rowHeader.toUpperCase();
    if (statType.includes('Total') && isNaN(rowHeader)) return (commandAbbreviations[rowHeader]).toUpperCase();
    return rowHeader.toUpperCase();
};

export const commandAbbreviations = {
    min: 'MIN',
    points: 'PTS',
    totReb: 'REB',
    assists: 'AST',
    steals: 'STL',
    blocks:'BLK'
};