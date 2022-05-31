import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.scss';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={ logo } className="App-logo" alt="logo" />
        </Link>
        <Switch>
          <Route exact path="/game" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
