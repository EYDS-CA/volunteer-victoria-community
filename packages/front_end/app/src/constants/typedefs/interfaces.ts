export interface OpportunityDTO {
  opportunityName: string;
  description: string;
  location: string;
  peopleRequired: string;
  date: '',
  startTime: string;
  endTime: string;
  indoorOutdoor?: "indoor" | "outdoor" | '';
  criminalCheckRequired: "Yes" | "No";
  idealVolunteer?: string; 
  additionalInfo?: string;
  contactName: string;
  contactEmail?: string; 
  contactPhoneNumber?: string;
  creatorUserId: string;
}