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

export const ALLOCATE_UNIT = gql`
  mutation allocateUnit($userId:ID!, $resource: String!, $amount: Int!) {
    allocateUnit(userId:$userId, resource: $resource, amount: $amount) {
      village {
        population
        amountOfResources {
          fruit
          meat
          gold
          wood
        }
        unitAllocation {
          fruit
          meat
          gold
          wood
        }
        abundanceOfResources {
          fruit
          meat
          gold
          wood
        }
      }
    }
  }
`;

export const GET_UPDATED_RESOURCES = gql`
  mutation getUpdatedResources($id:ID) {
    getUpdatedResources(id:$id) {
      population
        amountOfResources {
          fruit
          meat
          gold
          wood
        }
        unitAllocation {
          fruit
          meat
          gold
          wood
        }
        abundanceOfResources {
          fruit
          meat
          gold
          wood
        }
    }
  }
`;

export const EXECUTE_TRADE = gql`
  mutation executeTrade($userId: ID!, $tradeId: ID!) {
    executeTrade(userId: $userId, tradeId: $tradeId) {
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