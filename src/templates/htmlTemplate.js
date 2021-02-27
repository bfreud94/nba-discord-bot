import { getRowName } from '../util';
import styles from './styles';
import nodeHtmlToImage from 'node-html-to-image';

const getRows = (values, statType) => {
    let rowsHTML = '';
    values.map((value) => {
        rowsHTML += `<th class='tableRow'>${getRowName(value, statType)}</th>`;
    });
    return rowsHTML;
};

const metaTags = () => (
    `<meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta http-equiv='X-UA-Compatible' content='ie=edge' />`
);

export const onePlayerHTMLTemplate = async (headers, values, playerName, statType) => {
    const headersHTML = getRows(headers, statType);
    const rowsHTML = getRows(values, statType);
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
                    <h4>${playerName}</h4>
                    <table>
                        <tr>${headersHTML}</tr>
                        <tr>${rowsHTML}</tr>
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

export const twoPlayerHTMLTemplate = async (headers, [playerOneStats, playerOneName], [playerTwoStats, playerTwoName], statType) => {
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
                        <h4>${playerOneName}</h4>
                        <table>
                            <tr>${headersHTML}</tr>
                            <tr>${playerOneRows}</tr>
                        </table>
                        <h4>${playerTwoName}</h4>
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