const commandArgsMap = {
    basicStats: 'firstName lastName',
    advancedStats: 'firstName lastName',
    basicTotalStats: 'firstName lastName',
    basicTotalStats2: 'firstName lastName',
    help: ''
};

const helpMessage = () => {
    let message = `Hi! This is a list of commands I know how to do: \n\nCommands:\n\n`;
    Object.keys(commands).forEach((command) => {
        message += `!${command}: ${commandArgsMap[command] !== ''
            ? `${commandArgsMap[command]}\n`
            : `\n`
        }`;
    });
    return message;
};

const commands = {
    basicStats: ['mpg', 'ppg', 'rpg', 'apg', 'spg', 'bpg'],
    advancedStats: ['fgp', 'tpp', 'ftp', 'topg', 'plusMinus', 'dd2', 'td3'],
    basicTotalStats: ['min', 'points', 'totReb', 'assists', 'steals', 'blocks'],
    basicTotalStats2: ['fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta'],
    help: helpMessage
};

export default commands;