import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserList } from './UserList';

export default () => (
  <Switch>
    <Route path="/users" component={UserList} />
  </Switch>
);
