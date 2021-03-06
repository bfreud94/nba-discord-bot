import cheerio from 'cheerio';
import { commandTableIdMap } from './commands';

export const tableLocationMap = {
    basicStats: [7, 29, 23, 24, 25, 26],
    advancedStats: []
};

export const getActualYear = (firstYear, lastYear, year) => {
    if (!year) return lastYear;
    if (year < firstYear) return firstYear;
    if (year > lastYear) return lastYear; 
    return year;
}

export const getTableData = (page, year, CMD_NAME) => {
    const $ = cheerio.load(page);
    const tableBody = $(`#${commandTableIdMap[CMD_NAME]} tbody`).children('tr');

    const actualYear = getActualYear(
        tableBody.get(0).children[0].firstChild.firstChild.data.split('-')[0],
        tableBody.get(tableBody.length - 1).children[0].firstChild.firstChild.data.split('-')[0],
        year
    )
    

    return {
        specifiedYear: tableBody.filter((index, child) => {
            if (!$(child).children().get(0).firstChild.firstChild) return $(child).children().get(0).firstChild.data.split('-')[0] === actualYear;
            return $(child).children().get(0).firstChild.firstChild.data.split('-')[0] === actualYear;
        }),
        actualYear
    };
};

export const getSpecifiedYearData = (specifiedYear, index) => {
    return specifiedYear.children().get(index).firstChild.data
        ? specifiedYear.children().get(index).firstChild.data
        : specifiedYear.children().get(index).firstChild.firstChild.data;
};

export const getLastYearData = (tableBody, index) => (tableBody.get(tableBody.length - 1).children[index].firstChild.data);