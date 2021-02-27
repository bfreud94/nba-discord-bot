// Dotenv config
require('dotenv').config();

// External Dependencies
import { Client } from 'discord.js';
import { connect } from 'mongoose';

// Internal Dependencies
import { includesCommand } from './util/commands';
import commands from './commands/index';
import { missingPlayerName, parseMessageContent } from './util';

// Global Constants
const client = new Client();
const prefix = process.env.PREFIX;

// Login
client.login(process.env.DISCORD_BOT_TOKEN);

// Listening for messages
client.on('message', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const [CMD_NAME, ...args] = parseMessageContent(message, process.env.PREFIX);

    if (!includesCommand(CMD_NAME)) return;

    const { help, playerStats, usage } = commands;

    switch(CMD_NAME) {
        case 'advancedStats':
        case 'basicStats':
        case 'basicTotalStats':
        case 'basicTotalStats2': {
            if (missingPlayerName(args)) {
                // TODO: fix this!
                message.channel.send(data);
            } else {
                const data = await playerStats(args, CMD_NAME);
                message.channel.send(data);
            }
            break;
        };
        case 'help': {
            const data = await help();
            message.channel.send(data);
            break;
        };
        case 'usage': {
            const data = await usage(CMD_NAME);
            message.channel.send(data);
            break;
        };
        default:
            break;
    };
});

// Listening for reactions
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