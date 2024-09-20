import { MessageAttachment } from 'discord.js';
import { startCase } from 'lodash';

import { playerStats } from '../commands/playerStats';
import { incrementCommand } from '../util/commands';
import { twoPlayerHTMLTemplate } from '../templates/htmlTemplate';
import { getFullName, getFullCompareCommandName } from '../util';

export default async ([playerOneFirstName, playerOneLastName, playerOneTimeframe, playerTwoFirstName, playerTwoLastName, playerTwoTimeframe], CMD_NAME) => {
    const playerOneStats = await playerStats(getFullName(playerOneFirstName, playerOneLastName).toLowerCase(), playerOneTimeframe, CMD_NAME);
    const playerTwoStats = await playerStats(getFullName(playerTwoFirstName, playerTwoLastName).toLowerCase(), playerTwoTimeframe, CMD_NAME);
    if (playerOneStats.error) {
        return playerOneStats.error;
    }
    if (playerTwoStats.error) {
        return playerTwoStats.error;
    }
    const image = await twoPlayerHTMLTemplate(playerOneStats.statNames, [playerOneStats.stats, startCase(playerOneStats.name), playerOneStats.actualYearString], [playerTwoStats.stats, startCase(playerTwoStats.name), playerTwoStats.actualYearString], CMD_NAME);
    await incrementCommand(getFullCompareCommandName(CMD_NAME));
    return new MessageAttachment(image, 'twoPlayerComparison.jpg');
};