import { Box, Button } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import PageLayout from '../components/Layouts/PageLayout';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  dashboardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate()

  return (
    <PageLayout hideBackButton={true}>
      <div className={classes.root}>
        <Box className={classes.dashboardBody}>
            <Button onClick={() => navigate('/post/123')}>click</Button>
        </Box>
      </div>
    </PageLayout>
  )
}