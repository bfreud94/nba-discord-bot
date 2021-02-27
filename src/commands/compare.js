import { playerStats } from '../commands/playerStats';
import { incrementCommand } from '../util/commands';
import { twoPlayerHTMLTemplate } from '../templates/htmlTemplate';
import { MessageAttachment } from 'discord.js';

export default async ([statType, playerOneFirstName, playerOneLastName, playerTwoFirstName, playerTwoLastName, playerOneTimeframe = 2020, playerTwoTimeframe = 2020], CMD_NAME) => {
    const playerOneStats = await playerStats([playerOneFirstName, playerOneLastName, playerOneTimeframe], statType);
    const playerTwoStats = await playerStats([playerTwoFirstName, playerTwoLastName, playerTwoTimeframe], statType);
    const image = await twoPlayerHTMLTemplate(playerOneStats.statNames, [playerOneStats.stats, playerOneStats.fullName, playerOneTimeframe], [playerTwoStats.stats, playerTwoStats.fullName, playerTwoTimeframe], CMD_NAME);
    await incrementCommand(CMD_NAME);
    return new MessageAttachment(image, 'anything.jpg');
};