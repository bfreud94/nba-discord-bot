// Dotenv config
require('dotenv').config();

// External Dependencies
import { Client } from 'discord.js';
import { missingPlayerNameArguments } from './errors';
import { basicStats } from './players/players';
import { getFullName, parseMessageContent } from './util';

// Global Constants
const client = new Client();
const prefix = process.env.PREFIX;

// Login
client.login(process.env.DISCORD_BOT_TOKEN);

// Listening for messages
client.on('message', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const [CMD_NAME, ...args] = parseMessageContent(message, process.env.PREFIX);

    if (CMD_NAME === 'basicStats') {
        const [firstName, lastName] = args;
        if (!firstName || !lastName) {
            message.channel.send(missingPlayerNameArguments);
            return;
        }
        const playerName = getFullName(firstName, lastName).toLowerCase();
        const playerStats = await basicStats(playerName);
        message.channel.send(playerStats);
    }
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