import _ from 'lodash';

export const parseMessageContent = (message, prefix) => message.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

export const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

export const missingPlayerName = ([firstName, lastName]) => !firstName || !lastName;

export const splitName = (name) => ({
    firstName: name.split(' ')[0],
    lastName: name.split(' ')[1]
});

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