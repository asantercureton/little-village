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

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
