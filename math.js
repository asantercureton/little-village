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

// function to set abundance values
function getAbundance() {
    const max = 4.0;
    const min = 0.5;
    // midpoint between all mins (2) and all maxs (12)
    const limit = 7.0;

    const resource1 = Math.round((Math.random() * (max - min) + min) * 10) / 10;
    const resource2 = 1;

}



// this function will work together with a mutation to update the stored data
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