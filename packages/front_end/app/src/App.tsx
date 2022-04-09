import React, { lazy, Suspense, useEffect } from 'react';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from 'store';
import { theme } from './theme';

const PostDetails = lazy(() => import('./Views/PostDetails'));
const Dashboard = lazy(() => import('./Views/OpportunitiesDashboard'));
const Authentication = lazy(() => import('./Views/Authentication'));

const PrivateRoute: React.FC<any> = ({ children }) => {
  const auth = store.get('auth') 
  return (
    auth ? children : <Navigate to="/"/>
  );
};

const PublicRoute: React.FC<any> = ({ children }) => {
  const auth = store.get('auth')
  return (
    auth ? <Navigate to="/opportunities"/> : children
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
              path="/" 
              element={
                <PublicRoute>
                  <Authentication/>
                </PublicRoute>
              }
            />
            <Route
              path='/post/:id'
              element={
                <PrivateRoute>
                  <PostDetails></PostDetails>
                </PrivateRoute>
                
              }
            />
                        <Route
              path='/opportunities'
              element={
                <PrivateRoute>
                  <Dashboard></Dashboard>
                </PrivateRoute>
                
              }
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
