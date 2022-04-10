import { Box, Button, Divider, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { OpportunityDTO } from '../constants/typedefs/interfaces';
import { OpportunitySchema } from '../constants/validationSchemas/opportunityFormValidation';
import PageLayout from '../components/Layouts/PageLayout';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  reminderText: {
    fontStyle: 'italic',
  },
  formBody: {
    margin: '2em 0em',
    padding: '2em',
  },
  formAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '2em 0em 0em 0em'
  }
});

export default function CreateOpportunity() {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      opportunityName: '',
      description: '',
      location: '',
      peopleRequired: '',
      date: '',
      startTime: '',
      endTime: '',
      indoorOutdoor: '',
      criminalCheckRequired: 'No',
      idealVolunteer: '', 
      additionalInfo: '',
      contactName: '',
      contactEmail: '', 
      contactPhoneNumber: '',
      creatorUserId: '',
    },
    validationSchema: OpportunitySchema,
    onSubmit: (values: OpportunityDTO) => {
      console.log(values)
    }
  });

  return (
    <PageLayout >
      <div className={classes.root}>
        <Paper className={classes.formBody}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2">Post an Opportunity</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.reminderText}>all fields are required unless marked as 'optional'</Typography>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">About the Opportunity</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  id="opportunityName"
                  name="opportunityName"
                  label="Opportunity Name"
                  value={formik.values.opportunityName}
                  autoComplete="off"
                  onChange={formik.handleChange}
                  error={formik.touched.opportunityName && Boolean(formik.errors.opportunityName)}
                  helperText={formik.touched.opportunityName && formik.errors.opportunityName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  multiline
                  minRows={5}
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Details</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select 
                  fullWidth
                  id="peopleRequired"
                  name="peopleRequired"
                  label="Number of People Required"
                  value={formik.values.peopleRequired}
                  onChange={formik.handleChange}
                  error={formik.touched.peopleRequired && Boolean(formik.errors.peopleRequired)}
                  helperText={formik.touched.peopleRequired && formik.errors.peopleRequired}
                >
                  {
                    [...Array(10)].map((element, index) => (
                      index !== 0
                        &&
                      <MenuItem key={index.toString()} value={index.toString()}>
                        {index.toString()}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker 
                    renderInput={(props) => (
                      <TextField 
                        {...props} 
                        id="date"
                        name="date"
                        label="Date"
                        fullWidth
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                      />
                    )}
                    value={formik.values.date}
                    onChange={(date) => formik.setFieldValue('date', date)}
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField 
                  id="startTime"
                  name="startTime"
                  label="Start Time"
                  error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                  helperText={formik.touched.startTime && formik.errors.startTime}
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField  
                  id="endTime"
                  name="endTime"
                  label="End Time"
                  error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                  helperText={formik.touched.endTime && formik.errors.endTime}
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select 
                  fullWidth
                  id="indoorOutdoor"
                  name="indoorOutdoor"
                  label="Indoor or Outdoor Opportunity?"
                  value={formik.values.indoorOutdoor}
                  onChange={formik.handleChange}
                  error={formik.touched.indoorOutdoor && Boolean(formik.errors.indoorOutdoor)}
                  helperText={formik.touched.indoorOutdoor && formik.errors.indoorOutdoor}
                >
                  <MenuItem key={'indoor'} value={'indoor'}>
                    {'indoor'}
                  </MenuItem>
                  <MenuItem key={'outdoor'} value={'outdoor'}>
                    {'outdoor'}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select 
                  fullWidth
                  id="criminalCheckRequired"
                  name="criminalCheckRequired"
                  label="Criminal Record Check Required?"
                  value={formik.values.criminalCheckRequired}
                  onChange={formik.handleChange}
                  error={formik.touched.criminalCheckRequired && Boolean(formik.errors.criminalCheckRequired)}
                  helperText={formik.touched.criminalCheckRequired && formik.errors.criminalCheckRequired}
                >
                  <MenuItem key={'Yes'} value={'Yes'}>
                    {'Yes'}
                  </MenuItem>
                  <MenuItem key={'No'} value={'No'}>
                    {'No'}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id="idealVolunteer"
                  name="idealVolunteer"
                  label="Ideal Volunteer (Optional)"
                  error={formik.touched.idealVolunteer && Boolean(formik.errors.idealVolunteer)}
                  helperText={formik.touched.idealVolunteer && formik.errors.idealVolunteer}
                  value={formik.values.idealVolunteer}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth 
                  id="additionalInfo"
                  name="additionalInfo"
                  label="Additional Information (Optional)"
                  error={formik.touched.additionalInfo && Boolean(formik.errors.additionalInfo)}
                  helperText={formik.touched.additionalInfo && formik.errors.additionalInfo}
                  value={formik.values.additionalInfo}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Your Contact Information</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField 
                  fullWidth
                  id="contactName"
                  name="contactName"
                  label="Name"
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                  helperText={formik.touched.contactName && formik.errors.contactName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth
                  id="contactEmail"
                  name="contactEmail"
                  label="Email"
                  value={formik.values.contactEmail}
                  onChange={formik.handleChange}
                  error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
                  helperText={formik.touched.contactEmail && formik.errors.contactEmail}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth
                  id="contactPhoneNumber"
                  name="contactPhoneNumber"
                  label="Phone Number"
                  value={formik.values.contactPhoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.contactPhoneNumber && Boolean(formik.errors.contactPhoneNumber)}
                  helperText={formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.formAction} >
              <Button type="submit" variant="contained">
                POST
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
    </PageLayout>
  )
}