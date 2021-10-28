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
    level: Int
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
    image: String
    levelUpCost: ResourceObject
    buyPopulation: ResourceObject
    nextLevel: String
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
    fruit: [ID]
    meat: [ID]
    gold: [ID]
    wood: [ID]
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
    level(level: Int!): Level
    upgrades: [Upgrade]
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    createTrade(userId:ID!, resourceSold: String!, amountSold: Int!, resourceBought: String!, amountBought: Int!, tradeAmount: Int!): Trade
    executeTrade(userId:ID!, tradeId: ID!): Trade
    levelUp(userId:ID!): Village
    addPopulation(userId:ID!): Village
    buyUpgrade(userId:ID!, upgradeId:ID!): Village
  }
`;

module.exports = typeDefs;
