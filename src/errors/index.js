export const isValidMessage = (message, prefix) => message.author.bot || !message.content.startsWith(prefix);

export const gameHighNotAvailable = 'Error: Game Highs are not available for this player';

export const invalidYear = (player) => `Error: ${player} did not play in this year`;

export const playerNotFound = 'Error: This player does not exist. Please try again and check for any spelling errors.';

export const connectionError = 'Error: Could not connect to database';

export const invalidCommand = 'Error: Invalid command';

export const basketballReferencePageNotFound = 'Page Not Found (404 error)';

const missingPlayerName = (firstName, lastName) => !firstName || !lastName;

const missingPlayerNameArguments = 'Error: Please provide a first name and last name';

const isValidYearFormat = (year) => year && year !== 'career' ? isNaN(year) : false;

const invalidYearFormat = 'Error: Please provide a valid year';

export const getInputErrors = ([firstName, lastName, year]) => {
    if (missingPlayerName(firstName, lastName)) return missingPlayerNameArguments;
    if (isValidYearFormat(year)) {
        return invalidYearFormat;
    }
    return null;
};