import Commands from '../models/commands';

export const commandArgsMap = {
    pergame: 'firstName lastName timeframe',
    totals: 'firstName lastName timeframe',
    per36min: 'firstName lastName timeframe',
    per100poss: 'firstName lastName timeframe',
    advanced: 'firstName lastName timeframe',
    adjustedshooting: 'firstName lastName timeframe',
    shooting: 'firstName lastName timeframe',
    playByplay: 'firstName lastName timeframe',
    gamehigh: 'firstName lastName timeframe',
    collegestats: 'firstName lastName timeframe',
    help: '',
    usage: '',
    compare: 'playerOneFirstName playerOneLastName playerTwoFirstName playerTwoLastName playerOneTimeFrame playerTwoTimeFrame'
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
    gamehigh: '<div class="table_container current is_setup" id="div_highs-reg-season">',
    collegestats: '<div class="table_container" id="div_all_college_stats">'
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
    gamehigh: 'Game Highs',
    collegestats: 'College Stats'
};

export const incrementCommand = async (name) => {
    const query = { name };
    await Commands.findOneAndUpdate(query, {$inc : {'invocations' : 1}}, { useFindAndModify: false });
};

export const exceptions = ['adjustedshooting', 'shooting', 'playByplay', 'gamehigh', 'collegestats'];