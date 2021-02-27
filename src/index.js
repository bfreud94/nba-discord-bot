// Dotenv config
require('dotenv').config();

import { Client } from 'discord.js';
import { connect } from 'mongoose';

import commands from './commands/index';
import { missingPlayerName, parseMessageContent } from './util';
import { invalidCommand, missingPlayerNameArguments } from './errors/index';

const client = new Client();
const prefix = process.env.PREFIX;

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('message', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const [CMD_NAME, ...args] = parseMessageContent(message, process.env.PREFIX);

    const { help, playerStats, usage } = commands;

    switch(CMD_NAME) {
        case 'advancedStats':
        case 'basicStats':
        case 'basicTotalStats':
        case 'basicTotalStats2': {
            if (missingPlayerName(args)) {
                const data = missingPlayerNameArguments;
                message.channel.send(data);
            } else {
                const data = await playerStats(args, CMD_NAME);
                message.channel.send(data);
            }
            break;
        };
        case 'help': {
            const data = await help(CMD_NAME);
            message.channel.send(data);
            break;
        };
        case 'usage': {
            const data = await usage(CMD_NAME);
            message.channel.send(data);
            break;
        };
        default:
            message.channel.send(invalidCommand);
            break;
    };
});

client.on('messageReactionAdd', (reaction) => {
    const { name } = reaction.emoji;
    switch (name) {
        case '🍎':
            console.log('do something');
            break;
        case '🍌':
            console.log('do something');
            break;
        case '🍇':
            console.log('do something');
            break;
        case '🍑':
            console.log('do something');
            break;
    }
});

// Connecting to the Database
connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, connection) => {
    // eslint-disable-next-line no-console
    console.log('Connected to Database');
});