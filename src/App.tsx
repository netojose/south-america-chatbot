import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Chat from './containers/Chat';
import Dashboard from './containers/Dashboard';
import store from './redux/store';

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';

const App = (): React.ReactElement => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={DASHBOARD_ROUTE} component={Dashboard} />
        <Route path={CHAT_ROUTE} component={Chat} />
        <Redirect to={DASHBOARD_ROUTE} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
