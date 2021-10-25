const { AuthenticationError } = require('apollo-server-express');
const { User, Village, Trade } = require('../models');

const { signToken } = require('../utils/auth');
const { createVillage } = require('../utils/villageMethods');
const { createTrade, executeTrade } = require('../utils/tradeMethods');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('villages');
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    villages: async () => {
      return Village.find().populate('trades').populate('users');
    },
    trades: async () => {
      return await Trade.find().populate('villages');
    }
  },

  Mutation: {
    addUser: async (_, args) => {
      //every user must given a starter village with stats set
      const user = await User.create(args);
      const newVillage = await Village.create(createVillage(user));
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
    }
  }
};

module.exports = resolvers;
