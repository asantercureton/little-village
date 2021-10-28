// Node Modules
import React from 'react';

const Home = () => {
  return (
    <main>
      <div className="jumbotron align-items-center">
        <div className="justify-content-center">
          <h1 className="headline">Welcome to Little Village!</h1>
          <hr id="tag" />
          <h1 className="display-1">HOW TO PLAY</h1>
          <hr id="tag" />
          <ol>
            <li>Sign up to start a new village!</li>
            <li>You're in charge! Tell your villagers what resources to gather.</li>
            <li>Each resource (fruit, meat, gold, wood) can be spent to improve your territory</li>
            <li>Different territories are more or less abundant in each resource, some are even scarce!</li>
            <li>Trade with other users on the Tradeboard for resources you need.</li>
            <li>Build up your territory all the way from Tribe to Kingdom!</li>
          </ol>

          <p id="newWorld">Your new world awaits...</p>

          <a href="/signup" className="play-btn"><span>PLAY!</span></a>

        </div>
      </div>
    </main>
  );
};

export default Home;
