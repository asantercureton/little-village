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
          <h1 className="headline">An online game where users create their own village, gather resources to grow and expand their village, while trading with others for resources they don't have.</h1>
         <hr id="tag"/>
          <h1 className="display-1">GAME PLAY</h1>
          <hr id="tag"/>
          <ol>
            <li>Gather resources (fruits, meat, gold, wood) according to how abundant your territory is in each type of resource.</li>
            <li>Trade with other villages for resources you don’t have.</li>
            <li>Spend those resources to improve your village.</li>
          </ol>
         
          <p id="newWorld">Your new world awaits...</p>
         
          <a href="/" className="play-btn"><span>PLAY!</span></a>

        </div>
      </div>
    </main>
  );
};

export default Home;
