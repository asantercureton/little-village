import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { CREATE_TRADE } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';


const TradeForm = () => {
    const { id } = useParams();

    const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
        variables: { id },
    });

    const user = data?.me || data?.user || {};

    const [formState, setFormState] = useState({
        userId: user._id,
        resourceSold: '',
        amountSold: '',
        resourceBought: '',
        amountBought: '',
        tradeAmount: ''
    });

    const [createTrade, { error: tradeError, data: tradeData }] = useMutation(CREATE_TRADE);

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
            const { tradeData } = await createTrade({
                variables: { ...formState },
            });

        } catch (e) {
            console.error(e);
        }
        // clear form values
        setFormState({
            userId: user._id,
            resourceSold: '',
            amountSold: '',
            resourceBought: '',
            amountBought: '',
            tradeAmount: ''
        });
    };

    const renderForm = () => {
        if (tradeData) {
            return (
                <div>
                    <h2> Trade Created!</h2>
                    <p>Make Another Offer?</p>
                </div>
            )
        }
        return (
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <div>
                        <label for="exampleInputEmail1">Resource Offered: </label>
                    </div>
                    <select name="resourceSold" value={formState.resourceSold} onChange={handleChange} className="form-control-sm" id="exampleFormControlSelect1">
                        <option value='fruit'>Fruit</option>
                        <option value='meat'>Meat</option>
                        <option value='gold'>Gold</option>
                        <option value='wood'>Wood</option>
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
                    <option>Fruit</option>
                    <option>Meat</option>
                    <option>Gold</option>
                    <option>Wood</option>
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
    };

    return (
        <main>
            <div className="trade">
                <div className="row2">
                    <div className="villageCard">
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