// Dotenv config
require('dotenv').config();

import { Client } from 'discord.js';
import { connect } from 'mongoose';

import commands from './commands/index';
import { parseMessageContent, reformatArgs } from './util';
import { invalidCommand, getInputErrors, isValidMessage } from './errors/index';

const client = new Client();
const prefix = process.env.PREFIX;

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('message', async (message) => {
    if (isValidMessage(message, prefix)) return;

    const [CMD_NAME, ...args] = parseMessageContent(message, process.env.PREFIX);

    const { compare, help, playerStatsImage, usage } = commands;
    switch(CMD_NAME.toLowerCase()) {
        case 'pergame':
        case 'totals':
        case 'per36min':
        case 'per100poss':
        case 'advanced':
        case 'adjustedshooting':
        case 'shooting':
        case 'playbyplay':
        case 'gamehigh': {
            const errors = getInputErrors(args);
            const data = !errors ? await playerStatsImage(args, CMD_NAME.toLowerCase()) : errors;
            message.channel.send(data);
            break;
        };
        case 'help': {
            const data = await help(CMD_NAME.toLowerCase());
            message.channel.send(data);
            break;
        };
        case 'usage': {
            const data = await usage(CMD_NAME.toLowerCase());
            message.channel.send(data);
            break;
        };
        case 'comparetotals':
        case 'comparepergame': {
            const data = await compare(reformatArgs(args), CMD_NAME.split('compare')[1].toLowerCase());
            message.channel.send(data);
            break;
        }
        default:
            message.channel.send(invalidCommand);
            break;
    };
});

connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // eslint-disable-next-line no-console
    console.log('Connected to Database');
});