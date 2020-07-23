import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/navbar/Navbar.js';
import Home from './pages/home/Home.js';
import Charts from './pages/charts/Charts.js';

const App = () => {
  const [theme, selectTheme] = useState('dark');
  return (
    <div className={`App theme-${theme}`}>
      <Router>
        <Navbar currentTheme={theme} setTheme={selectTheme}/>
        <main className="main-page-content">
            <Switch>
              <Route path="/charts">
                <Charts currentTheme={theme}/>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
