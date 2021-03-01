import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';
import { startCase } from 'lodash';
import cheerio from 'cheerio';

import { basketballReferencePageNotFound, playerNotFound } from '../errors';
import { allPlayers, basketballReferencePage, specificPlayer } from '../apis';
import { tableLocationMap } from '../util/basketballReference';
import { getFullName, splitName } from '../util';
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

    const player = players.filter(({ firstName, lastName }) => getFullName(firstName, lastName).toLowerCase() === name)[0];
    if (player) {
        const { personId } = player;
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
            name,
            stats,
            statNames
        };
    } else {
        const { firstName, lastName } = splitName(name);
        const page = await (await fetch(basketballReferencePage(firstName, lastName))).text();
        if (page.includes(basketballReferencePageNotFound)) return {};
        const $ = cheerio.load(page);

        const tableBody = $('#all_per_game tbody').children('tr');
        const specifiedYear = tableBody.filter((index, child) => index === 0 ? false : $(child).children().get(0).firstChild.firstChild.data.split('-')[0] === year);

        if (specifiedYear.length !== 0) {
            return {
                name,
                stats: tableLocationMap[CMD_NAME].map((index) => specifiedYear.children().get(index).firstChild.data),
                statNames: statsMap[CMD_NAME]
            };
        } else {
            return {
                name,
                stats: tableLocationMap[CMD_NAME].map((index) => tableBody.get(tableBody.length - 1).children[index].firstChild.data),
                statNames: statsMap[CMD_NAME],
                lastYear: tableBody.get(tableBody.length - 1).children[0].firstChild.firstChild.data.split('-')[0]
            };
        }
    }
};

export const playerStatsImage = async ([firstName, lastName, year = 2020], CMD_NAME) => {
    const { name, statNames, stats, lastYear } = await playerStats(getFullName(firstName, lastName).toLowerCase(), year, CMD_NAME);
    if (!(name && stats && statNames)) return playerNotFound;
    const images = await onePlayerHTMLTemplate(statNames, stats, startCase(name), CMD_NAME, lastYear ? lastYear : year);
    await incrementCommand(CMD_NAME);
    return new MessageAttachment(images, 'anything.jpg');
};