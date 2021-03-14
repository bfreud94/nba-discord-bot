import { endTable } from './constants';

export const getTable = (page, tableString) => {
    const startIndex = page.indexOf(tableString);
    const endIndex = page.substring(startIndex).indexOf(endTable) + startIndex + endTable.length;
    return page.substring(startIndex, endIndex);
}