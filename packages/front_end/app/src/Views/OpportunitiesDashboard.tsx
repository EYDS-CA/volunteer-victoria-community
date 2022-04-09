import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import PageLayout from '../components/Layouts/PageLayout';
import { AccessTime, CalendarToday, PeopleOutline } from '@mui/icons-material';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  opportunityCellBox: {
    display: 'flex',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '1.5em 2em'
  },
  hostRow: {
    fontWeight: '500',
    paddingBottom: '25px'
  },
  detailsRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  detailGroup: {
    display: 'flex'
  },
  detail: {
    display: 'flex',
    color: 'rgba(0, 0, 0, 0.8)',
    paddingRight: '20px'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginRight: '10px'
  }
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OpportunitiesDashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // TODO: update opportunity type once DTO is defined
  const getOpportunityCell = (opportunity: any) => (
    <Box className={classes.opportunityCellBox}> 
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Typography variant="subtitle2">{ opportunity.opportunityName }</Typography>
        </Grid>
        <Grid item xs={12} className={classes.hostRow}>
          <Typography variant="body2">For { opportunity.host }</Typography>
        </Grid>
        <Grid item xs={12} >
          <Box className={classes.detailsRow}>
            <Box className={classes.detailGroup}>
              <Box className={classes.detail}>
                <CalendarToday className={classes.icon} />
                <Typography variant="body2">{ moment(opportunity.eventTime).format("MMMM DD, YYYY") }</Typography>
              </Box>
              <Box className={classes.detail}>
                <AccessTime className={classes.icon} />
                <Typography variant="body2">{ opportunity.eventRange }</Typography>
              </Box>
              <Box className={classes.detail}>
                <PeopleOutline className={classes.icon} />
                <Typography variant="body2">Recruiting { opportunity.maximumPeople } people</Typography>
              </Box>
            </Box>
            <Button variant="contained" size='medium' onClick={() => navigate(`/post/${opportunity.id}`)} >
              VIEW DETAILS
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  const example_all_posts = [
    {
      opportunityName: 'My Event',
      host: 'Jimothy',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '1'
    },
    {
      opportunityName: 'My Event',
      host: 'Bobert',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '2'
    },
    {
      opportunityName: 'My Event',
      host: 'Pamuel',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '3'
    },
    {
      opportunityName: 'My Event',
      host: 'Danthony',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '4'
    },
    {
      opportunityName: 'My Event',
      host: 'Jimothy',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '5'
    },
    {
      opportunityName: 'My Event',
      host: 'Bobert',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '6'
    },
    {
      opportunityName: 'My Event',
      host: 'Pamuel',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '7'
    },
    {
      opportunityName: 'My Event',
      host: 'Danthony',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '8'
    },
  ]

  const example_my_posts = [
    {
      opportunityName: 'My Event',
      host: 'Staniel',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '11'
    },
    {
      opportunityName: 'My Event',
      host: 'Staniel',
      eventTime: moment(),
      eventRange: '2-8pm',
      maximumPeople: '2',
      id: '12'
    }
  ]

  return (
    <PageLayout hideBackButton={true}>
      <div className={classes.root}>
        <Box>
          <Grid container >
            <Grid item xs={12}>
              <Typography variant="h2">
                Volunteer Opportunities
              </Typography>
            </Grid>
            <Grid item >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
                  <Tab style={{ fontWeight: '600' }} label="All" {...a11yProps(0)} />
                  <Tab style={{ fontWeight: '600' }} label="My Posts" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={activeTab} index={0}>
                <Stack
                  direction='column'
                  spacing={4}
                >
                  {
                    example_all_posts.map((element) => getOpportunityCell(element))
                  }
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <Stack
                  direction='column'
                  spacing={4}
                >
                  {
                    example_my_posts.map((element) => getOpportunityCell(element))
                  }
                </Stack>
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </PageLayout>
  )
}