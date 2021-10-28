
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

  const gameLoop = () => { //TODO: Rework gameloop to render not based on time since last frame, but time since the information was refreshed
    let loopResources = resources;

    let now = new Date();
    let deltaTime = Math.abs(now - lastUpdate) / 1000;
    let { abundanceOfResources } = user.village;
    for (let resource in loopResources) {
      loopResources[resource] += workers[resource] * abundanceOfResources[resource] * deltaTime;
      console.log(workers[resource])
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
        <h3>Username:</h3>
        <p>{user.username}</p>
        <h3>Email:</h3>
        <p>{user.email}</p>
      </ul>
    );
  }

  const addWorker = async (e) => {
    let tempWorkers = workers;
    let totalWorkers = 0;
    console.log(workers)
    for (let r in workers) {
      totalWorkers += workers[r]
    }
    console.log(totalWorkers, user.village.population)
    if (totalWorkers + 1 <= user.village.population) {
      tempWorkers[e.target.id] += 1;
      await setWorkers({
        fruit: tempWorkers.fruit,
        meat: tempWorkers.meat,
        gold: tempWorkers.gold,
        wood: tempWorkers.wood,
      });
    }
  }

  const subtractWorker = async (e) => {
    let tempWorkers = workers;
    if (tempWorkers[e.target.id] - 1 >= 0) {
      tempWorkers[e.target.id] -= 1;
      await setWorkers({
        fruit: tempWorkers.fruit,
        meat: tempWorkers.meat,
        gold: tempWorkers.gold,
        wood: tempWorkers.wood,
      });
    }
  }

  return (
    <div className="wrapper">
      <div className="jumbotron jumbotron-fluid screenWidth">

        <div className="profileTable">
          <section>
            <h1 className="display-4 tableTitle">{user.username}'s Village.</h1>

            <table className="table table-hover">

              <tbody className="rows">
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
          </section>
          <div className="imageCard">
            <h1>Image</h1>
          </div>
        </div>

        <div className="manageBox">
          <div className="cardManage">
            <h1>Manage Village</h1>
            <div className="buttons">
              <button type="submit" className="btn manage-btn" id="manage-btn">INCREASE POPULATION</button>
              <button type="submit" className="btn manage-btn" id="manage-btn">ASSIGN WORKERS</button>
              <button type="submit" className="btn manage-btn" id="manage-btn">PURCHASE UPGRADES</button>
              <button type="submit" className="btn manage-btn" id="manage-btn">LEVEL UP!</button>
              <button type="submit" className="btn manage-btn" id="manage-btn">REQUEST A TRADE!</button>
            </div>
          </div>
          <div className="abCard">
            <h4>Abundance Of Resources</h4>
            <table className="table table-hover">

              <tbody className="rows2">
                <tr className="cell">
                  <th scope="row">FRUITS:</th>
                  <td>{resources.fruit} #/sec</td>
                </tr>
                <tr className="cell">
                  <th scope="row">GOLD:</th>
                  <td>{resources.gold} #/sec</td>
                </tr>
                <tr className="cell">
                  <th scope="row">MEAT:</th>
                  <td>{resources.meat} #/sec</td>
                </tr>
                <tr className="cell">
                  <th scope="row">WOOD:</th>
                  <td>{resources.wood} #/sec</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>



      

    </div>
  );
};

export default Profile;