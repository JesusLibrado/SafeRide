import React from 'react';
import {Navbar} from './components/Navbar';
import {
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/request">

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
