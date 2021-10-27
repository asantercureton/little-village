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
      return User.findOne({ _id: args.id }).populate('village');
    },
    me: async (_, args, context) => {
      if (context.user) {
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
    createTrade: async (_, args) => {
      const user = await User.findById(args.userId);
      const newTrade = await Trade.create(createTrade(user.village, args));
      const village = await Village.findById(user.village);
      await Village.updateOne(
        { _id: user.village }, 
        { $push: { trades: newTrade } }
      );
      village.save();
      return newTrade
    },
    executeTrade: async (_, args) => {
      const user = await User.findById(args.userId);
      const trade = await Trade.findById(args.tradeId);
      const village1 = await Village.findById(trade.village);
      const village2 = await Village.findById(user.village);
      executeTrade(village1, village2, trade);
      return trade
    },
    levelUp: async (_, args) => {
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      village.save();
      const level = await Level.find({ level: village.level });
      const update = levelUp(village, level[0]);
      await Village.updateOne(
        { _id: user.village }, 
        { amountOfResources: update.amountOfResources,
          level: update.level }
      );
      village.save();
      return village;
    },
    addPopulation: async (_, args) => {
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      village.save();
      const level = await Level.find({ level: village.level });
      const addPop = addPopulation(village, level[0]);
      await Village.updateOne(
        { _id: user.village }, 
        { amountOfResources: update.amountOfResources,
          population: addPop.population }
      );
      village.save();
      return village;
    },
    buyUpgrade: async (_, args) => {
      const user = await User.findById(args.userId);
      const village = await Village.findById(user.village);
      village.save();
      const upgrade = await Upgrade.findById(args.upgradeId);
      console.log(buyUpgrade(village, upgrade));
    }
  }
};


module.exports = resolvers;
