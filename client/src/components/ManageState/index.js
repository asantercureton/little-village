import React from 'react';
import { Link } from 'react-router-dom';

const ManageState = (props) => {
  const styles = {
    // width: "100%",
    // height: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/otherboard.jpg)`,
    top: 0,
    left: 0,
  }

  const popCost = (buyPop) => {
    let arr = [];
    Object.keys(buyPop).forEach(key => {
      if (buyPop[key] > 0) {
        arr.push(buyPop[key] + ' ' + key.toUpperCase());
      }
    });
    return arr.join(' & ');
  }

  const checkCapacity = () => {
    if (props.user.village.population >= props.level.maxPopulation) {
      return <div><h1>You're at Capacity!</h1>
        <h4>Current Population: {props.user.village.population}</h4>
        <h4>Max Population: {props.level.maxPopulation}</h4>
        <h4>Level Up to Expand!</h4>
      </div>
    } else {
      return <div><h1>Increase Population</h1>
        <h4>Current Population: {props.user.village.population}</h4>
        <h4>Max Population: {props.level.maxPopulation}</h4>
        <h5>Cost: {popCost(props.level.buyPopulation)}</h5>
        {renderPopBtn()}
      </div>
    }
  }

  const checkMaxLevel = () => {
    if (props.level.nextLevel) {
      return <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('levelup')}>LEVEL UP!</button>
    } else {
      return <button type="submit" className="btn manage-btn" id="manage-btn">YOU'RE MAX LEVEL!</button>
    }
  }

  const renderPopBtn = () => {
    if (checkAfford(props.user.village.amountOfResources, props.level.buyPopulation)) {
      return <button onClick={props.handleAddPop} type="submit" className="btn population-btn" id="population1-btn">BUY 1</button>
    } else {
      return <button disabled type="submit" className="btn population-btn" id="population1-btn">CAN'T AFFORD</button>
    }
  }

  const renderLevelBtn = () => {
    if (checkAfford(props.user.village.amountOfResources, props.level.levelUpCost)) {
      return <button onClick={props.handleLevelUp} type="submit" className="btn levelup-btn" id="levelup-btn">BUY</button>
    } else {
      return <button disabled type="submit" className="btn levelup-btn" id="levelup-btn">CAN'T AFFORD</button>
    }
  }

  const checkAfford = (owned, price) => {
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
    
    if (arr.length === afford) {
      return true;
    } else {
      return false;
    }
  };

  const renderItems = () => {
    switch (props.type) {
      case 'population': {
        return checkCapacity()
      }
      case 'workers': {
        return <div><h5 className="card-title"><strong>Assign Workers</strong></h5>
          <p className="card-text">Reallocate the workload</p>
          <p>FARMERS:
            <div className="input-group"><button id="fruit" className="btn btn-decrement btn-outline-secondary btn-minus" onClick={props.subtractWorker} type="button"><strong id="fruit">−</strong></button><input type="text" inputmode="decimal" placeholder={props.workers.fruit}></input><button id="fruit" onClick={props.addWorker} className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="fruit">+</strong></button></div>
          </p>
          <p>HUNTERS:
            <div className="input-group"><button id="meat" className="btn btn-decrement btn-outline-secondary btn-minus" onClick={props.subtractWorker} type="button"><strong id="meat">−</strong></button><input type="text" inputmode="decimal" placeholder={props.workers.meat} /><button id="meat" onClick={props.addWorker} className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="meat">+</strong></button></div>
          </p>
          <p>MINERS:
            <div className="input-group"><button id="gold" onClick={props.subtractWorker} className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong id="gold">−</strong></button><input type="text" inputmode="decimal" placeholder={props.workers.gold} /><button id="gold" onClick={props.addWorker} className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="gold">+</strong></button></div>
          </p>
          <p>LUMBERJACKS:
            <div className="input-group"><button id="wood" onClick={props.subtractWorker} className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong id="wood">−</strong></button><input type="text" inputmode="decimal" placeholder={props.workers.wood} /><button id="wood" onClick={props.addWorker} className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="wood">+</strong></button></div>
          </p>
        </div>
      }
      case 'upgrades': {
        return <div><h5 className="card-title"><strong>Purchase Upgrades</strong></h5>
          <h2 className="card-text">Make a Purchase</h2>
          <tbody>
            <tr className="cell">
              <th scope="row">🍎 FRUIT:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">🥩 MEAT:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">💰 GOLD:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">🌲 WOOD:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
          </tbody></div>
      }
      case 'levelup': {
        return <div>
          <h1>Level Up!</h1>
          <p>Level Up to {props.level.nextLevel}</p>
          <div>
            <h3>Cost: {popCost(props.level.levelUpCost)}</h3>
            {renderLevelBtn()}
          </div></div>
      }
      default: {
        return <div className="manageBox">
          <div className="cardManage" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/backtest.jpg)`
          }}>
            <div className="buttons">
              <h1>Manage Village</h1>
              <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('population')}>INCREASE POPULATION</button>
              <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('workers')}>ASSIGN WORKERS</button>
              <Link to="/tradeform" className="btn manage-btn" id="manage-btn">
                <button type="submit">
                  REQUEST A TRADE
                </button>
              </Link>
              {checkMaxLevel()}
            </div>
          </div>
        </div>
      }
    }
  }



  return (
    <div style={styles}>
      {props.type === null ? [] : <button onClick={props.handleClose}>
        Manage Village
      </button>}
      {renderItems()}
    </div>
  );
};

export default ManageState;