import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
            <h2 className="card-title" id="login">Login</h2>
          </div>
          <form id="login-form" className="card-body">
            <div>
              <label for="username-input-login">Username</label>
              <input type="text" id="username-input-login" />
            </div>
            <div>
              <label for="password-input-login" className="form-label">Password</label>
              <input type="password" id="password-input-login" />
            </div>
            <button type="submit" className="btn login-btn" id="login-btn">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
