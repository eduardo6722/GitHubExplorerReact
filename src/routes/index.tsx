import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository/:repository+" component={Repository} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
