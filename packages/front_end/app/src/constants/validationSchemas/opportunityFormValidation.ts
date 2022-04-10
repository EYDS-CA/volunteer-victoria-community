import * as yup from 'yup'

export const OpportunitySchema = yup.object({
  opportunityName: yup.string().required('Please enter an opportunity name'),
  description: yup.string().required('Please provide an opportunity description'),
  location: yup.string().required('Please provide the general area of the opportunity'),
  peopleRequired: yup.string().required('Please provide the number of people required'),
  date: yup.string().required("Please provice a date for the opportunity"),
  startTime: yup.string().required('Please provide a start time'),
  endTime: yup.string().required('Please provide a end time'),
  indoorOutdoor: yup.string().oneOf(['indoor', 'outdoor']).required('Please specify indoor or outdoor'),
  criminalCheckRequired: yup.string().oneOf(['Yes', 'No']).required(),
  idealVolunteer: yup.string(), 
  additionalInfo: yup.string(),
  contactName: yup.string().required('Please provide a contact name'),
  contactEmail: yup.string().email().required('Please provide an email '),
  contactPhoneNumber: yup.string().required('Please provide a phone number')
})