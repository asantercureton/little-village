import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Tradeboard from './pages/Tradeboard';
import Header from './components/Header';
import Footer from './components/Footer';
import TradeForm from './pages/TradeForm';
import Stats from './pages/Stats';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});





function App() {
  return (
    <ApolloProvider client={client}>

      <Router >
        
          <div  >
            <Header />
            <div>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/users/:id">
                <Profile />
              </Route>
              <Route exact path="/leaderboard">
                <Leaderboard />
              </Route>
              <Route exact path="/tradeboard">
                <Tradeboard />
              </Route>
              <Route exact path="/tradeform">
                <TradeForm />
              </Route>

            </div>

          </div>
          <Footer />
        
      </Router>
    </ApolloProvider>
  );
}

export default App;
