import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Dashboard} />
    </Router>
  );
}

export default App;
