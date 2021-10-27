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

function getTimePassed(update, lastUpdate) {
    return update - lastUpdate;
}

const getEfficiency = (upgrades) => {
    return 1 + (0.5 * upgrades.length);
}

const getRate = (level) => {
    return 1 + (0.2 * (level - 1));
}

module.exports = {
    roundNum,
    getRandom,
    getLimit,
    shuffleArray,
    getTimePassed,
    getEfficiency,
    getRate
};