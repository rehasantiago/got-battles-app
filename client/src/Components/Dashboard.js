/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import {
  TextField,
  Container,
  FormControl,
  Grid,
  IconButton,
  Card,
  CardContent,
  Typography,
  MobileStepper,
  Button
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
 KeyboardArrowLeft,
 KeyboardArrowRight,
 Search
} from '@material-ui/icons';
import axios from 'axios';
 
function sleep(delay = 0) {
 return new Promise((resolve) => {
   setTimeout(resolve, delay);
 });
}
 
const useStyles = makeStyles((theme) => ({
 option: {
     fontSize: 15,
     '& > span': {
       marginRight: 10,
       fontSize: 18,
       color: "#efaf33"
     },
     backgroundColor: "#efaf33"
 },
 root: {
   maxWidth: 400,
   flexGrow: 1,
 },
 header: {
   display: 'flex',
   alignItems: 'center',
   height: 50,
   paddingLeft: theme.spacing(4),
   backgroundColor: theme.palette.background.default,
 },
 img: {
   height: 255,
   maxWidth: 400,
   overflow: 'hidden',
   display: 'block',
   width: '100%',
 },
}));
 
export default function Dashboard() {
 const classes = useStyles();
 const theme = useTheme();
 const [open, setOpen] = useState(false); 
 const [locations, setLocations] = useState([]);
 const [selectLocation, setSelectedLocation] = useState('')
 const [results, setResults] = useState([])
 const loading = open && locations.length === 0;
 
 // carousel states
 const [activeStep, setActiveStep] = React.useState(0);
 let maxSteps = results.length;
  const handleNext = () => {
   setActiveStep((prevActiveStep) => prevActiveStep + 1);
 };
 
 const handleBack = () => {
   setActiveStep((prevActiveStep) => prevActiveStep - 1);
 };
 // carousel state ends
 
 useEffect(() => {
   let active = true;
 
   if (!loading) {
     return undefined;
   }
 
   (async () => {
     const response = await fetch('http://127.0.0.1:5000/list');
     await sleep(1e3);
     const locations = await response.json();
 
     if (active) {
       setLocations(locations);
     }
   })();
 
   return () => {
     active = false;
   };
 }, [loading]);
 
 useEffect(() => {
   if (!open) {
     setLocations([]);
   }
 }, [open]);
 
 
 useEffect(() => {
   console.log(results, 'effecr');
   maxSteps = results.length
 }, [results])
 
 const autoCompleteChange = async (event, values) => {
   event.persist();
   console.log(values);
   setSelectedLocation(values);
   await axios.get(`http://localhost:5000/search?location=${values}`)
   .then(async (res) => {
     await setResults(res.data)
   })
   .catch((err) => console.log(err))
 }
 
return (
  <Container>
      <h1>B A T T L E &nbsp;&nbsp; O F &nbsp;&nbsp; G O T </h1>
      <FormControl fullWidth >
          <div>
              <Grid container spacing={1} alignItems="flex-end">
                  <Grid item xs={10}>
                  <Autocomplete
                   id="asynchronous-demo"
                   open={open}
                   onOpen={() => {
                     setOpen(true);
                   }}
                   onClose={() => {
                     setOpen(false);
                   }}
                   onChange={autoCompleteChange}
                   getOptionLabel={(option) => option}
                   options={locations}
                   loading={loading}
                   renderInput={(params) => (
                     <TextField
                       {...params}
                       name="location"
                       label="Location"
                       variant="outlined"
                       InputProps={{
                         ...params.InputProps,
                         endAdornment: (
                           <React.Fragment>
                             {loading ? <CircularProgress color="inherit" size={20} /> : null}
                             {params.InputProps.endAdornment}
                           </React.Fragment>
                         ),
                       }}
                     />
                   )}
                 />
                  </Grid>
              </Grid>
          </div>
      </FormControl>
      {results.length > 0 &&
      <>
      <h1>Results</h1>
      <Grid container spacing={1} alignItems="flex-end">
           {/* attacker card */}
           <Grid item xs={6}>
               <Card className={classes.root} style={{ maxWidth: "100%", color: results[activeStep].attacker_outcome === "win" ? "green" : "red"}}>
                   <CardContent>
                       <Typography className={classes.title} variant="h5" component="h2">
                           {results[activeStep].attacker_king}
                       </Typography>
                       <br/>
                       <Typography>
                           Attacker commander:  {results[activeStep].attacker_commander}
                       </Typography>
                       <Typography>
                           Attacker Size: {results[activeStep].attacker_size}
                       </Typography>
                   </CardContent>
               </Card>
           </Grid>
           {/* defender card */}
           <Grid item xs={6}>
               <Card className={classes.root} style={{ maxWidth: "100%", color: results[activeStep].attacker_outcome === "loss" ? "green" : "red"}}>
                   <CardContent>
                       <Typography className={classes.title} variant="h5" component="h2">
                           {results[activeStep].defender_king}
                       </Typography>
                       <br/>
                       <Typography>
                           Defender commander: {results[activeStep].defender_commander}
                       </Typography>
                       <Typography>
                           Defender Size: {results[activeStep].defender_size}
                       </Typography>
                   </CardContent>
               </Card>
           </Grid>
           {/* battle details */}
           <Grid item xs={12}>
               <Card className={classes.root} style={{ maxWidth: "100%", textAlign: "center" }}>
                   <CardContent>
                       <Typography className={classes.title}>
                           <b>Name:</b> {results[activeStep].name} | <b>Year:</b> {results[activeStep].year} | <b>Battle Number:</b> {results[activeStep].battle_number} |  <b>location:</b> {results[activeStep].location} | <b>Region:</b> {results[activeStep].region} | <b>Note:</b> {results[activeStep].note}
                       </Typography>
                   </CardContent>
               </Card>
           </Grid>
       </Grid>
       <br/><br/>
       <MobileStepper
           steps={maxSteps}
           position="static"
           variant="text"
           activeStep={activeStep}
           nextButton={
           <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
               Next
               {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
           </Button>
           }
           backButton={
           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
               {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
               Back
           </Button>
           }
       />
       </>}
  </Container>
);
}
