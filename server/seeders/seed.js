const db = require('../config/connection');
const { User, Village, Trade, Level } = require('../models');
const userSeeds = require('./userSeeds.json');
const villageSeeds = require('./villageSeeds.json');
const tradeSeeds = require('./tradeSeeds.json')
const levelSeeds = require('./levelSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Village.deleteMany({});
    await Village.create(villageSeeds);
    await Trade.deleteMany({});
    await Trade.create(tradeSeeds);
    await Level.deleteMany({});
    await Level.create(levelSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
