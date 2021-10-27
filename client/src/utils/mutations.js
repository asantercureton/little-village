import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_TRADE = gql`
  mutation createTrade($userId: ID!, $resourceSold: String!, $amountSold: Int!, $resourceBought: String!, $amountBought: Int!, $tradeAmount: Int!) {
    createTrade(userId: $userId, resourceSold: $resourceSold, amountSold: $amountSold, resourceBought: $resourceBought, amountBought: $amountBought, tradeAmount: $tradeAmount) {
      _id
    }
  }
`;

export const LEVEL_UP = gql`
  mutation levelUp($userId: ID!) {
    levelUp(userId: $userId) {
      level
    }
  }
`;

export const ADD_POPULATION = gql`
  mutation addPopulation($userId: ID!) {
    addPopulation(userId: $userId) {
      population
    }
  }
`;

export const BUY_UPGRADE = gql`
  mutation buyUpgrade($userId: ID!, $upgradeId: ID!) {
    buyUpgrade(userId: $userId, upgradeId: $upgradeId){
      _id
    }
  }
`;