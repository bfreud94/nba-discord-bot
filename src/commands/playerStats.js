import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';
import { startCase } from 'lodash';

import { playerNotFound } from '../errors';
import { allPlayers, specificPlayer } from '../apis';
import { getFullName } from '../util';
import { incrementCommand } from '../util/commands';
import { onePlayerHTMLTemplate } from '../templates/htmlTemplate';

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

export const playerStats = async (name, year, CMD_NAME) => {
    const allPlayersResponse = await (await fetch(allPlayers)).json();
    const players = allPlayersResponse.league.standard;

    for (let player of players) {

        const { firstName, lastName, personId } = player;
        const fullName = getFullName(firstName, lastName).toLowerCase();

        if (name === fullName) {
            const playerStatsResponse = await (await fetch(specificPlayer(personId))).json();

            const playerSeasonStats = playerStatsResponse.league.standard.stats.regularSeason.season;

            const statNames = statsMap[CMD_NAME];
            const yearIndex = getYear(year, playerSeasonStats.length);

            const stats = statNames.map((stat) => (
                year === 'career'
                    ? playerStatsResponse.league.standard.stats.careerSummary[stat]
                    : playerSeasonStats[yearIndex].total[stat]
            ));
            return {
                fullName,
                stats,
                statNames
            };
        }
    }
    return playerNotFound;
};

export const playerStatsImage = async ([firstName, lastName, year = 2020], CMD_NAME) => {
    const { fullName, statNames, stats } = await playerStats(getFullName(firstName, lastName).toLowerCase(), year, CMD_NAME);
    if (playerStats === playerNotFound) return playerNotFound;
    const images = await onePlayerHTMLTemplate(statNames, stats, startCase(fullName), CMD_NAME, year);
    await incrementCommand(CMD_NAME);
    return new MessageAttachment(images, 'anything.jpg');
};