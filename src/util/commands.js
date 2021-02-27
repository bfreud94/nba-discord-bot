import Commands from '../models/commands';

export const commandArgsMap = {
    basicStats: 'firstName lastName year',
    advancedStats: 'firstName lastName year',
    basicTotalStats: 'firstName lastName year',
    basicTotalStats2: 'firstName lastName year',
    help: '',
    usage: ''
};

export const incrementCommand = async (name) => {
    const query = { name };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};