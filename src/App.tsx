import React, { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import PageLoader from './components/PageLoader';
import store, { persistor } from './redux/store';

const Chat = lazy(() => import('./containers/Chat'));
const Dashboard = lazy(() => import('./containers/Dashboard'));

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';

const App = (): React.ReactElement => (
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path={DASHBOARD_ROUTE} component={Dashboard} />
              <Route path={CHAT_ROUTE} component={Chat} />
              <Redirect to={DASHBOARD_ROUTE} />
            </Switch>
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  </HelmetProvider>
);

export default App;
