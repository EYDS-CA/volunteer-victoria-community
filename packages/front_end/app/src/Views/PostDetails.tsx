import PageLayout from "../components/Layouts/PageLayout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
  },
});

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  return (
    <PageLayout>
      <Paper>
        <Box mx={3} py={4} mt={3}>
          <Grid
            container
            mb={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.bold}>
                Friday Night Social
              </Typography>
              <Typography variant="body1">for Mary</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained">
                Express interest
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <Grid container py={2} justifyContent="space-between">
            <Grid container item xl={6}>
              <Typography variant="h6" className={classes.bold}>
                Description
              </Typography>
              <Typography paragraph>
                Our volunteer Computer Technicians will gain hands-on experience
                with computer refurbishment. All you need are a pair of steel
                toed boots, to be over the age of 16, and a great attitude!
              </Typography>
              <Typography paragraph>Duties may include</Typography>
            </Grid>
            <Grid container item xl={4}>
              <Grid item xs={12}>
                <Typography className={classes.bold}>Details</Typography>
              </Grid>

              <ul>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Location:
                  </Typography>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Victoria
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Details
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Details
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Details
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Details
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Details
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className={classes.bold}>
                    Details
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </PageLayout>
  );
};

export default PostDetails;
