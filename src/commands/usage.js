import Commands from '../models/commands';

const incrementUsage = async () => {
    const query = { name: 'usage' };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};

export const usage = async () => {
    try {
        let usage = `Total Usage for all commands:\n\n`;
        await incrementUsage();
        const commands = await Commands.find({});
        commands.forEach(({ invocations, name }) => {
            usage += `${name}: ${invocations}\n`;
        });
        return usage;
    } catch (err) {
        return connectionError;
    }
};