import styles from './styles';

const getRows = (values) => {
    let rowsHTML = '';
    values.map((value) => {
        rowsHTML += `<th class='tableRow'>${value === 'PLUSMINUS' ? '+/-' : value}</th>`
    });
    return rowsHTML;
};

const metaTags = () => (
    `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />`
);

export default (headers, values, playerName) => {
    const headersHTML = getRows(headers);
    const rowsHTML = getRows(values);
    return `<!DOCTYPE html>
        <html lang="en">
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