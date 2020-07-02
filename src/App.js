import React from 'react';
import './App.css';
import Main from './pages/Main'
import Login from './pages/Login'
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router >
        <div className="container">
          <Route path="/" exact component={Login} />
          <Route path="/main" component={Main} />
        </div>
    </Router>
  );
}

export default App;
