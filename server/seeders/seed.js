const db = require('../config/connection');
const { User, Village, Trade, Level } = require('../models');
const userSeeds = require('./userSeeds.json');
const villageSeeds = require('./villageSeeds.json');
const tradeSeeds = require('./tradeSeeds.json')
const levelSeeds = require('./levelSeeds.json');
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

    // test users for each level
    const seedsArr = ['tribe', 'hamlet', 'village', 'town', 'citystate', 'kingdom'];
    for(let i = 0; i < seedsArr.length; i++) {
      let user = await User.findOne({ username: seedsArr[i]});
      let level = await Level.findOne({ level: i+1 });
      user.village = await Village.create(createVillage(user, level));
      await user.save();
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
