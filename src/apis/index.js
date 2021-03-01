export const allPlayers = 'http://data.nba.net/10s/prod/v1/2020/players.json';

export const specificPlayer = (personId) => `http://data.nba.net/10s/prod/v1/2020/players/${personId}_profile.json`;

export const basketballReferencePage = (firstName, lastName) => `https://www.basketball-reference.com/players/${lastName.charAt(0)}/${lastName.substring(0, 5)}${firstName.substring(0, 2)}01.html`;