// helper functions
const roundNum = (num) => { return Math.round(num * 10) / 10 };

const getRandom = (max, min) => {
    return roundNum(Math.random() * (max - min) + min);
};

const getLimit = (limit, max, saved) => {
    return ((limit - saved) < max) ? (limit - saved) : max;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

const getAbundance = () => {
    const max = 4.0;
    const min = 0.5;
    const limit = 7.0;

    const r1 = getRandom(max, min);
    const r2 = getRandom(getLimit(limit, max, r1 + (min * 2)), min);
    const r3 = getRandom(getLimit(limit, max, r1 + r2 + min), min);
    const r4 = roundNum(limit - r1 - r2 - r3);

    // checks that numbers are correctly balanced, reruns function if not
    if (roundNum(r1 + r2 + r3 + r4) == limit && r4 < max) {
        const arr = shuffleArray([r1, r2, r3, r4]);
        return { fruit: arr[0], meat: arr[1], gold: arr[2], wood: arr[3] };
    } else {
        return getAbundance();
    }
};

console.log(getAbundance());

module.exports = {
    getAbundance,
    roundNum,
    shuffleArray
};