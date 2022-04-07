import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { theme } from '@/theme';
import { LinearProgress, ThemeProvider } from '@mui/material';



const App = lazy(() => import('./App'));

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        //TODO: replace true with auth check if auth is needed
        true ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

const PublicRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Component {...props} /> : <Navigate to="/" />
        </>
      )}
    />
  );
};

const Loader = () => (
  <LinearProgress
    style={{ borderRadius: '5%', height: '5px', width: '95vw', margin: 'auto' }}
  />
);

const ApplicationRoot = () => {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <PublicRoute path="/" component={App} />
              </Routes>
            </Suspense>
      </ThemeProvider>
    </HashRouter>
  );
};

render(
    <ApplicationRoot />, document.getElementById('root')
);
