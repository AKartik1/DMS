import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage"; // Import the LandingPage component
import HowToPlayPage from "./HowToPlayPage"; // Import your HowToPlayPage component
import GamePage from "./GamePage"; // Import the GamePage component
import Questions from "./Questions"; // Assuming you have this component
import Navbar from "./Navbar"; // Import the Navbar component

function App() {
    return (
        <Router>
            <Navbar title="Discrete Mathematics Game" showBackButton={false} /> {/* Show the navbar for navigation */}
            <Switch>
                <Route path="/how-to-play/:topicName" component={HowToPlayPage} />
                <Route path="/game/:topicName" component={GamePage} /> {/* Route for the GamePage */}
                <Route path="/questions" component={Questions} />
                <Route path="/" exact component={LandingPage} /> {/* Route for the LandingPage */}
            </Switch>
        </Router>
    );
}

export default App;
