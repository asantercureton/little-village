import React from 'react';
import { useQuery } from '@apollo/client';


import { QUERY_VILLAGES } from '../utils/queries';


const Leaderboard = () => {
  const { loading, data } = useQuery(QUERY_VILLAGES);
  const villages = data?.villages || [];

  console.log('village', villages);

  return (
    <main>
      <div className="box">
        <div className="card">
          <section className="leaderboard overflow-auto">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Village</th>
                  <th scope="col">Population</th>
                  <th scope="col">Resources</th>
                </tr>
              </thead>

              <tbody>
                {villages.map((village) => (
                  <tr>
                    <td>1</td>
                    <td>{village.user.username}</td>
                    <td>{village.user.__typename}</td>
                    <td>{village.population}</td>
                    <td>{village.amountOfResources.fruit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
