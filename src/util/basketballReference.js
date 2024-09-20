import cheerio from 'cheerio';
import { capitalize } from 'lodash';
import { commandTableHtmlSubstringMap, commandTypedToRowElementMap, multipleHeaders } from './commands';
import { getDataAttribute, shootingModifiedStatNames } from './attributeMaps'
import { getTable } from './html';
import { getStatName, isGameHigh } from './index'
import { gameHighNotAvailable, invalidYear } from '../errors';

export const getTableData = (page, year, CMD_NAME, name) => {
    let stats = [];
    let statNames = [];
    let error = null;

    const parsedPage = getTable(page, commandTableHtmlSubstringMap[CMD_NAME]);
    const $ = cheerio.load(parsedPage);

    const tableHeader = getTableHeader($, CMD_NAME);
    const tableBody = $('tbody').children('tr');

    const firstYear = getFirstYear(tableBody);
    const lastYear = getLastYear(tableBody);

    const actualYearString = getActualYear(
        firstYear,
        lastYear,
        year
    );

    const yearsUnavailable = getYearsUnavailable(page);

    if (CMD_NAME === 'gamehigh' && firstYear < 1965) {
        error = gameHighNotAvailable;
    } else if (yearsUnavailable.includes(actualYearString)) {
        error = invalidYear(name.replace(/\w+/g, capitalize));
    } else {
        const yearData = {
            actualYearString,
            firstYear,
            lastYear,
            difference: parseInt(actualYearString) - parseInt(firstYear),
            yearsUnavailable
        }
    
        statNames = getHeaderStatNames($, CMD_NAME, tableHeader);
    
        stats = getStats($, CMD_NAME, yearData, statNames, tableBody);
    
        if (CMD_NAME === 'shooting') {
            statNames = shootingModifiedStatNames;
        }
    }

    return {
        actualYearString,
        stats,
        statNames,
        error
    };
};

const getTableHeader = ($, CMD_NAME) => {
    const tableHeader = $(`thead`).children('tr');
    if (multipleHeaders.includes(CMD_NAME)) {
        if (tableHeader.get(1)) {
            return tableHeader.get(1).children.filter((_, index) => index % 2 === 1);
        }
        return tableHeader.get(0).children.filter((_, index) => index % 2 === 1);
    }
    return tableHeader;
}

const getActualYear = (firstYear, lastYear, year) => {
    if (!year) return lastYear;
    if (year && year.toLowerCase() === 'career') return 'career';
    if (year < firstYear) return firstYear;
    if (year > lastYear) return lastYear;
    return year;
}

const getFirstYear = (tableBody) => {
    const firstChild = tableBody.get(0).children[0].firstChild;
    if (firstChild) {
        if (firstChild.firstChild) {
            return firstChild.firstChild.data.split('-')[0];
        }
    }
}

const getLastYear = (tableBody, index = 0) => {
    const firstChild = tableBody.get(tableBody.length - 1 - index).children[0].firstChild;
    if (firstChild) {
        if (firstChild.firstChild) {
            return firstChild.firstChild.data.split('-')[0];
        } else {
            return firstChild.data.split('-')[0];
        }
    } else {
        return getLastYear(tableBody, index + 1);
    }
};

const getHeaderStatNames = ($, CMD_NAME, tableHeader) => {
    const getHeaderStatNamesSingleHeader = ($, tableHeader) => (
        tableHeader.children()
            .map((_, child) => ($(child).get(0).firstChild
                ? $(child).get(0).firstChild.data
                : ''
            ))
            .slice(5)
    );
    
    const getHeaderStatNamesMultipleHeaders = ($, tableHeader) => (
        tableHeader
        .map((_, index) => {
            return tableHeader[index]
                ? tableHeader[index].children[0].data
                : ''
        })
        .slice(5)
    );
    const rawStatNames = !multipleHeaders.includes(CMD_NAME)
        ? getHeaderStatNamesSingleHeader($, tableHeader).filter((_, statName) => statName.trim() !== '')
        : getHeaderStatNamesMultipleHeaders($, tableHeader).filter((statName) => statName.trim() !== '');
    
    const statNames = []
    for (let i = 0; i < rawStatNames.length; i++) {
        if (rawStatNames[i] !== 'Awards') {
            statNames.push(rawStatNames[i]);
        }
    }

    return statNames
};

const getElement = ($, CMD_NAME, yearAttribute, attribute, difference, index) => {
    if (isGameHigh(CMD_NAME)) {
        if ($('tbody > tr')[difference]) {
            return $('tbody > tr')[difference].children[index + 4];
        }
        return $('tbody > tr')[index];
    } else {
        const element = $(`[id="${commandTypedToRowElementMap[CMD_NAME]}.${yearAttribute}"] > [data-stat="${attribute}"]`)[0].children[0];
        return element;
    }
} 

const formatElement = (element, CMD_NAME) => {
    if (!element) {
        return 0;
    } else if(isGameHigh(CMD_NAME)) {
        return element.children[0].children[0].data;
    } else {
        const isStrong = element.name === 'strong'
        const data = isStrong
            ? element.children[0].data
            : element.data
        return data;
    }
}

const getStats = ($, CMD_NAME, { actualYearString, difference }, statNames, tableBody) => {
    const stats = [];
    if (actualYearString.toLowerCase() === 'career') {
        const invalidStats = ['NBA', 'Career'];
        $('tfoot').children('tr')[0].children.forEach((child) => {
            if (child.firstChild && !invalidStats.includes(child.firstChild.data)) {
                stats.push(child.firstChild.data);
            }
        })
    } else {
        const yearAttribute = (parseInt(actualYearString) + 1).toString();
        for (let i = 0; i < statNames.length; i++) {
            const statName = getStatName(CMD_NAME, statNames[i], i)
            const attribute = getDataAttribute(statName, CMD_NAME);
            if (attribute !== undefined) {
                const element = getElement($, CMD_NAME, yearAttribute, attribute, difference, i, tableBody);
                const formattedElement = formatElement(element, CMD_NAME);
                stats.push(formattedElement);
            }
        }
    }
    return stats;
};

const getYearsUnavailable = (page) => {
    const yearsUnavailable = []
    const $ = cheerio.load(page);
    const tableToParseOver = isPlayerActive(page) ? 1 : 0;
    $('tbody')[tableToParseOver].children.forEach((child, i) => {
        if (i % 2 === 1) {
            if (child.children && child.children[0] && !child.children[0].children) {
                let year = child.children[1].firstChild.data;
                year = year.split('-')[0];
                yearsUnavailable.push(year);
            }
        }
    });
    return yearsUnavailable;
};

const isPlayerActive = (page) => {
    const $ = cheerio.load(page);
    return $('div:contains("Experience")').toString().trim().includes('Experience:');
};