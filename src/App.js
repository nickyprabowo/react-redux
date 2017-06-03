import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.css'

import allRoutes from './routes/allRoutes'
import store from './store'

import './App.css'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {allRoutes}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
