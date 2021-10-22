const createVillage = (user) => { //this is run with every new user to create their starter village
    return {
        population: 2,
        abundanceOfResources: {
            fruit: 1,
            meat: 1,
            gold: 1,
            wood: 1
        },
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