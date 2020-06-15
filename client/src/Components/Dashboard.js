/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import {
   TextField,
   Container,
   FormControl,
   TableCell,
   TableRow,
   Grid,
   IconButton
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
 
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Dashboard() {
 
  const [open, setOpen] = useState(false);  
  const [locations, setLocations] = useState([]);
  const [selectLocation, setSelectedLocation] = useState('')
  const loading = open && locations.length === 0;

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

  React.useEffect(() => {
    if (!open) {
      setLocations([]);
    }
  }, [open]);

  const onChange = (e) => {
    setSelectedLocation(e.target.value)
  }
  const handleClick = () => {
    console.log(selectLocation);
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
                    getOptionLabel={(option) => option}
                    options={locations}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="location"
                        label="Asynchronous"
                        variant="outlined"
                        onChange={onChange}
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
                   <Grid item>
                       <IconButton variant="contained" size="large" color="primary" onClick={handleClick}>
                           Search
                       </IconButton>
                   </Grid>
               </Grid>
           </div>
       </FormControl>
       <h1>Results</h1>
       <div style={{marginLeft: "auto", marginRight: "auto"}}>           
           
       </div>
   </Container>
 );
}


