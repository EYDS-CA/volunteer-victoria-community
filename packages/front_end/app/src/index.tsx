import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { theme } from './theme';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { AnyAaaaRecord } from 'dns';



import  App from './App';



render(
    <App />, document.getElementById('root')
);
