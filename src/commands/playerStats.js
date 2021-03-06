import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';
import { startCase } from 'lodash';

import { basketballReferencePageNotFound, playerNotFound } from '../errors';
import { allPlayers, basketballReferencePage, specificPlayer } from '../apis';
import { getActualYear, getSpecifiedYearData, getTableData, tableLocationMap } from '../util/basketballReference';
import { getFullName, splitName } from '../util';
import { commandStatsMap, incrementCommand } from '../util/commands';
import { onePlayerHTMLTemplate } from '../templates/htmlTemplate';

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

        const statNames = commandStatsMap[CMD_NAME];
        const yearIndex = getYear(year, playerSeasonStats.length);

        const stats = statNames.map((stat) => (
            year === 'career'
                ? playerStatsResponse.league.standard.stats.careerSummary[stat]
                : playerSeasonStats[yearIndex].total[stat]
        ));
        return {
            name,
            stats,
            statNames,
            actualYear: year ? year : new Date().getFullYear() - 1
        };
    } else {
        const { firstName, lastName } = splitName(name);

        const page = await (await fetch(basketballReferencePage(firstName, lastName))).text();
        if (page.includes(basketballReferencePageNotFound)) return {};

        const { specifiedYear, actualYear } = getTableData(page, year, CMD_NAME);

        return {
            name,
            stats: tableLocationMap[CMD_NAME].map((index) => getSpecifiedYearData(specifiedYear, index)),
            statNames: commandStatsMap[CMD_NAME],
            actualYear
        };
    }
};

export const playerStatsImage = async ([firstName, lastName, year], CMD_NAME) => {
    const { name, statNames, stats, actualYear } = await playerStats(getFullName(firstName, lastName).toLowerCase(), year, CMD_NAME);

    if (!(name && stats && statNames)) return playerNotFound;

    const images = await onePlayerHTMLTemplate(statNames, stats, startCase(name), CMD_NAME, actualYear);

    await incrementCommand(CMD_NAME);
    return new MessageAttachment(images, 'anything.jpg');
};