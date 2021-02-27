import Commands from '../models/commands';

export const commandArgsMap = {
    basicStats: 'firstName lastName',
    advancedStats: 'firstName lastName',
    basicTotalStats: 'firstName lastName',
    basicTotalStats2: 'firstName lastName',
    help: '',
    usage: ''
};

export const incrementCommand = async (name) => {
    const query = { name };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};