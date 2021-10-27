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

const getAfford = (arr, owned, price) => {
    let afford = 0;
    for(let i = 0; i < arr.length; i++) {
        let resource = arr[i];
        let amount = owned[resource];
        let cost = price[resource];
        if(amount >= cost) { afford++ };
    }
    return (arr.length === afford) ? true : false;
}

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
    let arr = [];
    Object.keys(level.levelUpCost).forEach(key => {
        if(level.levelUpCost[key] > 0) {
            arr.push(key);
        }
    });
    
    const afford = getAfford(arr, village.amountOfResources, level.levelUpCost);
    if(afford) {
        for(let i = 0; i < arr.length; i++) {
            let resource = arr[i];
            let amount = village.amountOfResources[resource];
            let cost = level.levelUpCost[resource];
            village.amountOfResources[resource] = roundNum(amount - cost);
        };
        village.level += 1;
    }
    return village;
};

const addPopulation = (village, level) => {
    let arr = [];
    Object.keys(level.buyPopulation).forEach(key => {
        if(level.buyPopulation[key] > 0) {
            arr.push(key);
        }
    });
    const afford = getAfford(arr, village.amountOfResources, level.buyPopulation);
    if(afford){
        for(let i = 0; i < arr.length; i++) {
            let resource = arr[i];
            let amount = village.amountOfResources[resource];
            let cost = level.buyPopulation[resource];
            village.amountOfResources[resource] = roundNum(amount - cost);
        };
        village.population += 1;
    }
    return village;
};

const buyUpgrade = (village, upgrade) => {
    let arr = [];
    Object.keys(upgrade.cost).forEach(key => {
        if(upgrade.cost[key] > 0) {
            arr.push(key);
        }
    });
    const afford = getAfford(arr, village.amountOfResources, upgrade.cost);
    if(afford){
        for(let i = 0; i < arr.length; i++) {
            let resource = arr[i];
            let amount = village.amountOfResources[resource];
            let cost = upgrade.cost[resource];
            village.amountOfResources[resource] = roundNum(amount - cost);
        };
        village.upgrades[upgrade.resource].push(upgrade);
    }
    return village;
};

module.exports = {
    createVillage,
    getAbundance,
    getAfford,
    levelUp,
    addPopulation,
    buyUpgrade
}