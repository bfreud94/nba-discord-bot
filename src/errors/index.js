export const isValidMessage = (message, prefix) => message.author.bot || !message.content.startsWith(prefix);

export const playerNotFound = 'Error: This player does not exist. Please try again and check for any spelling errors.';

export const connectionError = 'Error: Could not connect to database';

export const invalidCommand = 'Error: Invalid command';

export const basketballReferencePageNotFound = 'Page Not Found (404 error)';

const missingPlayerName = (firstName, lastName) => !firstName || !lastName;

const missingPlayerNameArguments = 'Error: Please provide a first name and last name';

const invalidYearFormat = (year) => year && year !== 'career' ? isNaN(year) : false;

const invalidYear = 'Error: Please provide a valid year';

export const getInputErrors = ([firstName,  lastName, year]) => {
    if (missingPlayerName(firstName, lastName)) return missingPlayerNameArguments;
    if (invalidYearFormat(year)) {
        return invalidYear;
    }
    return null;
};