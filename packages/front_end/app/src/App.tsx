import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBody :{
    display: 'flex',
    flex: '1',
    maxWidth: '100%',
    paddingTop: '70px',
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Hello world!
    </div>
  );
};

export default App;
