import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';

import htmlTemplate from '../templates/htmlTemplate';
import { playerNotFound } from '../errors';
import { allPlayers, specificPlayer } from '../apis';
import { createHTMLImage, getFullName } from '../util';
import { incrementCommand } from '../util/commands';

export const statsMap = {
    basicStats: ['mpg', 'ppg', 'rpg', 'apg', 'spg', 'bpg'],
    advancedStats: ['fgp', 'tpp', 'ftp', 'topg', 'plusMinus', 'dd2', 'td3'],
    basicTotalStats: ['min', 'points', 'totReb', 'assists', 'steals', 'blocks'],
    basicTotalStats2: ['fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta']
};

const getYear = (year, max) => {
    if (year < 0 || !year || year <= 2020 - max || isNaN(year)) return 0;
    return 2020 - year >= 0 ? 2020 - year : 0;
};

const playerStats = async ([firstName, lastName, year], CMD_NAME) => {
    const playerName = getFullName(firstName, lastName).toLowerCase();

    const allPlayersResponse = await (await fetch(allPlayers)).json();
    const players = allPlayersResponse.league.standard;

    for (let player of players) {

        const { firstName, lastName, personId } = player;
        const fullName = getFullName(firstName, lastName);

        if (playerName === fullName.toLowerCase()) {
            const playerStatsResponse = await (await fetch(specificPlayer(personId))).json();

            const playerSeasonStats = playerStatsResponse.league.standard.stats.regularSeason.season;

            const statsList = statsMap[CMD_NAME];
            const yearIndex = getYear(year, playerSeasonStats.length);

            const stats = statsList.map((stat) => (
                year === 'career'
                    ? playerStatsResponse.league.standard.stats.careerSummary[stat]
                    : playerSeasonStats[yearIndex].total[stat]
            ));

            const _htmlTemplate = htmlTemplate(statsList, stats, fullName, CMD_NAME);
            const images = await createHTMLImage(_htmlTemplate);

            await incrementCommand(CMD_NAME);

            return new MessageAttachment(images, 'anything.jpg');
        }
    }
    return playerNotFound;
};

export default playerStats;