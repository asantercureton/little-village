// test variables
const rate = 1;
const population = 10;
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
const lumber = {
    amount: 2,
    workers: 1,
    abundance: 1.0
}
const gold = {
    amount: 6,
    workers: 4,
    abundance: 0.8
}

function getResource(resource) {
    const harvest = (rate * resource.workers) * resource.abundance;
    resource.amount = Math.round((resource.amount + harvest) * 10) / 10;
    return resource.amount;
}

// initial values
console.log('fruit:', fruit.amount);
console.log('meat:', meat.amount);
console.log('lumber:', lumber.amount);
console.log('gold:', gold.amount);
console.log('=============');

const timer = setInterval(function () {
    console.log('fruit:', getResource(fruit));
    console.log('meat:', getResource(meat));
    console.log('lumber:', getResource(lumber));
    console.log('gold:', getResource(gold));
    console.log('=============');
}, 2000);