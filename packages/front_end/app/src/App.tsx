import React, { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LinearProgress, ThemeProvider } from '@mui/material';
import store from 'store'

import { theme } from './theme';
import PostDetails from './Views/Posting';

const Authentication = lazy(() => import('./Views/Authentication'));

const PrivateRoute: React.FC<any> = ({ children }) => {
  const auth = store.get('auth') 
  // Dummy auth for getting routes set up, replace check with proper auth
  return (
    auth ? children : <Navigate to="/"/>
  );
};

const PublicRoute: React.FC<any> = ({ children }) => {
  const auth = store.get('auth')
  // Dummy auth for getting routes set up, replace check with proper auth
  return (
    auth ? <Navigate to="/dashboard"/> : children
  )
};

const Loader = () => (
  <LinearProgress
    style={{ borderRadius: '5%', height: '5px', width: '95vw', margin: 'auto' }}
  />
);

const App = () => {

  useEffect(() => {
    document.body.style.margin = '0px'
  }, [])

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path='/posting/:id'
              element={
                <PrivateRoute>
                  <PostDetails></PostDetails>
                </PrivateRoute>
                
              }
            />
            <Route
              path="/" 
              element={
                <PublicRoute>
                  <Authentication/>
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
