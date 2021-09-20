import cheerio from 'cheerio';
import { commandTableHtmlSubstringMap, commandTypedToRowElementMap, multipleHeaders } from './commands';
import { getDataAttribute } from './attributeMaps'
import { getTable } from './html';
import { getStatName, isGameHigh } from './index'

export const getTableData = (page, year, CMD_NAME) => {
    const parsedPage = getTable(page, commandTableHtmlSubstringMap[CMD_NAME]);
    const $ = cheerio.load(parsedPage);

    const tableHeader = getTableHeader($, CMD_NAME);
    const tableBody = $(`tbody`).children('tr');

    const firstYear = getFirstYear(tableBody);
    const lastYear = getLastYear(tableBody);

    const actualYearString = getActualYear(
        firstYear,
        lastYear,
        year
    );

    const yearData = {
        actualYearString,
        firstYear,
        lastYear,
        difference: parseInt(actualYearString) - parseInt(firstYear)
    }

    const statNames = getHeaderStatNames($, CMD_NAME, tableHeader)

    const stats = getStats($, CMD_NAME, yearData, statNames);

    return {
        actualYearString,
        stats,
        statNames
    };
};

const getTableHeader = ($, CMD_NAME) => !multipleHeaders.includes(CMD_NAME)
    ? $(`thead`).children('tr')
    : $(`thead`).children('tr').get(1).children.filter((_, index) => index % 2 === 1);

const getActualYear = (firstYear, lastYear, year) => {
    if (!year) return lastYear;
    if (year < firstYear) return firstYear;
    if (year > lastYear) return lastYear;
    return year;
}

const getFirstYear = (tableBody) => (
    tableBody.get(0).children[0].firstChild.firstChild
    ? tableBody.get(0).children[0].firstChild.firstChild.data.split('-')[0]
    : tableBody.get(0).children[0].firstChild.firstChild.data.split('-')[0]);

const getLastYear = (tableBody, index = 0) => (
    tableBody.get(tableBody.length - 1 - index).children[0].firstChild
        ? tableBody.get(tableBody.length - 1 - index).children[0].firstChild.firstChild.data.split('-')[0]
        : getLastYear(tableBody, index + 1)
);

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
        statNames.push(rawStatNames[i])
    }
    return statNames
};

const getElement = ($, CMD_NAME, yearAttribute, attribute, difference, index) => isGameHigh(CMD_NAME)
    ? $('tbody > tr')[difference].children[index + 4]
    : $(`[id="${commandTypedToRowElementMap[CMD_NAME]}.${yearAttribute}"] > [data-stat="${attribute}"]`)[0].children[0]

const formatElement = (element, CMD_NAME) => {
    if (!element) {
        return 0
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

const getStats = ($, CMD_NAME, { actualYearString, difference }, statNames) => {
    const stats = [];
    const yearAttribute = (parseInt(actualYearString) + 1).toString();
    for (let i = 0; i < statNames.length; i++) {
        const statName = getStatName(CMD_NAME, statNames[i], i)
        const attribute = getDataAttribute(statName, CMD_NAME)
        const element = getElement($, CMD_NAME, yearAttribute, attribute, difference, i);
        const formattedElement = formatElement(element, CMD_NAME);
        stats.push(formattedElement);
    }
    return stats;
};