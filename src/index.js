// Dotenv config
require('dotenv').config();

// External Dependencies
import { Client } from 'discord.js';
import playerStats from './playersData/playerStats';
import { missingPlayerName, parseMessageContent } from './util';

// Internal Dependencies
import commands from './commands';

// Global Constants
const client = new Client();
const prefix = process.env.PREFIX;

// Login
client.login(process.env.DISCORD_BOT_TOKEN);

// Listening for messages
client.on('message', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const [CMD_NAME, ...args] = parseMessageContent(message, process.env.PREFIX);

    if (!Object.keys(commands).includes(CMD_NAME)) return;

    switch(CMD_NAME) {
        case 'advancedStats':
        case 'basicStats':
        case 'basicTotalStats':
        case 'basicTotalStats2':
            if (missingPlayerName(args)) {
                message.channel.send(data);
            } else {
                const data = await playerStats(args, CMD_NAME);
                message.channel.send(data);
            }
            break;
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