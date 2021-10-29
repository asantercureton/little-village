// Node Modules
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME, QUERY_LEVEL } from '../utils/queries';
import { ADD_POPULATION, LEVEL_UP, BUY_UPGRADE, ALLOCATE_UNIT, GET_UPDATED_RESOURCES } from '../utils/mutations';
// Components

import ManageState from '../components/ManageState';

const Profile = () => {
  const { id } = useParams();
  const [lastUpdate, setLastUpdate] = useState(null)
  const [syncDataFlag, setSyncDataFlag] = useState(true);
  const [intervalId, setIntervalId] = useState("intervalId");
  const [type, setType] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [population, setPopulation] = useState(2);
  const [resources, setResources] = useState({
    fruit: 0,
    meat: 0,
    gold: 0,
    wood: 0
  }); //set up the resources state, which will be used to get the resources from the server and update them. will be an object with keys for each resource

  const [oResources, setoResources] = useState({
    fruit: 0,
    meat: 0,
    gold: 0,
    wood: 0
  });  //original resources

  const [workers, setWorkers] = useState({ //how many workers for each resource
    fruit: 0,
    meat: 0,
    gold: 0,
    wood: 0
  });

  const [allocateUnit, { data: unitData, loading: unitsLoading, error: unitError }] = useMutation(ALLOCATE_UNIT);
  const [getUpdatedResources, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(GET_UPDATED_RESOURCES)

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id }
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  const [currentLevel, { data: levelData }] = useLazyQuery(QUERY_LEVEL);

  const [addPopulation, { data: popData }] = useMutation(ADD_POPULATION);
  const [levelUp, { data: levelUpData }] = useMutation(LEVEL_UP);
  const [buyUpgrade, { data: buyData }] = useMutation(BUY_UPGRADE);

  useEffect(() => {
    if (user?.village?.level) {
      currentLevel({
        variables: { level: user.village.level },
      });
    }
  }, [currentLevel, user?.village?.level]);

  const level = levelData?.level || {};

  if (error) console.log(error);


  const handleClose = () => {
    setType(null);
  }

  const handleAddPop = async (event) => {
    event.preventDefault();
    try {
      await addPopulation({
        variables: {
          userId: user._id
        },
      });
      setSyncDataFlag(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLevelUp = async (event) => {
    event.preventDefault();
    try {
      await levelUp({
        variables: {
          userId: user._id
        },
      });
      window.location.href = window.location.href;
    } catch (e) {
      console.error(e);
    }
  };

  const handleBuyUpgrade = async (event) => {
    event.preventDefault();
    try {
      await buyUpgrade({
        variables: {
          userId: user._id,
          upgradeId: event.target.value
        },
      });

    } catch (e) {
      console.error(e);
    }
  };

  const canBuyPop = () => {
    let price = level.buyPopulation;
    let owned = {...resources};
    let arr = [];
    let afford = 0;
    Object.keys(price).forEach(key => {
      if (price[key] > 0) {
        arr.push(key);
      }
    });
    for (let i = 0; i < arr.length; i++) {
      let resource = arr[i];
      let amount = owned[resource];
      let cost = price[resource];
      if (amount >= cost) { afford++ };
    }
    
    if (arr.length === afford && population + 1 <= level.maxPopulation) {
      return true;
    } else {
      return false;
    }
  }

  const canBuyLevel = () => {
    let price = level.levelUpCost;
    let owned = {...resources};
    let arr = [];
    let afford = 0;
    Object.keys(price).forEach(key => {
      if (price[key] > 0) {
        arr.push(key);
      }
    });
    for (let i = 0; i < arr.length; i++) {
      let resource = arr[i];
      let amount = owned[resource];
      let cost = price[resource];
      if (amount >= cost) { afford++ };
    }
    
    if (arr.length === afford ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => { //make this not async and create new function to fetch server data
    if (!loading) {
      if (user?.username && syncDataFlag) { //set resources to correct amount 
        syncData();
        console.log("USE EFFECT")
      }
    }
  }, [loading, syncDataFlag]);


  useEffect(() => {
    if (user) {
      clearInterval(intervalId);
      //gameLoopTimer = null;
      setIntervalId(setInterval(gameLoop, 500));
    }
  }, [workers]);

  const gameLoop = () => { //TODO: Rework gameloop to render not based on time since last frame, but time since the information was refreshed
    let now = new Date();
    let deltaTime = Math.abs(now - lastUpdate) / 1000;
    if (user.village) {

      let { abundanceOfResources } = user.village;
      let temp = { ...resources };
      for (let resource in temp) {

        temp[resource] = (oResources[resource] + workers[resource] * abundanceOfResources[resource] * deltaTime);
        //console.log(workers[resource])
      }

      setResources({
        fruit: Math.round(temp.fruit * 10) / 10,
        meat: Math.round(temp.meat * 10) / 10,
        gold: Math.round(temp.gold * 10) / 10,
        wood: Math.round(temp.wood * 10) / 10
      })
      // console.log(oResources)
      //setLastUpdate(new Date());
    }
  }

  const syncData = async () => { //syncs client and server data
    //await refetch()
    if (!loading) {
      setSyncDataFlag(false);
      //var { amountOfResources: resourceCount, unitAllocation, abundanceOfResources } = user.village;
      let update = await getUpdatedResources();
      setLastUpdate(new Date());
      let { amountOfResources: resourceCount, unitAllocation, abundanceOfResources, population } = update.data.getUpdatedResources
      setResources({
        fruit: resourceCount.fruit,
        meat: resourceCount.meat,
        gold: resourceCount.gold,
        wood: resourceCount.wood
      });
      setoResources({
        fruit: resourceCount.fruit,
        meat: resourceCount.meat,
        gold: resourceCount.gold,
        wood: resourceCount.wood
      });
      setWorkers({
        fruit: unitAllocation.fruit,
        meat: unitAllocation.meat,
        gold: unitAllocation.gold,
        wood: unitAllocation.wood
      });
      setPopulation(population)
      return true;
    }
  };

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/me" />;
  }


  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const addWorker = async (e) => {
    let tempWorkers = workers;
    let totalWorkers = 0;
    console.log(workers)
    for (let r in workers) {
      totalWorkers += workers[r]
    }
    if (totalWorkers + 1 <= population) {
      tempWorkers[e.target.id] += 1;
      await allocateUnit({ variables: { userId: user._id, resource: e.target.id, amount: 1 } });
      setSyncDataFlag(true);
    }
  }

  const subtractWorker = async (e) => {
    let tempWorkers = workers;
    if (tempWorkers[e.target.id] - 1 >= 0) {
      tempWorkers[e.target.id] -= 1;
      await allocateUnit({ variables: { userId: user._id, resource: e.target.id, amount: -1 } });
      setSyncDataFlag(true)
    }
  }

  const earningsPerSec = (village, workers, resource) => {
    const rate = 1 + (0.2 * (village.level - 1));
    const labor = workers[resource];
    const abundance = village.abundanceOfResources[resource];
    return Math.round((rate * labor * abundance) * 10) / 10;
  }


  if (loading || usersLoading) {
    return <h4>Loading...</h4>;
  } else {
    return (
      <div className="wrapper" style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/hamlet2.jpg)`
      }}>
        <div className="jumbotron jumbotron-fluid screenWidth">

          <div className="row profileTable">
            <section className="col-11 col-md-11 col-lg-5 cardTable">
              <h2 className="display-4 tableTitle">{user.username}'s {level.name}</h2>

              <table id="myTable" className="table table-hover">
                <tbody className="rows">
                  <tr className="cell">
                    <th scope="row" width="50%">🧍‍♂️ POPULATION:</th>
                    <td>{population}</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row" width="50%">🍎 FRUIT:</th>
                    <td>{resources.fruit}</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row" width="50%">🥩 MEAT:</th>
                    <td>{resources.meat}</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row" width="50%">💰 GOLD:</th>
                    <td>{resources.gold}</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row">🌲 WOOD:</th>
                    <td>{resources.wood}</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row"># of TRADES:</th>
                    <td>{user.village.trades ? user.village.trades.length : 0}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <div className="col-11 col-md-11 col-lg-5 imageCard">
              <img src={`${process.env.PUBLIC_URL}/img/levels/${level.image}`} alt={level.name} />
            </div>
          </div>

          <div className="row manageBox">
            <div className="col-11 col-md-11 col-lg-4 cardManage" height="800px" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/backtest.jpg)`,
        }}>
              <ManageState
                type={type}
                setType={setType}
                canBuyPop={canBuyPop}
                canBuyLevel={canBuyLevel}
                handleClose={handleClose}
                handleAddPop={handleAddPop}
                handleLevelUp={handleLevelUp}
                handleBuyUpgrade={handleBuyUpgrade}
                workers={workers}
                addWorker={addWorker}
                subtractWorker={subtractWorker}
                user={user}
                level={level}
                population={population}
              />
            </div>

            <div className="col-11 col-md-11 col-lg-6 abCard overflow-auto">
              <table id="abInfo" className="table table-hover">
                <thead>
                  <th scope="col">Resource</th>
                  <th scope="col">Abundance</th>
                  <th scope="col">Workers</th>
                  <th scope="col">Earnings</th>
                </thead>
                <tbody className="rows2">
                  <tr className="cell">
                    <th scope="row">🍎 FRUIT:</th>
                    <td>{user.village.abundanceOfResources.fruit}</td>
                    <td>{workers.fruit}</td>
                    <td>{earningsPerSec(user.village, workers, 'fruit')} / sec</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row">🥩 MEAT:</th>
                    <td>{user.village.abundanceOfResources.meat}</td>
                    <td>{workers.meat}</td>
                    <td>{earningsPerSec(user.village, workers, 'meat')} / sec</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row">💰 GOLD:</th>
                    <td>{user.village.abundanceOfResources.gold}</td>
                    <td>{workers.gold}</td>
                    <td>{earningsPerSec(user.village, workers, 'gold')} / sec</td>
                  </tr>
                  <tr className="cell">
                    <th scope="row">🌲 WOOD:</th>
                    <td>{user.village.abundanceOfResources.wood}</td>
                    <td>{workers.wood}</td>
                    <td>{earningsPerSec(user.village, workers, 'wood')} / sec</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    );
  }
};

export default Profile;