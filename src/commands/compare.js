import { MessageAttachment } from 'discord.js';
import { startCase } from 'lodash';

import { playerStats } from '../commands/playerStats';
import { incrementCommand } from '../util/commands';
import { twoPlayerHTMLTemplate } from '../templates/htmlTemplate';
import { getFullName } from '../util';

export default async ([statType, playerOneFirstName, playerOneLastName, playerTwoFirstName, playerTwoLastName, playerOneTimeframe = 2020, playerTwoTimeframe = 2020], CMD_NAME) => {
    const playerOneStats = await playerStats(getFullName(playerOneFirstName, playerOneLastName).toLowerCase(), playerOneTimeframe, statType);
    const playerTwoStats = await playerStats(getFullName(playerTwoFirstName, playerTwoLastName).toLowerCase(), playerTwoTimeframe, statType);
    const image = await twoPlayerHTMLTemplate(playerOneStats.statNames, [playerOneStats.stats, startCase(playerOneStats.fullName), playerOneTimeframe], [playerTwoStats.stats, startCase(playerTwoStats.fullName), playerTwoTimeframe], CMD_NAME);
    await incrementCommand(CMD_NAME);
    return new MessageAttachment(image, 'anything.jpg');
};