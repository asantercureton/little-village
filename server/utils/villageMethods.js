const { roundNum, getRandom, getLimit, shuffleArray } = require('./helpers');

const getAbundance = () => {
    const max = 4.0;
    const min = 0.5;
    const limit = 7.0;

    const r1 = getRandom(max, min);
    const r2 = getRandom(getLimit(limit, max, r1 + (min * 2)), min);
    const r3 = getRandom(getLimit(limit, max, r1 + r2 + min), min);
    const r4 = roundNum(limit - r1 - r2 - r3);

    // checks that numbers are correctly balanced, reruns function if not
    if (roundNum(r1 + r2 + r3 + r4) == limit && r4 < max) {
        const arr = shuffleArray([r1, r2, r3, r4]);
        return { fruit: arr[0], meat: arr[1], gold: arr[2], wood: arr[3] };
    } else {
        return getAbundance();
    }
};

const createVillage = (user, level) => { //this is run with every new user to create their starter village
    return {
        population: 2,
        abundanceOfResources: getAbundance(),
        amountOfResources: {
            fruit: 0,
            meat: 0,
            gold: 0,
            wood: 0
        },
        unitAllocation: {
            fruit: 0,
            meat: 0,
            gold: 0,
            wood: 0
        },
        user,
        level
    }
};

const levelUp = (village, level) => {
    let wood = village.amountOfResources.wood;
    let gold = village.amountOfResources.gold;
    let costWood = level.levelUpCost.wood;
    let costGold = level.levelUpCost.gold;
    if((wood >= costWood) && (gold >= costGold)) {
        village.amountOfResources.wood = roundNum(wood - costWood);
        village.amountOfResources.gold = roundNum(gold - costGold);
        village.level += 1;
    }
    return village;
};


module.exports = {
    createVillage,
    getAbundance,
    levelUp
}