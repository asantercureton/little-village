import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';



import { QUERY_TRADES } from '../utils/queries';




const Tradeboard = () => {
  const { loading, data } = useQuery(QUERY_TRADES);
  const trades = data?.trades || [];
  console.log('trade', trades);
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
  const renderResources = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getTrade().data.trades;
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
              <button type="submit" className="btn login-btn" id="login-btn">Create Trade</button>
            </tr>
          </thead>
          <tbody>


            {trades.map((trade) => (
              <tr>
                <th scope="row"></th>

                <td>User {trade.village.user.username}   </td>

                <td>Offered {trade.selling.resource} </td>
                <td> {trade.selling.amount} Stack</td>
                <td>{trade.buying.resource}</td>
                <td> {trade.amount} Chest</td>
                <button type="submit" className="btn login-btn" id="login-btn">Accept Trade</button>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Tradeboard;