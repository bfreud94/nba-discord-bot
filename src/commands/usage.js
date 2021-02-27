import Commands from '../models/commands';
import { incrementCommand } from '../util/commands';
import { connectionError } from '../errors/index';

export const usage = async (CMD_NAME) => {
    try {
        let usage = `Total Usage for all commands:\n\n`;
        await incrementCommand(CMD_NAME);
        const commands = await Commands.find({});
        commands.forEach(({ invocations, name }) => {
            usage += `${name}: ${invocations}\n`;
        });
        return usage;
    } catch (err) {
        return connectionError;
    }
};