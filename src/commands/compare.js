import { playerStats } from '../commands/playerStats';
import { incrementCommand } from '../util/commands';
import { twoPlayerHTMLTemplate } from '../templates/htmlTemplate';
import { MessageAttachment } from 'discord.js';

export default async ([statType, playerOneFirstName, playerOneLastName, playerTwoFirstName, playerTwoLastName, playerOneTimeFrame, playerTwoTimeFrame], CMD_NAME) => {
    const playerOneStats = await playerStats([playerOneFirstName, playerOneLastName, playerOneTimeFrame], statType);
    const playerTwoStats = await playerStats([playerTwoFirstName, playerTwoLastName, playerTwoTimeFrame], statType);
    const image = await twoPlayerHTMLTemplate(playerOneStats.statNames, [playerOneStats.stats, playerOneStats.fullName], [playerTwoStats.stats, playerTwoStats.fullName], CMD_NAME);
    await incrementCommand(CMD_NAME);
    return new MessageAttachment(image, 'anything.jpg');
};