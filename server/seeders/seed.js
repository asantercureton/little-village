const db = require('../config/connection');
const { User, Village, Trade, Level, Upgrade } = require('../models');
const userSeeds = require('./userSeeds.json');
const villageSeeds = require('./villageSeeds.json');
const tradeSeeds = require('./tradeSeeds.json')
const levelSeeds = require('./levelSeeds.json');
const upgradeSeeds = require('./upgradeSeeds.json');
const { createVillage } = require('../utils/villageMethods');

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
    await Upgrade.deleteMany({});
    await Upgrade.create(upgradeSeeds);

    // test users for each level
    const seedsArr = ['tribe', 'hamlet', 'village', 'town', 'citystate', 'kingdom'];
    for(let i = 0; i < seedsArr.length; i++) {
      let user = await User.findOne({ username: seedsArr[i]});
      let level = i+1;
      user.village = await Village.create(createVillage(user, level));
      await user.save();
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
