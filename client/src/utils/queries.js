import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      village {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
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

export const QUERY_TRADES = gql`
  query trades {
    trades {
      _id
      selling {
        resource
        amount
      }
      buying {
        resource
        amount
      }
      amount
      village {
        _id
        user {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_VILLAGES = gql`
  query villages {
    villages {
      _id
      population
      user {
        _id
        username
      }
      trades {
        _id
      }
    }
  }
`;