import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const ManageState = (props) => {
  const styles = {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
    overflowY: "scroll",
    // display: props.showing ? 'block' : 'none'
  }

  const renderItems = () => {
    switch (props.type) {
      case 'population': {
        return <div><h1>Increase Population</h1>
          <h4>Current Population: 22</h4>
          <h4>Max Population: 25</h4>
          <h5>Cost: 5 Fruit</h5>
          <button type="submit" className="btn population-btn" id="population1-btn">BUY 1</button>
          <button type="submit" className="btn population-btn" id="population5-btn">BUY 5</button>
          <button type="submit" className="btn population-btn" id="population25-btn">BUY 25</button></div>
      }
      case 'workers': {
        return <div><h5 className="card-title"><strong>Assign Workers</strong></h5>

          <p className="card-text">Reallocate the workload</p>


          <p>FARMERS:
            <div className="input-group"><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder=""></input><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
          </p>
          <p>HUNTERS:
            <div className="input-group  "><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
          </p>
          <p>MINERS:
            <div className="input-group  "><button className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong>−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button className="btn btn-increment btn-outline-secondary btn-plus" type="button"><strong>+</strong></button></div>
          </p>
          <p>LUMBERJACKS:
            <div className="input-group  "><button id="wood" className="btn btn-decrement btn-outline-secondary btn-minus" type="button"><strong id="wood">−</strong></button><input type="text" inputmode="decimal" placeholder="" /><button id="wood" className="btn btn-increment btn-outline-secondary btn-plus" type="button" onClick=""><strong id="wood">+</strong></button></div>
          </p>

          <div>
            <p>POPULATION:</p>
            <p>UNASSIGNED:</p>
          </div>
        </div>

      }
      case 'upgrades': {
        return <div><h5 className="card-title"><strong>Purchase Upgrades</strong></h5>
          <h2 className="card-text">Make a Purchase</h2>
          <tbody>
            <tr className="cell">
              <th scope="row">FRUIT:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">GOLD:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">MEAT:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
            <tr className="cell">
              <th scope="row">WOOD:</th>
              <td>/3 Owned</td>
              <button type="submit" className="btn trade-btn" id="worker-btn">BUY</button>
            </tr>
          </tbody></div>
      }
      case 'levelup': {
        return <div><h1>Level Up!</h1>

          <p>Level Up to (Next Level)</p>
          <div>
            <h3>Cost:</h3>
            <p>50 Wood</p>
            <p>50 Gold</p>
            <button type="submit" className="btn levelup-btn" id="levelup-btn">BUY</button>
          </div></div>
      }
      default: {
        return <div className="manageBox">
          <div className="cardManage">
            <div className="buttons">
              <h1>Manage Village</h1>
              <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('population')}>INCREASE POPULATION</button>
              <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('workers')}>ASSIGN WORKERS</button>
              <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('upgrades')}>PURCHASE UPGRADES</button>
              <button type="submit" className="btn manage-btn" id="manage-btn" onClick={() => props.setType('levelup')}>LEVEL UP!</button>
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