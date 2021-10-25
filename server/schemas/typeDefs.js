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
  }

  type Trade {
    _id: ID
    selling: tradeObject
    buying: tradeObject
    amount: Int
    village: Village
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
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    createTrade(userId:ID!, resourceSold: String!, amountSold: Int!, resourceBought: String!, amountBought: Int!, tradeAmount: Int!): Trade
    executeTrade(userId:ID!, tradeId: ID!): Trade
  }
`;

module.exports = typeDefs;
