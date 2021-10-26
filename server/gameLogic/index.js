//THIS FILE IS RESPONSIBLE FOR RUNNING LOGIC EVERY SECOND BASED ON THE PRODUCTION RATES OF EVERY VILLAGE
const { Village } = require('../models');
const { roundNum, getEfficiency } = require('../utils/helpers');

// TODO: needs to specifically reference This Village
function getResource(resource) {
    if (Village.unitAllocation[resource] > 0) {
        const rate = Village.level.productionRate;
        const efficiency = getEfficiency(Village.upgrades[resource]);
        const workers = Village.unitAllocation[resource];
        const abundance = Village.abundanceOfResources[resource];

        const harvest = (rate * efficiency) * workers * abundance;
        const timePassed = getTimePassed(5, 1); // temp variables
        const production = roundNum(harvest * timePassed);

        Village.amountOfResources[resource] += production;
    }
    return Village.amountOfResources[resource];
}


// TODO: needs to specifically reference This Village
// used to get each resources up to date info, should mutate db
function updateResources() {
    console.log('fruit: ', getResource('fruit'));
    console.log('meat: ', getResource('meat'));
    console.log('gold: ', getResource('gold'));
    console.log('wood: ', getResource('wood'));
}

module.exports = { getResource, updateResources }