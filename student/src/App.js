import React from 'react';
import {Navbar} from './components/Navbar';
import {
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";
import Main from './components/Main';
import Students from './components/Students';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/">
          {/* <Main /> */}
          <Students/>
        </Route>
        <Route path="/request">

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
