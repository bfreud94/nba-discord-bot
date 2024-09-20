export default (CMD_NAME) => (
    `body {
        background: rgb(22, 22, 22);
        color: #fff;
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        font-size: ${CMD_NAME === 'shooting' ? '18px' : '28px'};
        width: 725px;
    }
    .app {
        align-items: center;
        background: rgb(31, 31, 31);
        border-top: 3px solid rgb(16, 180, 209);
        flex-direction: row;
        max-width: 100%;
        padding: 20px;
    }
    .tableRow {
        padding: 0px 30px 0px 0px;
        text-align: left;
        width: 100px;
    }
    .table {
        width: 700px;
    }
    `
);