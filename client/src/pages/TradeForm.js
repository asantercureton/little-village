import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';



import { QUERY_TRADES } from '../utils/queries';




const TradeForm = () => {
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

    const renderTrade = () => {
        if (!Auth.loggedIn()) return null;
        return Auth.getTrade().data.trades;
    }
    console.log('trade', trades);


    return (
        <main>
            <div className="trade">
                <div className="row2">
                    <div className="villageCard">
                        <h1 className="tradeTitle">CREATE A TRADE!</h1>
                        <form>
                            <div className="form-group">
                                <div>
                                    <label for="exampleInputEmail1">Resource Requested: </label>
                                </div>
                                <select className="form-control-sm" id="exampleFormControlSelect1">
                                    <option>Fruit</option>
                                    <option>Meat</option>
                                    <option>Gold</option>
                                    <option>Wood</option>
                                </select>

                                <div>
                                    <label className="amount" for="exampleInputEmail1">Amount Requested:</label>
                                </div>
                                <input type="text" inputmode="decimal" placeholder="" />
                                <hr />
                                <div>
                                    <label for="exampleInputEmail1">Resource Offered: </label>
                                </div>
                                <select className="form-control-sm" id="exampleFormControlSelect1">
                                    <option>Fruit</option>
                                    <option>Meat</option>
                                    <option>Gold</option>
                                    <option>Wood</option>
                                </select>

                                <div>
                                    <label className="amount" for="exampleInputEmail1">Amount Offered:</label>
                                </div>
                                <input type="text" inputmode="decimal" placeholder="" />

                            </div>
                            <div className="multiplier">
                                <div>
                                    <label className="labelTrade">Trade Multiplier:</label>
                                    <input className="xbox" type="text" inputmode="decimal" placeholder="" />
                                </div>
                                <label>(Keep field blank for infinite trades)</label>
                            </div>
                            <button type="submit" className="btn createTrade-btn">TRADE</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TradeForm;