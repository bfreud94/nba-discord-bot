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
    perGame: '<table class=\"row_summable sortable stats_table\" id=\"per_game\"',
    totals: '<table class=\"row_summable sortable stats_table\" id=\"totals\"',
    per36min: '<table class=\"row_summable sortable stats_table\" id=\"per_minute\"',
    per100poss: '<table class=\"row_summable sortable stats_table\" id=\"per_poss\"',
    advanced: '<table class=\"row_summable sortable stats_table\" id=\"advanced\"',
    adjustedshooting: '<table class=\"row_summable sortable stats_table\" id=\"adj_shooting\"',
    shooting: '<table class=\"row_summable sortable stats_table\" id=\"shooting\"',
    playbyplay: '<table class=\"row_summable sortable stats_table\" id=\"pbp\"',
    gamehigh: '<table class=\"sortable stats_table\" id=\"game_highs\"',
    collegestats: '<table class=\"sortable stats_table\" id=\"all_college_stats\"'
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