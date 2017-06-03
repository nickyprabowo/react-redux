import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import HeaderContainer from 'module/Auth/component/HeaderContainer';
import Sidebar from 'components/Sidebar';
import AddReport from './AddReport';
import ReportList from './ReportList';

class EventPage extends Component {
  renderSubRoutes() {
    return (
      <div>
        <Route path={`${this.props.match.url}/report`} component={() => (<ReportList {...this.props} />)} />
        <Route path={`${this.props.match.url}/addReport`} component={() => (<AddReport {...this.props} />)} />
      </div>
    )
  }

  render() {
    const page = this.props.match.url === '/home/report'
      ? <Redirect to={`${this.props.match.url}/report`} />
      : null;

    return (
      <div>
        {this.renderSubRoutes()}

        <HeaderContainer />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Sidebar {...this.props} />
            </Grid.Column>
            <Grid.Column width={13}>
              <div className="main-content">
                {page}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default EventPage;
