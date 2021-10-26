const { Village } = require('../models');
const { roundNum, getEfficiency } = require('../utils/helpers');

function getResource(village, time, resource) {
    if (village.unitAllocation[resource] >= 0) {
        // const rate = village.level.productionRate;
        // const workers = village.unitAllocation[resource];
        const rate = 1;
        const workers = 2;
        const efficiency = getEfficiency(village.upgrades[resource]);
        const abundance = village.abundanceOfResources[resource];

        const harvest = (rate * efficiency) * workers * abundance;
        const timePassed = time;
        const production = roundNum(harvest * timePassed);

        village.amountOfResources[resource] += production;
    }
    return village.amountOfResources[resource];
}

function updateResources(village, time) {
    console.log('fruit: ', getResource(village, time, 'fruit'));
    console.log('meat: ', getResource(village, time, 'meat'));
    console.log('gold: ', getResource(village, time, 'gold'));
    console.log('wood: ', getResource(village, time, 'wood'));
}

module.exports = { getResource, updateResources }