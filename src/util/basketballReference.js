import cheerio from 'cheerio';
import { commandTableHtmlSubstringMap, exceptions } from './commands';
import { getTable } from './html';

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

const getStatNames = ($, header) => (
    header.children()
    .map((index, child) => ($(child).get(0).firstChild
        ? $(child).get(0).firstChild.data
        : ''
    ))
    .slice(5)
);

const getStatNamesExceptions = ($, header) => (
    header
    .map((child, index) => {
        return header[index]
            ? header[index].children[0].data
            : ''
    })
    .slice(5)
);

const getSpecifiedYearData = (specifiedYear, index) => {
    const tableCell = specifiedYear.children().get(index + 5);
    if (specifiedYear.children().length <= index + 5) return '';
    if (!specifiedYear.children().get(index + 5).firstChild) return '';
    return tableCell
        ? specifiedYear.children().get(index + 5).firstChild.data
        : specifiedYear.children().get(index + 5).firstChild.firstChild.data;
};

export const getTableData = (page, year, CMD_NAME) => {
    const parsedPage = getTable(page, commandTableHtmlSubstringMap[CMD_NAME]);
    const $ = cheerio.load(parsedPage);

    const tableHeader = !exceptions.includes(CMD_NAME)
        ? $(`thead`).children('tr')
        : $(`thead`).children('tr').get(1).children.filter((child, index) => index % 2 === 1);
    const tableBody = $(`tbody`).children('tr');

    const actualYearString = getActualYear(
        getFirstYear(tableBody),
        getLastYear(tableBody),
        year
    );

    const specifiedYearTableData = tableBody.filter((index, child) => (
        !$(child).children().get(0).firstChild.firstChild
            ? $(child).children().get(0).firstChild.data.split('-')[0] === actualYearString
            : $(child).children().get(0).firstChild.firstChild.data.split('-')[0] === actualYearString
    ));

    const statNames = !exceptions.includes(CMD_NAME)
        ? getStatNames($, tableHeader).filter((index, statName) => statName.trim() !== '')
        : getStatNamesExceptions($, tableHeader).filter((statName) => statName.trim() !== '');

    return {
        actualYearString,
        stats: statNames.map((child, index) => (getSpecifiedYearData(
            specifiedYearTableData,
            !exceptions.includes(CMD_NAME)
                ? child
                : index
            )))
            .filter((index, value) => {
                if (!index || !value) return false;
                return !exceptions.includes(CMD_NAME)
                    ? value.trim() !== ''
                    : index.trim() !== ''
            }),
        statNames
    };
};