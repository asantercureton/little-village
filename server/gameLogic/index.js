//THIS FILE IS RESPONSIBLE FOR RUNNING LOGIC EVERY SECOND BASED ON THE PRODUCTION RATES OF EVERY VILLAGE
const { Village } = require('../models');

// test variables - hard-coded temporarily
const rate = 1;
const fruit = {
    amount: 5,
    workers: 3,
    abundance: 1.5
}
const meat = {
    amount: 3,
    workers: 2,
    abundance: 1.0
}
const wood = {
    amount: 2,
    workers: 1,
    abundance: 1.0
}
const gold = {
    amount: 6,
    workers: 4,
    abundance: 0.8
}

// this function will work together with a mutation to update the stored data
function getResource(resource) {
    const harvest = (rate * resource.workers) * resource.abundance;
    resource.amount = roundNum(resource.amount + harvest);
    return resource.amount;
}

// adapted version to use Village model
// apply to user's specific village when calling function
function getResources(resource) {
    if (Village.unitAllocation[resource] > 0) {
        const harvest = (rate * Village.unitAllocation[resource]) * Village.abundanceOfResources[resource];
        Village.amountOfResources[resource] = roundNum(Village.amountOfResources[resource] + harvest);
    }
    // mutate the database info with updated data
    return Village.amountOfResources[resource];
}


// initial values
console.log('fruit:', fruit.amount);
console.log('meat:', meat.amount);
console.log('wood:', wood.amount);
console.log('gold:', gold.amount);
console.log('=============');

const addResources = setInterval(function () {
    console.log('fruit:', getResource(fruit));
    console.log('meat:', getResource(meat));
    console.log('wood:', getResource(wood));
    console.log('gold:', getResource(gold));
    console.log('=============');
}, 1000);