import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_TRADES, QUERY_USER, QUERY_ME } from '../utils/queries';
import { EXECUTE_TRADE } from '../utils/mutations';


// TODO: executeTrade function DOES run, but the resolver doesn't update the villages
// display if the trade is successful or not (if they can't afford it); maybe use acceptData as true/false
const Tradeboard = () => {
  const { loading, data } = useQuery(QUERY_TRADES);
  const trades = data?.trades || [];

  const { id } = useParams();
  const { loading: userLoading, data: userData } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });
  const user = userData?.me || userData?.user || {};
  const userId = user._id;

  const styleResource = (resource) => {
    switch (resource) {
      case 'fruit':
        return '🍎 Fruit: ';
      case 'meat':
        return '🥩 Meat: ';
      case 'gold':
        return '💰 Gold: ';
      case 'wood':
        return '🌲 Wood: ';
      default:
        return resource;
    }
  };

  const [executeTrade, { error, data: acceptData }] = useMutation(EXECUTE_TRADE);

  const handleAcceptTrade = async (event) => {
    event.preventDefault();
    try {
      await executeTrade({
        variables: {
          userId: userId,
          tradeId: event.target.value
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const renderTrades = () => {
    if (loading || userLoading) {
      return <tbody><tr><td>Loading...</td></tr></tbody>
    } else {
      return (
        <tbody >
          {trades.map((trade) => (
            <tr key={trade._id}>
              <td>{trade.village.user.username}</td>
              <td>{styleResource(trade.selling.resource)}{trade.selling.amount}</td>
              <td>{styleResource(trade.buying.resource)}{trade.buying.amount}</td>
              <td> {trade.amount} Trades Left</td>
              <td><button onClick={handleAcceptTrade} value={trade._id} type="submit" className="btn login-btn" id="login-btn">Accept Trade</button></td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <main>
      <div>
        <section className="leaderboard overflow-auto"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/pape.jpg)`
        }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Offering</th>
                <th scope="col">Requesting</th>
                <th scope="col">Available</th>
                <th scope="col">Accept Trade</th>
              </tr>
            </thead>
            {renderTrades()}
          </table>
        </section>
      </div>
    </main>
  );
};

export default Tradeboard;