import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';
import { capitalize } from 'lodash';
import { basketballReferencePageNotFound, playerNotFound } from '../errors';
import { basketballReferencePage } from '../apis';
import { getTableData } from '../util/basketballReference';
import { getFullName, splitName } from '../util/index';
import { incrementCommand } from '../util/commands';
import { onePlayerHTMLTemplate } from '../templates/htmlTemplate';

export const playerStats = async (name, year, CMD_NAME) => {
    const { firstName, lastName } = splitName(name);

    const page = await (await fetch(basketballReferencePage(firstName, lastName))).text();
    if (page.includes(basketballReferencePageNotFound)) return {};

    const { stats, statNames, actualYearString, error } = getTableData(page, year, CMD_NAME, name);

    return {
        name,
        stats,
        statNames,
        actualYearString,
        error
    };
};

export const playerStatsImage = async ([firstName, lastName, year], CMD_NAME) => {
    const { name, statNames, stats, actualYearString, error } = await playerStats(
        getFullName(firstName, lastName).toLowerCase(),
        year,
        CMD_NAME
    );

    if (error) {
        return error;
    }
 
    if (!(name && stats && statNames)) return playerNotFound;

    const formattedName = name.replace(/\w+/g, capitalize);

    const images = await onePlayerHTMLTemplate(statNames, stats, formattedName, actualYearString, CMD_NAME);
    
    await incrementCommand(CMD_NAME);

    return new MessageAttachment(images, `${name}-${CMD_NAME}.png`);
};