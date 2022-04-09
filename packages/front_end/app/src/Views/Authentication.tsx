import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import store from 'store'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { makeStyles } from '@mui/styles';
import PageLayout from '../components/Layouts/PageLayout';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  appBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    padding: '20px 30px 30px 30px'
  },
  textContainer: {
    textAlign: 'center'
  },
  loginWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '100px'
  }
});

export default function Authentication() {
  const classes = useStyles();

  const handleCallback = (response: ReactFacebookLoginInfo) => {
    store.set('auth', {...response})
  }
  return (
    <PageLayout hideBackButton={true}>
      <div className={classes.root}>
        <Box className={classes.appBody}>
          <Grid container>
            <Grid item xs={12} className={classes.textContainer}>
              <Typography variant="h1">Join Our Community of Volunteers</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.loginWrapper}>
            <Paper  className={classes.contentWrapper}>
              <Grid container spacing={3} >
                <Grid item sm={12} className={classes.textContainer}>
                  <Typography variant="subtitle1">
                    Sign in with Facebook
                  </Typography>
                </Grid>
                <Grid item sm={12} className={classes.textContainer}>
                  <Typography variant="body1">
                    We use Facebook sign-in to make signing into our community fast and secure 
                  </Typography>
                </Grid>
                <Grid item sm={12} className={classes.textContainer}>
                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    icon="fa-facebook"
                    callback={handleCallback} 
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </div>
    </PageLayout>
  )
}