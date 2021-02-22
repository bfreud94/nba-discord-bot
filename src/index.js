// Dotenv config
require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const prefix = process.env.PREFIX;

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
});

client.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Spread operator here destructures the first element with a variable name
    // Every element after that is stored inside the args variable, which is an array
    // Unpacks all elements into args variable
    // Regex in split argument gets rid of extraneous whitespace between arguments
    const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);
    if (message.content === '!test') {
        // Replies to user (tags them)
        message.reply('received response!');

        // Sends message to channel
        // If line 14 was not there, it would cause an infinite loop because the message triggers this callback function
        message.channel.send('Hello sending message');
    }
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