// Libraries
import React from 'react';

// Components
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import JottoHooks from './containers/jotto_hooks';
import JottoRedux from './containers/jotto_redux';
import Counter from './containers/counter';

export default function App() {
  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav className="navbar-nav mr-auto">
          <button className="btn btn-outline-light my-2 my-sm-0">
            <Link to="/jotto-hooks"><strong>Jotto Hooks</strong></Link>
          </button>
          <button className="btn btn-outline-light my-2 my-sm-0">
            <Link to="/jotto-redux"><strong>Jotto Reduxx</strong></Link>
          </button>
          <button className="btn btn-outline-light my-2 my-sm-0">
            <Link to="/counter"><strong>Counter</strong></Link>
          </button>
        </nav>
      </header>
      <main className="container">
        <Switch>
          <Route path="/jotto-hooks" exact component={JottoHooks} />
          <Route path="/jotto-redux" exact component={JottoRedux} />
          <Route path="/counter" exact component={Counter} />
          <Redirect to="/jotto-redux" />
        </Switch>
      </main>
    </>
  );
}
