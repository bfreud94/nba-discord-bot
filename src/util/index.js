import _ from 'lodash';

export const parseMessageContent = (message, prefix) => message.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

export const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

export const splitName = (name) => ({
    firstName: name.split(' ')[0],
    lastName: name.split(' ')[1]
});

export const commandAbbreviations = {
    min: 'MIN',
    points: 'PTS',
    totReb: 'REB',
    assists: 'AST',
    steals: 'STL',
    blocks:'BLK'
};