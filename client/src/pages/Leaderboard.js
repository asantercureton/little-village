import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';


import { QUERY_VILLAGES } from '../utils/queries';

import UserList from '../components/UserList';


const Leaderboard = () => {
  const { loading, data } = useQuery(QUERY_VILLAGES);
  const villages = data?.villages || [];

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

  console.log('village', villages);

  return (
    <main>
      <div>
        <table className="table table-hover leaderboard">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Village</th>
              <th scope="col">Status</th>
              <th scope="col">Population</th>
              <th scope="col">Resources</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Username</td>
              <td>Village</td>
              <td>Status</td>
              <td>Population</td>
              <td>Resources</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Username</td>
              <td>Village</td>
              <td>Status</td>
              <td>Population</td>
              <td>Resources</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Username</td>
              <td>Village</td>
              <td>Status</td>
              <td>Population</td>
              <td>Resources</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Leaderboard;
