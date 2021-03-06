import Commands from '../models/commands';

export const commandArgsMap = {
    basicStats: 'firstName lastName timeframe',
    advancedStats: 'firstName lastName timeframe',
    basicTotalStats: 'firstName lastName timeframe',
    basicTotalStats2: 'firstName lastName timeframe',
    help: '',
    usage: '',
    compare: 'playerOneFirstName playerOneLastName playerTwoFirstName playerTwoLastName playerOneTimeFrame playerTwoTimeFrame'
};

export const commandTableIdMap = {
    basicStats: 'all_per_game'
};

export const commandStatsMap = {
    basicStats: ['mpg', 'ppg', 'rpg', 'apg', 'spg', 'bpg'],
    advancedStats: ['fgp', 'tpp', 'ftp', 'topg', 'plusMinus', 'dd2', 'td3'],
    basicTotalStats: ['min', 'points', 'totReb', 'assists', 'steals', 'blocks'],
    basicTotalStats2: ['fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta']
};

export const incrementCommand = async (name) => {
    const query = { name };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};