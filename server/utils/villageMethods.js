const { getAbundance } = require('./helpers');

const createVillage = (user) => { //this is run with every new user to create their starter village
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
        user
    }
}


module.exports = {
    createVillage
}