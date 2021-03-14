import styles from './styles';
import nodeHtmlToImage from 'node-html-to-image';
import { commandDisplayMap, exceptions } from '../util/commands';

const getHeaders = (values, CMD_NAME) => {
    let headersHTML = '';
    values.map((index) => {
        headersHTML += `<th class='tableRow'>${!exceptions.includes(CMD_NAME) ? values[index] : index}</th>`;
    });
    return headersHTML;
};

const getRows = (rows, CMD_NAME) => {
    let rowsHTML = '';
    rows.map((index) => {
        rowsHTML += `<th class='tableRow'>${!exceptions.includes(CMD_NAME) ? rows[index] : index}</th>`;
    });
    return rowsHTML;
};

const metaTags = () => (
    `<meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta http-equiv='X-UA-Compatible' content='ie=edge' />`
);

const getYearString = (year) => (
    year === 'career'
        ? 'Career'
        : `${year}-${parseInt(year) + 1}`
);

const partialTables = (headers, rows, CMD_NAME) => {
    const testHeaders = {
        0: headers.slice(0, 5),
        1: headers.slice(5, 10),
        2: headers.slice(10, 15),
        3: headers.slice(15, 20),
        4: headers.slice(20, 25),
        5: headers.slice(25, 30)
    };
    const testRows = {
        0: rows.slice(0, 5),
        1: rows.slice(5, 10),
        2: rows.slice(10, 15),
        3: rows.slice(15, 20),
        4: rows.slice(20, 25),
        5: rows.slice(25, 30)
    };
    let html = '';
    Object.keys(testHeaders).forEach((index) => {
        html += (`
            <table>
                <tr>${getHeaders(testHeaders[index], CMD_NAME)}</tr>
                <tr>${getRows(testRows[index], CMD_NAME)}</tr>
            </table>
            <br />
        `);
    });
    return html;
};

export const onePlayerHTMLTemplate = async (headers, rows, playerName, year, CMD_NAME) => {
    const _htmlTemplate = 
    `<!DOCTYPE html>
        <html lang='en'>
            <head>
                ${metaTags()}
                <style>
                    ${styles()}
                </style>
            </head>
            <body>
                <div class='app'>
                    <h4>${playerName} ${commandDisplayMap[CMD_NAME]} (${getYearString(year)})</h4>
                    ${partialTables(headers, rows, CMD_NAME)}
                </div>
            </body>
        </html>`;
    const image = await nodeHtmlToImage({
        html: _htmlTemplate,
        quality: 100,
        type: 'jpeg',
        puppeteerArgs: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        },
        encoding: 'buffer'
    });
    return image;
};

export const twoPlayerHTMLTemplate = async (headers, [playerOneStats, playerOneName, playerOneTimeframe], [playerTwoStats, playerTwoName, playerTwoTimeframe], statType, CMD_NAME) => {
    const headersHTML = getRows(headers, statType);
    const playerOneRows = getRows(playerOneStats, statType);
    const playerTwoRows = getRows(playerTwoStats, statType);
    const _htmlTemplate = 
        `<!DOCTYPE html>
            <html lang='en'>
                <head>
                    ${metaTags()}
                    <style>
                        ${styles()}
                    </style>
                </head>
                <body>
                    <div class='app'>
                        <h4>${playerOneName} ${commandDisplayMap[CMD_NAME]} (${playerOneTimeframe}-${parseInt(playerOneTimeframe) + 1})</h4>
                        <table>
                            <tr>${headersHTML}</tr>
                            <tr>${playerOneRows}</tr>
                        </table>
                        <h4>${playerTwoName} ${commandDisplayMap[CMD_NAME]} (${playerTwoTimeframe}-${parseInt(playerTwoTimeframe) + 1})</h4>
                        <table>
                            <tr>${headersHTML}</tr>
                            <tr>${playerTwoRows}</tr>
                        </table>
                    </div>
                </body>
            </html>`;
    const image = await nodeHtmlToImage({
        html: _htmlTemplate,
        quality: 100,
        type: 'jpeg',
        puppeteerArgs: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
        },
        encoding: 'buffer'
    });
    return image;
};