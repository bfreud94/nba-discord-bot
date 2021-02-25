// External dependencies
import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';

// Internal dependencies
import htmlTemplate from '../templates/htmlTemplate';
import { playerNotFound } from '../errors';
import { allPlayers, specificPlayer } from '../apis';
import { basicStatsTableHeaders, createHTMLImage, getFullName } from '../util';

const basicStats = async (playerName) => {
    const allPlayersResponse = await (await fetch(allPlayers)).json();
    const players = allPlayersResponse.league.standard;
    for (let player of players) {
        const { firstName, lastName, personId } = player;
        const fullName = getFullName(firstName, lastName);
        if (playerName === fullName.toLowerCase()) {
            const playerStats = await (await fetch(specificPlayer(personId))).json();
            const { ppg, rpg, apg, spg, bpg } = playerStats.league.standard.stats.regularSeason.season[0].total;
            const _htmlTemplate = htmlTemplate(basicStatsTableHeaders, [ppg, rpg, apg, spg, bpg], fullName);
            const images = await createHTMLImage(_htmlTemplate);
            return new MessageAttachment(images, 'anything.jpg');
        }
    }
    return playerNotFound;
}

export {
    basicStats
}