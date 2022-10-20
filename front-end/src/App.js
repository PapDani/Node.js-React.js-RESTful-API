import './App.css';
import { useState } from 'react';

import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Offer from './pages/Offer';

import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

import { Email, Facebook, Call} from '@mui/icons-material';

function App() {

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (


  <Box>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
     
    <Box>
    
      <AppBar position="static" sx={{ backgroundColor:'#1f2d30'}}>
        <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <Typography variant="h4" component="div">
              Perfect System Hungary
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Email/>
            <Typography variant="p" component="div">
              <a href="mailto:perfectsystemhungary@gmail.com">perfectsystemhungary@gmail.com</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={2}> 
            <Call/>
            <Typography variant="p" component="div">
            <a href="tel:+36202125022">+36 (20) 212 5022</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={1}>          
            <Facebook/>
            <Typography variant="p" component="div">
              <a href='https://www.facebook.com/profile.php?id=100083219104359'>Facebook</a>
            </Typography>
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>

    </Box>

    <Box sx={{ width: '100%' }}>
      <AppBar position="static" style={{backgroundColor: 'white'}}>
        <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Ajánlat kérés"  {...a11yProps(0)} />
          <Tab label="Szolgáltatások"  {...a11yProps(1)} />
          <Tab disabled label="Galéria"  {...a11yProps(2)} />
          <Tab label="Kapcsolat" {...a11yProps(3)}  />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
        <Offer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Services />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Gallery />
      </TabPanel>
      <TabPanel value={value} index={3} style={{padding: 0}}>
        <Contact />
      </TabPanel>
      </SwipeableViews>
    </Box>

  </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} /* default: p, causes warning */ >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
