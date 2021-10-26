
// Node Modules
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
// Components
import UserList from '../components/UserList';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <ul>
        <p><strong>username:</strong> {user.username}</p>
        <p><strong>email:</strong> {user.email}</p>
      </ul>
    );
  }

  return (
    <div className="wrapper">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 tableTitle">My Village.</h1>

          <table className="table table-hover">

            <tbody className="rows">
              <tr className="cell">
                <th scope="row">STATUS:</th>
                <td>TRIBE</td>
              </tr>
              <tr className="cell">
                <th scope="row">POPULATION:</th>
                <td>18</td>
              </tr>
              <tr className="cell">
                <th scope="row">FRUITS:</th>
                <td>10</td>
              </tr>
              <tr className="cell">
                <th scope="row">GOLD:</th>
                <td>0.4</td>
              </tr>
              <tr className="cell">
                <th scope="row">MEAT:</th>
                <td>2.5</td>
              </tr>
              <tr className="cell">
                <th scope="row">WOOD:</th>
                <td>3.1</td>
              </tr>
              <tr className="cell">
                <th scope="row"># of TRADES:</th>
                <td>3</td>
              </tr>
            </tbody>
          </table>
          <div>
                <button type="submit" className="btn trade-btn" id="trade-btn">REQUEST A TRADE!</button>
              </div>
        </div>

        <div className="sidePanel">
          <div className="card2">
            <div className="card-body2">
              <h5 className="card-title"><strong>Village Name</strong></h5>
              <p className="card-text">{renderCurrentUserInfo()}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;