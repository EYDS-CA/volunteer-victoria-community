import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import store from 'store'
import { makeStyles } from '@mui/styles';
import { Box, Grid, Menu, MenuItem, Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VVCLogoSvg from '../../assets/images/vvc-logo.svg';

const useStyles = makeStyles<Theme>(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.default,
    },
  },
  appContent: {
    display: 'block',
    height: '100vh'
  },
  appBar: {
    position: 'fixed',
    height: '64px',
    zIndex: '10'
  },
  appBody: {
    paddingTop: '64px',
    display: 'flex',
    minHeight: '100%',
  },
  logo: {
    flex: 1,
  },
  layout: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 'auto',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(900 + parseInt(theme.spacing(3 * 2), 10))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  backLink: {
    cursor: 'pointer'
  }
}));


const PageLayout = (props: any) => {
  const { hideBackButton, backButtonRoute, backButtonText, hidePostButton } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userData = store.get('auth');
  const navigate = useNavigate();

  const handleAvatarClick = ({currentTarget}: {currentTarget: HTMLElement}) => {
    setAnchorEl(currentTarget as HTMLElement);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    store.clearAll();
    handleClose();
    navigate('/')
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.appContent}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Box className={classes.logo}>
              <img src={VVCLogoSvg} alt='Volunteer Victoria' />
            </Box>
            {
              !hidePostButton
                &&
              <>
                <Avatar 
                  className={classes.avatar} 
                  alt={userData?.name || ''} 
                  src={userData?.picture?.data?.url || ''}  
                  imgProps={{onClick: handleAvatarClick}}
                />
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Button 
                  color="primary" 
                  variant="outlined"
                  onClick={() => navigate('/create-opportunity')}
                >
                  post an opportunity 
                </Button>
              </>
            }
          </Toolbar>
        </AppBar>
        <Box className={classes.appBody}>
          <Box className={classes.layout}>
            {
              !hideBackButton 
                &&
              <>
                <Grid container>
                  <Grid item xs={12}>
                    <Link
                      component="a"
                      underline='none'
                      className={classes.backLink}
                      onClick={() => navigate(backButtonRoute || '/opportunities')} 
                    >
                      {'<'} { backButtonText || 'Back to all opportunities'}
                    </Link>
                  </Grid>
                </Grid> 
              </>
            }
            {props.children}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default PageLayout;