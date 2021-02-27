// Internal dependencies
import { commandArgsMap } from '../util/commands';

export const helpMessage = () => {
    let message = `Hi! This is a list of commands I know how to do: \n\nCommands:\n\n`;
    Object.keys(commandArgsMap).forEach((command) => {
        message += `!${command}: ${commandArgsMap[command] !== ''
            ? `${commandArgsMap[command]}\n`
            : `\n`
        }`;
    });
    return message;
};