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

export const getStatName = (command, statName, i) => {
    if (command === 'adjustedshooting' && i > 1 && i < 18) return statName + i;
    if (command === 'playbyplay' && i > 10 && i < 15) return statName + i;
    if (command === 'shooting') return statName + i;
    return statName;
}

export const reformatArgs = (args) => {
    if (args.length === 4) {
        args.splice(2, 0, 10000)
        args.push(10000)
    } else if (args.length === 5) {
        const firstPlayerHasYear = parseInt(args[2])
        if (firstPlayerHasYear) {
            args.push(10000)
        } else {
            args.splice(2, 0, 10000)
        }
    }
    return args;
}

export const isGameHigh = (CMD_NAME) => CMD_NAME === 'gamehigh'

export const getFullCompareCommandName = (CMD_NAME) => 'compare' + CMD_NAME