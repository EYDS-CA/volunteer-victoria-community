import { LinearProgress, ThemeProvider } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from 'store';
import { theme } from './theme';

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
  console.log('AUTH', auth)
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
          </Routes>
        </Suspense>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
