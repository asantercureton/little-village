const { Village } = require('../models');
const { roundNum, getEfficiency, getRate } = require('../utils/helpers');

function getResource(village, time, resource) {
    if (village.unitAllocation[resource] >= 0) {
        const rate = getRate(village.level);
        const workers = village.unitAllocation[resource];
        const abundance = village.abundanceOfResources[resource];

        const harvest = rate * workers * abundance;
        const production = roundNum(harvest * time);

        village.amountOfResources[resource] = roundNum(village.amountOfResources[resource] + production); //changed so we round at the top level
    }
    return village.amountOfResources[resource];
}

function updateResources(village, time) {
    getResource(village, time, 'fruit');
    getResource(village, time, 'meat');
    getResource(village, time, 'gold');
    getResource(village, time, 'wood');
}

module.exports = { getResource, updateResources }