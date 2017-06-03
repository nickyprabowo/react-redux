import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './store';
import Dashboard from './components/Dashboard';

import 'semantic-ui-css/semantic.css';
import './App.css';

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Dashboard />
            <Route exact path="/" component={Dashboard}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
