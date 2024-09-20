const playerDuplicationMap = {
    'jabari brown': '01',
    'jaylen brown': '02',
    'randy allen': '01',
    'ray allen': '02',
    'marques johnson': '01',
    'magic johnson': '02',
    'john smith': '01',
    'joe smith': '02',
    'josh smith': '03'
};

export const basketballReferencePage = (firstName, lastName) => {
    let index = '01';
    if (playerDuplicationMap[`${firstName} ${lastName}`]) {
        index = playerDuplicationMap[`${firstName} ${lastName}`];
    }
    return `https://www.basketball-reference.com/players/${lastName.charAt(0)}/${lastName.substring(0, 5)}${firstName.substring(0, 2)}${index}.html`;
}