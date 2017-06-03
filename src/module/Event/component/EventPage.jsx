import React, { Component, PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import HeaderContainer from 'module/Auth/component/HeaderContainer';
import Sidebar from 'components/Sidebar';
import AddReport from './AddReport';
import ReportList from './ReportList';

class EventPage extends Component {
  static get propTypes() {
    return {
      match: PropTypes.any,
    }
  }

  renderSubRoutes() {
    const { match: { url } } = this.props;

    return (
      <div>
        <Route path={`${url}/report`} component={() => (<ReportList {...this.props} />)} />
        <Route path={`${url}/addReport`} component={() => (<AddReport {...this.props} />)} />
        <Redirect from="/events" to={`${url}/report`} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Sidebar {...this.props} />
            </Grid.Column>
            <Grid.Column width={13}>
              <div className="main-content">
                {this.renderSubRoutes()}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default EventPage;
