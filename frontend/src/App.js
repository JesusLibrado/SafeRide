import React from 'react';
import {Navbar} from './components/Navbar';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Main from './components/Main';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Router>
      <Navbar/>
      <Main />
    </Router>
  );
}

export default App;
