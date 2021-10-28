const { AuthenticationError } = require('apollo-server-express');
const { User, Village, Trade, Level, Upgrade } = require('../models');

const { signToken } = require('../utils/auth');
const { createVillage, levelUp, addPopulation, buyUpgrade } = require('../utils/villageMethods');
const { createTrade, executeTrade } = require('../utils/tradeMethods');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('village');
    },
    user: async (_, args) => {
      let user = await User.findOne({ _id: args.id });
      let village = await Village.findById(user.village);
      await village.save()
      return user.populate('village');
    },
    me: async (_, args, context) => {
      if (context.user) {
        let user = await User.findOne({ _id: context.user._id });
        let village = await Village.findById(user.village);
        await village.save()
        return User.findOne({ _id: context.user._id }).populate('village');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    villages: async () => {
      return Village.find().populate('trades').populate('user').populate('upgrades');
    },
    trades: async () => {
      return await Trade.find().populate('village').populate({
        path: 'village',
        populate: 'user'
      });
    },
    levels: async () => {
      return await Level.find();
    },
    level: async (_, args) => {
      return await Level.findOne({ level: args.level });
    },
    upgrades: async () => {
      return await Upgrade.find();
    }
  },

  Mutation: {
    addUser: async (_, args) => {
      //every user must given a starter village with stats set
      const user = await User.create(args);
      const level = 1;
      const newVillage = await Village.create(createVillage(user, level));
      user.village = newVillage;
      await user.save();
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createTrade: async (_, args, context) => {
      if (context.user) {
        const user = await User.findById(args.userId);
        const newTrade = await Trade.create(createTrade(user.village, args));
        const village = await Village.findById(user.village);
        await Village.updateOne(
          { _id: user.village },
          { $push: { trades: newTrade } }
        );
        await village.save();
        return newTrade
      } else {
        throw new AuthenticationError('Not Logged In!')
      }
    },
    executeTrade: async (_, args) => {
      try {
        const user = await User.findById(args.userId);
        const trade = await Trade.findById(args.tradeId);
        console.log(trade._id)
        if (trade && user) {
          const village1 = await Village.findById(trade.village);
          const village2 = await Village.findById(user.village);
          executeTrade(village1, village2, trade);
          return User;
        } else {
          throw new Error('Trade not found!');
        }
      } catch (e) {
        throw new Error('Trade not found!');
      }
    },
    allocateUnit: async (_, args) => { //TODO: Make all mutations confirm identities using context
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      let totalWorkers = 0;
      let r = args.resource;
      totalWorkers += village.unitAllocation.fruit;
      totalWorkers += village.unitAllocation.meat;
      totalWorkers += village.unitAllocation.gold;
      totalWorkers += village.unitAllocation.wood;

      if ((totalWorkers + args.amount <= village.population) && (village.unitAllocation[r] + args.amount >= 0)) {
        await village.save();
        village.unitAllocation[r] += args.amount;
        await village.save();
        return user.populate('village');
      } else {
        await village.save();
        return user.populate('village');
      }
    },
    allocateUnit: async (_, args) => { //TODO: Make all mutations confirm identities using context
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      let totalWorkers = 0;
      let r = args.resource;
      totalWorkers += village.unitAllocation.fruit;
      totalWorkers += village.unitAllocation.meat;
      totalWorkers += village.unitAllocation.gold;
      totalWorkers += village.unitAllocation.wood;

      if ((totalWorkers + args.amount <= village.population) && (village.unitAllocation[r] + args.amount >= 0)) {
        await village.save();
        village.unitAllocation[r] += args.amount;
        await village.save();
        return user.populate('village');
      } else {
        await village.save();
        return user.populate('village');
      }
    },
    levelUp: async (_, args) => {
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      village.save();
      const level = await Level.findOne({ level: village.level });
      const update = levelUp(village, level);
      await Village.updateOne(
        { _id: user.village },
        {
          amountOfResources: update.amountOfResources,
          level: update.level
        }
      );
      village.save();
      return village;
    },
    addPopulation: async (_, args) => {
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      village.save();
      const level = await Level.findOne({ level: village.level });
      const addPop = addPopulation(village, level);
      await Village.updateOne(
        { _id: user.village },
        {
          amountOfResources: addPop.amountOfResources,
          population: addPop.population
        }
      );
      village.save();
      return village;
    },
    buyUpgrade: async (_, args) => {
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      village.save();
      const upgrade = await Upgrade.findById(args.upgradeId);
      const newUpg = buyUpgrade(village, upgrade);
      await village.update(
        {
          amountOfResources: newUpg.amountOfResources,
          $addToSet: {
            'upgrades.fruit': newUpg.upgrades.fruit
          },
          $addToSet: {
            'upgrades.meat': newUpg.upgrades.meat
          },
          $addToSet: {
            'upgrades.gold': newUpg.upgrades.gold
          },
          $addToSet: {
            'upgrades.wood': newUpg.upgrades.wood
          }

        }
      );
      village.save();
      return village;
    },
    getUpdatedResources: async (_, args, context) => {
      if (args.id) {
        const user = await User.findById(args.id);
        const village = await Village.findById(user.village);
        await village.save();
        return village.populate('trades').populate('user').populate('upgrades');
      } else if (context.user) {
        let user = await User.findOne({ _id: context.user._id });
        let village = await Village.findById(user.village);
        await village.save()
        return village.populate('trades').populate('user').populate('upgrades');
      } else {
        throw new AuthenticationError('No user specified');
      }
    }
  }
};


module.exports = resolvers;
