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
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  };

  return (
    <main>
      <div className="container justify-content-center text-center">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">SignUp!</h2>
          </div>
          <form id="login-form" className="card-body">
            <div>
              <label for="username-input-login">Username</label>
              <input type="text" id="username-input-login" />
            </div>
            <div>
              <label for="email-input-login">Email</label>
              <input type="text" id="email-input-login" />
            </div>
            <div>
              <label for="password-input-login" className="form-label">Password</label>
              <input type="password" id="password-input-login" />
            </div>
            <button type="submit" className="btn" id="signup-btn">SignUp</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
