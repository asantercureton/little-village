// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS } from '../utils/queries';
// Components
import UserList from '../components/UserList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  const renderUserList = () => {
    if (loading) {
      return <h2>Loading...</h2>
    } else {
      return <UserList users={users} title="List of Users" />
    }
  }

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }

  return (
    <main>
      <div className="jumbotron align-items-center">
        <div className="justify-content-center">
          <h1 className="display-4">TUTORIAL</h1>
          <h2 className="lead">BELOW ARE INSTRUCTIONS ON HOW TO PLAY LITTLE VILLAGE...</h2>
          <ol>
            <li>.......</li>
            <li>.......</li>
            <li>.......</li>
            <li>.......</li>
          </ol>
          <a href="/" className="play-btn"><span>PLAY!</span></a>

        </div>
      </div>
    </main>
  );
};

export default Home;
