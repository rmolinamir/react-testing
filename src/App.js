// Libraries
import React from 'react';
import './App.css';

// Components
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Counter from './containers/counter';
import Jotto from './containers/jotto';

export default function App() {
  return (
    <>
      <header>
        <nav>
          <button>
            <Link to="/jotto"><strong>Jotto</strong></Link>
          </button>
          <button>
            <Link to="/counter"><strong>Counter</strong></Link>
          </button>
        </nav>
      </header>
      <Switch>
        <Route path="/jotto" exact component={Jotto} />
        <Route path="/counter" exact component={Counter} />
        <Redirect to="/jotto" />
      </Switch>
    </>
  );
}
