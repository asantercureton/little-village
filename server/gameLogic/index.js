const { Village } = require('../models');
const { roundNum, getEfficiency } = require('../utils/helpers');

function getResource(Village, time, resource) {
    if (Village.unitAllocation[resource] >= 0) {
        //const rate = Village.level.productionRate;
        console.log(Village);
        // const workers = Village.unitAllocation[resource];
        const rate = 1;
        const workers = 2;
        const efficiency = getEfficiency(Village.upgrades[resource]);
        const abundance = Village.abundanceOfResources[resource];

        const harvest = (rate * efficiency) * workers * abundance;
        const timePassed = time;
        const production = roundNum(harvest * timePassed);

        Village.amountOfResources[resource] += production;
    }
    return Village.amountOfResources[resource];
}

function updateResources(Village, time) {
    console.log('fruit: ', getResource(Village, time, 'fruit'));
    console.log('meat: ', getResource(Village, time, 'meat'));
    console.log('gold: ', getResource(Village, time, 'gold'));
    console.log('wood: ', getResource(Village, time, 'wood'));
}

module.exports = { getResource, updateResources }