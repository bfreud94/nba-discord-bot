import Commands from '../models/commands';

export const commandArgsMap = {
    pergame: 'firstName lastName timeframe',
    totals: 'firstName lastName timeframe',
    per36min: 'firstName lastName timeframe',
    per100poss: 'firstName lastName timeframe',
    advanced: 'firstName lastName timeframe',
    adjustedshooting: 'firstName lastName timeframe',
    shooting: 'firstName lastName timeframe',
    playbyplay: 'firstName lastName timeframe',
    gamehigh: 'firstName lastName timeframe',
    help: '',
    usage: '',
    comparetotals: 'playerOneFirstName playerOneLastName playerOneTimeFrame playerTwoFirstName playerTwoLastName playerTwoTimeFrame',
    comparepergame: 'playerOneFirstName playerOneLastName playerOneTimeFrame playerTwoFirstName playerTwoLastName playerTwoTimeFrame',
};

export const commandTableHtmlSubstringMap = {
    pergame: '<div id="all_per_game-playoffs_per_game"',
    totals: '<div class="table_container current" id="div_totals">',
    per36min: '<div class="table_container current" id="div_per_minute">',
    per100poss: '<div class="table_container current" id="div_per_poss">',
    advanced: '<div class="table_container current" id="div_advanced">',
    adjustedshooting: '<div class="table_container current" id="div_adj_shooting">',
    shooting: '<div class="table_container current" id="div_shooting">',
    playbyplay: '<div class="table_container current" id="div_pbp">',
    gamehigh: '<div class="table_container current" id="div_highs-reg-season">'
};

export const commandDisplayMap = {
    pergame: 'Per Game',
    totals: 'Totals',
    per36min: 'Per 36 Minutes',
    per100poss: 'Per 100 Possessions',
    advanced: 'Advanced',
    adjustedshooting: 'Adjusted Shooting',
    shooting: 'Shooting',
    playbyplay: 'Play-by-play',
    gamehigh: 'Game Highs'
};

export const commandTypedToRowElementMap = {
    totals: 'totals',
    pergame: 'per_game',
    per36min: 'per_minute',
    per100poss: 'per_poss',
    advanced: 'advanced',
    adjustedshooting: 'adj_shooting',
    playbyplay: 'pbp',
    shooting: 'shooting',
    gamehigh: ''
}

export const incrementCommand = async (name) => {
    const query = { name };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};

export const multipleHeaders = ['adjustedshooting', 'shooting', 'playbyplay'];