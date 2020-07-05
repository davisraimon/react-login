import React, {useState} from 'react';
import './App.css';
import Main from './pages/Main'
import Login from './pages/Login'
import { HashRouter as Router, Route} from "react-router-dom";
import { AppContext } from "./libs/contextLibs";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
    <Router >
        <div className="container">
          <Route path="/" exact component={Login} />
          <Route path="/main" component={Main} />
        </div>
    </Router>
    </AppContext.Provider>
  );
}


export default App;
