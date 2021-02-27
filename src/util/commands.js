export const commandArgsMap = {
    basicStats: 'firstName lastName',
    advancedStats: 'firstName lastName',
    basicTotalStats: 'firstName lastName',
    basicTotalStats2: 'firstName lastName',
    help: '',
    usage: ''
};

export const includesCommand = (CMD_NAME) => Object.keys(commandArgsMap).includes(CMD_NAME);