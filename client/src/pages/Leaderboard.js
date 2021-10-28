import React from 'react';
import { useQuery } from '@apollo/client';


import { QUERY_VILLAGES, QUERY_LEVELS } from '../utils/queries';

// TODO: displays totalResources, but not up to date
// maybe run save for all villages at least once a day
// every village that hasn't saved yet appears as 0
// do we want a max number of villages? like top 25
const Leaderboard = () => {
  const { loading, data } = useQuery(QUERY_VILLAGES);
  const villages = data?.villages || [];

  const { loading: levelLoading, data: levelData } = useQuery(QUERY_LEVELS);
  const levels = levelData?.levels || [];
  
  const levelName = (num) => {
    const level = levels.find(level => (level.level === num ));
    return level.name;
  };

  const sortedVillages = [...villages].sort((a, b) => {
    return (b.population - a.population);
  });

  const totalResources = (amountOfResources) => {
    return (parseInt(amountOfResources.fruit) + parseInt(amountOfResources.meat)
      + parseInt(amountOfResources.gold) + parseInt(amountOfResources.wood));
  }

  const renderBoard = () => {
    if (loading || levelLoading) {
      return <tbody><tr><td>Loading...</td></tr></tbody>
    } else {
      return (
        <tbody>
          {sortedVillages.map((village, index) => (
            <tr key={village._id}>
              <td>{index + 1}</td>
              <td>{village.user.username}</td>
              <td>{levelName(village.level)}</td>
              <td>{village.population}</td>
              <td>{totalResources(village.amountOfResources)}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <main>
      <div className="box">
        <div className="card">
          <section className="otherboard overflow-auto" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/pape.jpg)`
          }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Level</th>
                  <th scope="col">Population</th>
                  <th scope="col">Total Resources</th>
                </tr>
              </thead>
              {renderBoard()}
            </table>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
