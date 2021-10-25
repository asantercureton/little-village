//THIS FILE IS RESPONSIBLE FOR RUNNING LOGIC EVERY SECOND BASED ON THE PRODUCTION RATES OF EVERY VILLAGE
const { Village } = require('../models');
const { roundNum } = require('../utils/helpers');

const rate = 1;

// TODO: find # of seconds between now and last updated timestamp
// use timestamp info from model
function getTimePassed(update, lastUpdate) {
    return update - lastUpdate;
}

// TODO: needs to specifically reference This Village
function getResource(resource) {
    if (Village.unitAllocation[resource] > 0) {
        const harvest = (rate * Village.unitAllocation[resource]) * Village.abundanceOfResources[resource];
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