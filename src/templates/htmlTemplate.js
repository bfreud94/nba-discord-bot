const getHeaders = (headers) => {
    let headersHTML = '';
    headers.map((header) => {
        headersHTML += `<th>${header}</th>`
    });
    return headersHTML;
}

const getRows = (values) => {
    let rowsHTML = '';
    values.map((value) => {
        rowsHTML += `<th>${value}</th>`
    });
    return rowsHTML;
}

export default (headers, values, playerName) => {
    const headersHTML = getHeaders(headers);
    const rowsHTML = getRows(values);
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <style>
                    body {
                        font-family: "Poppins", Arial, Helvetica, sans-serif;
                        background: rgb(22, 22, 22);
                        color: #fff;
                        max-width: 300px;
                    }
                    .app {
                        max-width: 300px;
                        padding: 20px;
                        flex-direction: row;
                        border-top: 3px solid rgb(16, 180, 209);
                        background: rgb(31, 31, 31);
                        align-items: center;
                    }
                    img {
                        width: 50px;
                        height: 50px;
                        margin-right: 20px;
                        border-radius: 50%;
                        border: 1px solid #fff;
                        padding: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="app">
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