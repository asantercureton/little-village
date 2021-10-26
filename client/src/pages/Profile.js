
// Node Modules
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
// Components
import UserList from '../components/UserList';



const Profile = () => {
  const { id } = useParams();

  const gameLoop = () => {
    let loopResources = resources;
    let now = new Date();
    let deltaTime = Math.abs(now - lastUpdate) / 1000;
    let { abundanceOfResources } = user.village;
    for (let resource in loopResources) {
      loopResources[resource] += workers[resource] * abundanceOfResources[resource] * deltaTime;
    }

    setResources({
      fruit: Math.round(loopResources.fruit * 10) / 10,
      meat: Math.round(loopResources.meat * 10) / 10,
      gold: Math.round(loopResources.gold * 10) / 10,
      wood: Math.round(loopResources.wood * 10) / 10
    })
    lastUpdate = new Date();
  }

  useEffect(async () => {

    if (!loading) {
      if (!gameLoopInit) { //set resources to correct amount 
        var { amountOfResources: resourceCount, unitAllocation, abundanceOfResources } = user.village;

        await setResources({
          fruit: resourceCount.fruit,
          meat: resourceCount.meat,
          gold: resourceCount.gold,
          wood: resourceCount.wood
        });
        await setWorkers({
          fruit: unitAllocation.fruit,
          meat: unitAllocation.meat,
          gold: unitAllocation.gold,
          wood: unitAllocation.wood
        });
        console.log(unitAllocation.wood)
        console.log(workers)
        setGameLoopInit(true);
        lastUpdate = new Date();
        var gameLoopTimer = setInterval(gameLoop, 250);
      }



    }
  });


  //game variables and states
  var lastUpdate;

  const [resources, setResources] = useState({
    fruit: 0,
    meat: 0,
    gold: 0,
    wood: 0
  }); //set up the resources state, which will be used to get the resources from the server and update them. will be an object with keys for each resource

  const [workers, setWorkers] = useState({ //how many workers for each resource
    fruit: 0,
    meat: 0,
    gold: 0,
    wood: 0
  });

  const [gameLoopInit, setGameLoopInit] = useState(false); //have we set up the game loop? 

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <ul>
        <p><strong>username:</strong> {user.username}</p>
        <p><strong>email:</strong> {user.email}</p>
      </ul>
    );
  }

  return (
    <div className="wrapper">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 tableTitle">My Village.</h1>

          <table className="table table-hover">

            <tbody className="rows">
              <tr className="cell">
                <th scope="row">STATUS:</th>
                <td>TRIBE</td>
              </tr>
              <tr className="cell">
                <th scope="row">POPULATION:</th>
                <td>{user.village.population}</td>
              </tr>
              <tr className="cell">
                <th scope="row">FRUITS:</th>
                <td>{resources.fruit}</td>
              </tr>
              <tr className="cell">
                <th scope="row">GOLD:</th>
                <td>{resources.gold}</td>
              </tr>
              <tr className="cell">
                <th scope="row">MEAT:</th>
                <td>{resources.meat}</td>
              </tr>
              <tr className="cell">
                <th scope="row">WOOD:</th>
                <td>{resources.wood}</td>
              </tr>
              <tr className="cell">
                <th scope="row"># of TRADES:</th>
                <td>3</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button type="submit" className="btn trade-btn" id="trade-btn">REQUEST A TRADE!</button>
          </div>
        </div>

        <div className="sidePanel">
          <div className="card2">
            <div className="card-body2">
              <h5 className="card-title"><strong>Village Name</strong></h5>
              <p className="card-text">{renderCurrentUserInfo()}</p>

            </div>
          </div>
        </div>
      </div>
      <div className="sidePanel">
        <div>
          <div className="card-body3">
            <h5 className="card-title"><strong>Assign Workers</strong></h5>

            <p className="card-text">Reallocate the workload</p>


            <p>FARMERS:
              <div className="input-group"><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
            </p>
            <p>HUNTERS:
              <div className="input-group  "><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
            </p>
            <p>MINERS:
              <div className="input-group  "><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
            </p>
            <p>LUMBERJACKS:
              <div className="input-group  "><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
            </p>

            <div>
              <p>POPULATION: {user.village.population}</p>
              <p>UNASSIGNED: {user.village.population}</p>
            </div>

            <button type="submit" className="btn confirm-btn" id="worker-btn">CONFIRM</button>



          </div>
        </div>
      </div>
      <div className="sidePanel">
        <div>
          <div className="card-body4">
            <h5 className="card-title"><strong>Purchase Upgrades</strong></h5>
            <h2 className="card-text">Make a Purchase</h2>
            <tr className="cell">
              <th scope="row">FRUIT:</th>
              <td>{resources.fruit}/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">GOLD:</th>
              <td>{resources.gold}/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">MEAT:</th>
              <td>{resources.meat}/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">WOOD:</th>
              <td>{resources.wood}/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;