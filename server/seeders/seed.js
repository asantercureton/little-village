const db = require('../config/connection');
const { User, Village, Trade } = require('../models');
const userSeeds = require('./userSeeds.json');
const villageSeeds = require('./villageSeeds.json');
const tradeSeeds = require('./tradeSeeds.json')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Village.deleteMany({});
    await Village.create(villageSeeds);
    await Village.deleteMany({});
    await Trade.create(tradeSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
