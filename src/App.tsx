import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PageLoader from './components/PageLoader';
import store from './redux/store';

// import Chat from './containers/Chat';
// import Dashboard from './containers/Dashboard';

const Chat = lazy(() => import('./containers/Chat'));
const Dashboard = lazy(() => import('./containers/Dashboard'));

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';

const App = (): React.ReactElement => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path={DASHBOARD_ROUTE} component={Dashboard} />
          <Route path={CHAT_ROUTE} component={Chat} />
          <Redirect to={DASHBOARD_ROUTE} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default App;
