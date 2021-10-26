const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    village: Village
  }

  type Village {
    _id: ID
    population: Int
    abundanceOfResources: ResourceObject
    amountOfResources: ResourceObject
    unitAllocation: ResourceObject
    user: User
    trades: [Trade]
    level: Level
    upgrades: UpgradeObject
  }

  type Trade {
    _id: ID
    selling: tradeObject
    buying: tradeObject
    amount: Int
    village: Village
  }

  type Level {
    _id: ID
    level: Int
    name: String
    maxPopulation: Int
    productionRate: Float
    image: String
    levelUpCost: ResourceObject
  }

  type Upgrade {
    _id: ID
    name: String
    resource: String
    summary: String
    cost: ResourceObject
  }

  type tradeObject { #an object containing the amount and resource. used for buying / selling in trades
    amount: Int
    resource: String
  }

  type ResourceObject { #an object containg the 4 resources as floats
    fruit: Float
    meat: Float
    gold: Float
    wood: Float
  }

  type UpgradeObject {
    fruit: [Upgrade]
    meat: [Upgrade]
    gold: [Upgrade]
    wood: [Upgrade]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    villages: [Village]
    trades: [Trade]
    levels: [Level]
    upgrades: [Upgrade]
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    createTrade(userId:ID!, resourceSold: String!, amountSold: Int!, resourceBought: String!, amountBought: Int!, tradeAmount: Int!): Trade
    executeTrade(userId:ID!, tradeId: ID!): Trade
  }
`;

module.exports = typeDefs;
