import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';



import { QUERY_TRADES } from '../utils/queries'; 

import UserList from '../components/UserList';


const Tradeboard = () => {
  const { loading, data } = useQuery(QUERY_TRADES);
  const trades = data?.trades || [];

  // const renderUserList = () => {
  //   if (loading) {
  //     return <h2>Loading...</h2>
  //   } else {
  //     return <UserList users={users} title="List of Users" />
  //   }
  // }

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }

  const renderVillage = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }

  console.log('trade', trades);

  return (
    <main>
      <div>
        <table className="table table-hover leaderboard">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Resource Offered</th>
              <th scope="col">Amount Offered</th>
              <th scope="col">Resource Requested</th>
              <th scope="col">Amount Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Username</td>
              <td>Village</td>
              <td>Resource Offered</td>
              <td>Amount Offered</td>
              <td>Resource Requested</td>
              <td>Amount Requested</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Username</td>
              <td>Village</td>
              <td>Resource Offered</td>
              <td>Amount Offered</td>
              <td>Resource Requested</td>
              <td>Amount Requested</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Username</td>
              <td>Village</td>
              <td>Resource Offered</td>
              <td>Amount Offered</td>
              <td>Resource Requested</td>
              <td>Amount Requested</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Tradeboard;