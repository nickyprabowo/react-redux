import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default <Route path="/" render={() => (
  <Redirect to="/events" key="defaultHomepage" />
)} />
