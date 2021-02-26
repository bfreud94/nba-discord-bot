import { getRowName } from '../util';
import styles from './styles';

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

export default (headers, values, playerName, statType) => {
    const headersHTML = getRows(headers, statType);
    const rowsHTML = getRows(values, statType);
    return `<!DOCTYPE html>
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
                    <tr>
                        ${headersHTML}
                    </tr>
                    <tr>
                        ${rowsHTML}
                    </tr>
                </table>
            </div>
        </body>
    </html>`
};