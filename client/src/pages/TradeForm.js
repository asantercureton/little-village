import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { CREATE_TRADE } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

// TODO: need to accept infinity as a tradeAmount (will not submit blank request)
// ensure that you must be logged in as a user to view this page & make a trade
const TradeForm = () => {
    const { id } = useParams();

    const { loading, data: userData, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
        variables: { id },
    });

    const user = userData?.me || userData?.user || {};

    const userId = user._id;
    const [formState, setFormState] = useState({
        resourceSold: 'fruit',
        amountSold: '',
        resourceBought: 'fruit',
        amountBought: '',
        tradeAmount: ''
    });

    const [createTrade, { data }] = useMutation(CREATE_TRADE);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await createTrade({
                variables: {
                    userId: userId,
                    resourceSold: formState.resourceSold,
                    amountSold: parseInt(formState.amountSold),
                    resourceBought: formState.resourceBought,
                    amountBought: parseInt(formState.amountBought),
                    tradeAmount: parseInt(formState.tradeAmount)
                },
            });

        } catch (e) {
            console.error(e);
        }
        setFormState({
            resourceSold: 'fruit',
            amountSold: '',
            resourceBought: 'fruit',
            amountBought: '',
            tradeAmount: ''
        });
    };

    const successMessage = () => {
        if (data) {
            return (
                <h2>Trade Requested! Make Another Offer?</h2>
            )
        }
    };

    const renderForm = () => {
        if (loading) {
            return <h2>Loading...</h2>
        } else {
        return (
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <div>
                        <label for="exampleInputEmail1">Resource Offered: </label>
                    </div>
                    <select name="resourceSold" value={formState.resourceSold} onChange={handleChange} className="form-control-sm" id="exampleFormControlSelect1">
                        <option value='fruit'>🍎 Fruit</option>
                        <option value='meat'>🥩 Meat</option>
                        <option value='gold'>💰 Gold</option>
                        <option value='wood'>🌲 Wood</option>
                    </select>

                    <div>
                        <label className="amount" for="exampleInputEmail1">Amount Offered:</label>
                    </div>
                    <input name="amountSold" value={formState.amountSold} onChange={handleChange} type="text" inputmode="decimal" placeholder="" />

                </div>
                <hr />
                <div>
                    <label for="exampleInputEmail1">Resource Requested: </label>
                </div>
                <select name="resourceBought" value={formState.resourceBought} onChange={handleChange} className="form-control-sm" id="exampleFormControlSelect1">
                    <option value="fruit">🍎 Fruit</option>
                    <option value="meat">🥩 Meat</option>
                    <option value="gold">💰 Gold</option>
                    <option value="wood">🌲 Wood</option>
                </select>

                <div>
                    <label className="amount" for="exampleInputEmail1">Amount Requested:</label>
                </div>
                <input name="amountBought" value={formState.amountBought} onChange={handleChange} type="text" inputmode="decimal" placeholder="" />
                <hr />
                <div className="multiplier">
                    <div>
                        <label className="labelTrade">Trade Multiplier:</label>
                        <input name="tradeAmount" value={formState.tradeAmount} onChange={handleChange} className="xbox" type="text" inputmode="decimal" placeholder="" />
                    </div>
                    <label>(Keep field blank for infinite trades)</label>
                </div>
                <button type="submit" className="btn createTrade-btn">OFFER TRADE</button>
            </form>
        );
    }
    };

    return (
        <main>
            <div className="trade">
                <div className="row2">
                    <div className="villageCard" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/backtest.jpg)`
          }}>
                        {successMessage()}
                        <h1 className="tradeTitle">CREATE A TRADE!</h1>
                        {renderForm()}
                        {error && <div>{error.message}</div>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TradeForm;