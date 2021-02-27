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

export const incrementCommand = async (name) => {
    const query = { name };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};