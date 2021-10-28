import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <form onSubmit={handleFormSubmit} id="login-form" className="card-body" style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/backtest.jpg)`
      }}>
          <label for="username-input-login">Username:</label>
        <div>
          <input name="username" value={formState.name} onChange={handleChange} type="text" id="username-input-login" />
        </div>
          <label for="email-input-login">Email:</label>
        <div>
          <input name="email" value={formState.email} onChange={handleChange} type="text" id="email-input-login" />
        </div>
          <label for="password-input-login" className="form-label">Password:</label>
        <div>
          <input name="password" value={formState.password} onChange={handleChange} type="password" id="password-input-login" />
        </div>
        <button type="submit" className="btn" id="signup-btn">SignUp</button>
      </form>
    );
  };

  return (
    <main>
      <div className="container justify-content-center text-center">
        <div className="card" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/backtest.jpg)`
          }}>
          <div className="card-header">
            <h2 className="card-title">SignUp!</h2>
          </div>
          {renderForm()}
          {error && <div>{error.message}</div>}
        </div>
      </div>
    </main>
  );
};

export default Signup;
