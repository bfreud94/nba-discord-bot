// External dependencies
import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';

// Internal dependencies
import htmlTemplate from '../templates/htmlTemplate';
import { playerNotFound } from '../errors';
import { allPlayers, specificPlayer } from '../apis';
import { createHTMLImage, getFullName } from '../util';

export const statsMap = {
    basicStats: ['mpg', 'ppg', 'rpg', 'apg', 'spg', 'bpg'],
    advancedStats: ['fgp', 'tpp', 'ftp', 'topg', 'plusMinus', 'dd2', 'td3'],
    basicTotalStats: ['min', 'points', 'totReb', 'assists', 'steals', 'blocks'],
    basicTotalStats2: ['fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta']
};

const playerStats = async ([ firstName, lastName], statType) => {
    const playerName = getFullName(firstName, lastName).toLowerCase();

    const allPlayersResponse = await (await fetch(allPlayers)).json();
    const players = allPlayersResponse.league.standard;

    for (let player of players) {

        const { firstName, lastName, personId } = player;
        const fullName = getFullName(firstName, lastName);

        if (playerName === fullName.toLowerCase()) {
            const playerStats = await (await fetch(specificPlayer(personId))).json();

            const statsList = statsMap[statType];
            const stats = statsList.map((stat) => playerStats.league.standard.stats.regularSeason.season[0].total[stat]);

            const _htmlTemplate = htmlTemplate(statsList, stats, fullName, statType);
            const images = await createHTMLImage(_htmlTemplate);

            return new MessageAttachment(images, 'anything.jpg');
        }
    }
    return playerNotFound;
}

export default playerStats;