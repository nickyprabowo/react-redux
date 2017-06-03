import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import HomeContainer from 'module/Auth/component/HomeContainer';
import createAuthGuardContainer from 'module/Auth/component/createAuthGuardContainer';

class Dashboard extends Component {
  render() {
    // Register all authed routes here (harusnya sih di satu tempat, tapi nanti aja)
    return (
      <Route path='/home' component={HomeContainer} />
    )
  }
}

export default createAuthGuardContainer({})(Dashboard);
