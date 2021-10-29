import React from 'react';
import { Link } from 'react-router-dom';

const ManageState = (props) => {
  const styles = {
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
    if (props.population >= props.level.maxPopulation) {
      return <div><h1>You're at Capacity!</h1>
        <h4>Current Population: {props.population}</h4>
        <h4>Max Population: {props.level.maxPopulation}</h4>
        <h4>Level Up to Expand!</h4>
      </div>
    } else {
      return <div><h1>Increase Population</h1>
        <h4>Current Population: {props.population}</h4>
        <h4>Max Population: {props.level.maxPopulation}</h4>
        <h5>Cost: {popCost(props.level.buyPopulation)}</h5>
        {renderPopBtn()}
      </div>
    }
  }

  const checkMaxLevel = () => {
    if (props.level.level < 6) {
      return <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('levelup')}>LEVEL UP!</button>
    } else {
      return <button type="submit" className="btn manage-btn" id="manage-btn">YOU'RE MAX LEVEL!</button>
    }
  }

  const renderPopBtn = () => {
    if (props.canBuyPop()) {
      return <button onClick={props.handleAddPop} type="submit" className="btn manage-btn" id="population1-btn">BUY VILLAGER</button>
    } else {
      return <button disabled type="submit" className="btn manage-btn" id="population1-btn">CAN'T AFFORD</button>
    }
  }

  const renderLevelBtn = () => {
    if (props.canBuyLevel()) {
      return <button onClick={props.handleLevelUp} type="submit" className="btn levelup-btn" id="levelup-btn">BUY</button>
    } else {
      return <button disabled type="submit" className="btn manage-btn" id="levelup-btn">CAN'T AFFORD</button>
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
        return <div><h3 className="card-title"><strong>Assign Workers</strong></h3>
          <h4>FARMERS:
            <div className="input-group">
              <button id="fruit" className="btn manage-btn btn-decrement btn-outline-secondary btn-minus" onClick={props.subtractWorker} type="button"><strong id="fruit">−</strong></button>
              <input type="text" disabled="true" inputmode="decimal" placeholder={props.workers.fruit}></input>
              <button id="fruit" onClick={props.addWorker} className="btn manage-btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="fruit">+</strong></button>
              </div>
          </h4>
          <h4>HUNTERS:
            <div className="input-group">
              <button id="meat" className="btn manage-btn btn-decrement btn-outline-secondary btn-minus" onClick={props.subtractWorker} type="button"><strong id="meat">−</strong></button>
              <input type="text" disabled="true" inputmode="decimal" placeholder={props.workers.meat} />
              <button id="meat" onClick={props.addWorker} className="btn manage-btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="meat">+</strong></button>
              </div>
          </h4>
          <h4>MINERS:
            <div className="input-group">
              <button id="gold" onClick={props.subtractWorker} className="btn manage-btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong id="gold">−</strong></button>
              <input type="text" inputmode="decimal" disabled="true" placeholder={props.workers.gold} />
              <button id="gold" onClick={props.addWorker} className="btn manage-btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="gold">+</strong></button>
              </div>
          </h4>
          <h4>LUMBERJACKS:
            <div className="input-group">
              <button id="wood" onClick={props.subtractWorker} className="btn manage-btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong id="wood">−</strong></button>
              <input type="text" disabled="true" inputmode="decimal" placeholder={props.workers.wood} />
              <button id="wood" onClick={props.addWorker} className="btn manage-btn btn-increment btn-outline-secondary btn-plus" type="button"><strong id="wood">+</strong></button>
              </div>
          </h4>
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
          <h2>Level Up to {props.level.nextLevel}!</h2>
          <div>
            <h3>Cost:</h3>
            <h3>{popCost(props.level.levelUpCost)}</h3>
            {renderLevelBtn()}
          </div></div>
      }
      default: {
        return <div>
          <div className="buttons">
            <h2><strong>Manage {props.level.name}</strong></h2>
            <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('population')}>INCREASE POPULATION</button>
            <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('workers')}>ASSIGN WORKERS</button>
            {checkMaxLevel()}
            <Link to="/tradeform">
              <p className="btn request-btn" id="request-btn">REQUEST A TRADE</p>
            </Link>
          </div>
        </div>
      }
    }
  }



  return (
    <div style={styles} width="100%">
      {renderItems()}
      {props.type === null ? [] : <button className="btn manage-btn" onClick={props.handleClose}>
      &#8592; Back to Manager
      </button>}
    </div>
  );
};

export default ManageState;