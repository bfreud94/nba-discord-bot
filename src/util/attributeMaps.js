export const getDataAttribute = (statName, command) => {
    const attributeMap = getAttributeMap(command)
    return attributeMap[statName]
}

const getAttributeMap = (command) => {
    switch (command) {
        case 'totals': return totalDataAttributeMap
        case 'pergame': return perGameDataAttributeMap
        case 'per36min': return per36MinDataAttributeMap
        case 'per100poss': return per100PossDataAttributeMap
        case 'advanced': return advancedDataAttributeMap
        case 'adjustedshooting': return adjustedShootingDataAttributeMap
        case 'playbyplay': return playByPlayDataAttributeMap
        case 'shooting': return shootingDataAttributeMap
        case 'gamehigh': return gameHighAttributeMap
    }
}

const totalDataAttributeMap = {
    G: 'g',
    GS: 'gs',
    MP: 'mp',
    FG: 'fg',
    FGA: 'fga',
    'FG%': 'fg_pct',
    '3P': 'fg3',
    '3PA': 'fg3a',
    '3P%': 'fg3_pct',
    '2P': 'fg2',
    '2PA': 'fg2a',
    '2P%': 'fg2_pct',
    'eFG%': 'efg_pct',
    FT: 'ft',
    FTA: 'fta',
    'FT%': 'ft_pct',
    ORB: 'orb',
    DRB: 'drb',
    TRB: 'trb',
    AST: 'ast',
    STL: 'stl',
    BLK: 'blk',
    TOV: 'tov',
    PF: 'pf',
    PTS: 'pts',
    'Trp-Dbl': 'trp_dbl'
}

const perGameDataAttributeMap = {
    G: 'g',
    GS: 'gs',
    MP: 'mp_per_g',
    FG: 'fg_per_g',
    FGA: 'fga_per_g',
    'FG%': 'fg_pct',
    '3P': 'fg3_per_g',
    '3PA': 'fg3a_per_g',
    '3P%': 'fg3_pct',
    '2P': 'fg2_per_g',
    '2PA': 'fg2a_per_g',
    '2P%': 'fg2_pct',
    'eFG%': 'efg_pct',
    FT: 'ft_per_g',
    FTA: 'fta_per_g',
    'FT%': 'ft_pct',
    ORB: 'orb_per_g',
    DRB: 'drb_per_g',
    TRB: 'trb_per_g',
    AST: 'ast_per_g',
    STL: 'stl_per_g',
    BLK: 'blk_per_g',
    TOV: 'tov_per_g',
    PF: 'pf_per_g',
    PTS: 'pts_per_g'
}

const per36MinDataAttributeMap = {
    G: 'g',
    GS: 'gs',
    MP: 'mp',
    FG: 'fg_per_mp',
    FGA: 'fga_per_mp',
    'FG%': 'fg_pct',
    '3P': 'fg3_per_mp',
    '3PA': 'fg3a_per_mp',
    '3P%': 'fg3_pct',
    '2P': 'fg2_per_mp',
    '2PA': 'fg2a_per_mp',
    '2P%': 'fg2_pct',
    'eFG%': 'efg_pct',
    FT: 'ft_per_mp',
    FTA: 'fta_per_mp',
    'FT%': 'ft_pct',
    ORB: 'orb_per_mp',
    DRB: 'drb_per_mp',
    TRB: 'trb_per_mp',
    AST: 'ast_per_mp',
    STL: 'stl_per_mp',
    BLK: 'blk_per_mp',
    TOV: 'tov_per_mp',
    PF: 'pf_per_mp',
    PTS: 'pts_per_mp'
}

const per100PossDataAttributeMap = {
    G: 'g',
    GS: 'gs',
    MP: 'mp',
    FG: 'fg_per_poss',
    FGA: 'fga_per_poss',
    'FG%': 'fg_pct',
    '3P': 'fg3_per_poss',
    '3PA': 'fg3a_per_poss',
    '3P%': 'fg3_pct',
    '2P': 'fg2_per_poss',
    '2PA': 'fg2a_per_poss',
    '2P%': 'fg2_pct',
    'eFG%': 'efg_pct',
    FT: 'ft_per_poss',
    FTA: 'fta_per_poss',
    'FT%': 'ft_pct',
    ORB: 'orb_per_poss',
    DRB: 'drb_per_poss',
    TRB: 'trb_per_poss',
    AST: 'ast_per_poss',
    STL: 'stl_per_poss',
    BLK: 'blk_per_poss',
    TOV: 'tov_per_poss',
    PF: 'pf_per_poss',
    PTS: 'pts_per_poss',
    ORtg: 'off_rtg',
    DRtg: 'def_rtg'
}

const advancedDataAttributeMap = {
    G: 'g',
    MP: 'mp',
    PER: 'per',
    'TS%': 'ts_pct',
    '3PAr': 'fg3a_per_fga_pct',
    FTr: 'fta_per_fga_pct',
    'ORB%': 'orb_pct',
    'DRB%': 'drb_pct',
    'TRB%': 'trb_pct',
    'AST%': 'ast_pct',
    'STL%': 'stl_pct',
    'BLK%': 'blk_pct',
    'TOV%': 'tov_pct',
    'USG%': 'usg_pct',
    OWS: 'ows',
    DWS: 'dws',
    WS: 'ws',
    'WS/48': 'ws_per_48',
    OBPM: 'obpm',
    DBPM: 'dbpm',
    BPM: 'bpm',
    VORP: 'vorp'
}

const adjustedShootingDataAttributeMap = {
    G: 'g',
    MP: 'mp',
    FG2: 'fg_pct',
    '2P3': 'fg2_pct',
    '3P4': 'fg3_pct',
    eFG5: 'efg_pct',
    FT6: 'ft_pct',
    TS7: 'ts_pct',
    FTr8: 'fta_per_fga_pct',
    '3PAr9': 'fta_per_fga_pct',
    FG10: 'lg_fg_pct',
    '2P11': 'lg_fg2_pct',
    '3P12': 'lg_fg3_pct',
    eFG13: 'lg_efg_pct',
    FT14: 'lg_ft_pct',
    TS15: 'lg_ts_pct',
    FTr16: 'lg_fta_per_fga_pct',
    '3PAr17': 'lg_fta_per_fga_pct',
    'FG+': 'adj_fg_pct',
    '2P+': 'adj_fg2_pct',
    '3P+': 'adj_fg3_pct',
    'eFG+': 'adj_efg_pct',
    'FT+': 'adj_ft_pct',
    'TS+': 'adj_ts_pct',
    'FTr+': 'adj_fta_per_fga_pct',
    '3PAr+': 'adj_fg3a_per_fga_pct',
    'FG Add': 'fg_pts_added',
    'TS Add': 'ts_pts_added'
}

const playByPlayDataAttributeMap = {
    G: 'g',
    MP: 'mp',
    'PG%': 'pct_1',
    'SG%': 'pct_2',
    'SF%': 'pct_3',
    'PF%': 'pct_4',
    'C%': 'pct_5',
    OnCourt: 'plus_minus_on',
    'On-Off': 'plus_minus_net',
    BadPass: 'tov_bad_pass',
    LostBall: 'tov_lost_ball',
    Shoot11: 'fouls_shooting',
    'Off.12': 'fouls_offensive',
    Shoot13: 'drawn_shooting',
    'Off.14': 'drawn_offensive',
    PGA: 'astd_pts',
    And1: 'and1s',
    Blkd: 'own_shots_blk'
}

const shootingDataAttributeMap = {
    'G0': 'g',
    'MP1': 'mp',
    'FG%2': 'fg_pct',
    'Dist.3': 'avg_dist',
    '2P4': 'pct_fga_fg2a',
    '0-35': 'pct_fga_00_03',
    '3-106': 'pct_fga_03_10',
    '10-167': 'pct_fga_10_16',
    '16-3P8': 'pct_fga_16_xx',
    '3P9': 'pct_fga_fg3a',
    '2P10': 'fg_pct_fg2a',
    '0-311': 'fg_pct_00_03',
    '3-1012': 'fg_pct_03_10',
    '10-1613': 'fg_pct_10_16',
    '16-3P14': 'fg_pct_16_xx',
    '3P15': 'fg_pct_fg3a',
    '2P16': 'pct_ast_fg2',
    '3P17': 'pct_ast_fg3',
    '%FGA18': 'pct_fga_dunk',
    '#19': 'fg_dunk',
    '%3PA20': 'pct_fg3a_corner3',
    '3P%21': 'fg_pct_corner3',
    'Att.22': 'fg3a_heave',
    '#23': 'fg3_heave',
};

export const shootingModifiedStatNames = [
    'G',
    'MP',
    'FG%',
    'Dist.',
    'FGA% 2P',
    'FGA% 0-3',
    'FGA% 3-10',
    'FGA% 10-16',
    'FGA% 16-3P',
    'FGA% 3P',
    'FG% 2P',
    'FG% 0-3',
    'FG% 3-10',
    'FG% 10-16',
    'FG% 16-3P',
    'FG% 3P',
    '% Ast\'d 2P',
    '% Ast\'d 3P',
    '%FGA Dunk',
    'Dunks Made',
    '%3PA Corner 3',
    '3P% Corner 3',
    'Att. Heave',
    'Heaves Made'
];

const gameHighAttributeMap = {
    'MP': 'time_on_court',
    'FG': 'fg',
    'FGA': 'fga',
    '3P': 'fg3',
    '3PA': 'fg3a',
    '2P': 'fg2',
    '2PA': 'fg2a',
    'FT': 'ft',
    'FTA': 'fta',
    'ORB': 'orb',
    'DRB': 'drb',
    'TRB': 'trb',
    'AST': 'ast',
    'STL': 'stl',
    'BLK': 'blk',
    'TOV': 'tov',
    'PF': 'pf',
    'PTS': 'pts',
    'GmSc': 'game_score',
};