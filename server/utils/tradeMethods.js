const { User, Village, Trade } = require('../models');

const createTrade = (village, { resourceSold, amountSold, resourceBought, amountBought, tradeAmount }) => { //this is run with every new user to create their starter village
    return {
        selling: {
            amount: amountSold,
            resource: resourceSold
        },
        buying: {
            amount: amountBought,
            resource: resourceBought
        },
        amount: tradeAmount,
        village
    }
}

const executeTrade = (village1, village2, trade) => {
    let vsr = village1.amountOfResources[trade.selling.resource] //villages sold resource
    let vbr = village2.amountOfResources[trade.buying.resource] //villages bought resource
    if (vsr > trade.selling.amount && vbr > trade.buying.amount) { //does each village have enough for the trade?
        village1.amountOfResources[trade.selling.resource] -= trade.selling.amount;
        village1.amountOfResources[trade.buying.resource] += trade.buying.amount;
        village2.amountOfResources[trade.selling.resource] += trade.selling.amount;
        village2.amountOfResources[trade.buying.resource] -= trade.buying.amount;
        trade.amount -= 1;
        trade.save();
        village1.save();
        village2.save();
        return true
    }
    return false
}


module.exports = {
    createTrade,
    executeTrade
}