import './App.css';
/*
import { useState } from 'react';

import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Services from './pages/Services';

import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Email, Instagram } from '@mui/icons-material';
 */
function App() {

  /*
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
*/

  return (

    <div>
      <div style="padding: px; background-image: url(http://www.tourist-info.hu/fejlesztes-alatt.png); background-repeat: no-repeat; background-position: center; width: 100%; height: 100%;">
        <div style="text-align: center; margin-top: 100px;">
            <h1>Perfect System Hungary</h1>
            <h2 style="">Elérhetőségek:</h2>
            <div>
                <h3 style="font-size: 22px;color: black;text-shadow: 1px 1px 10px white;">Telefonszám: +36202125022</h3>
                <h3 style="font-size: 22px;color: black;text-shadow: 1px 1px 10px white;">Email cím: perfectsystemhungary@gmail.com</h3>
            </div>
    
            <div>
                <h1 style="margin-top: 300px;">Oldal fejlesztés alatt</h1>
            </div>
            
        </div>
      </div>
    </div>
/*
    <Box sx={{ flexGrow: 1}}>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
     
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor:'#1f2d30'}}>
        <Toolbar>

          <Typography variant="h4" component="div" sx={{ flexGrow: 1}}>
            Perfect System Hungary
          </Typography>

          <Email/>
          <Typography variant="p" component="div" sx={{ flexGrow: 1}}>
            perfectsystem@gmail.com
          </Typography>

          <Instagram/>
          <Typography variant="p" component="div" sx={{ flexGrow: 1}}>
            instagram.com/perfectsystem
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>

    <Box sx={{ width: '100%' }}>
    <AppBar position="static" style={{backgroundColor: 'white'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Szolgáltatások"  {...a11yProps(0)} />
        <Tab label="Galéria"  {...a11yProps(1)} />
        <Tab label="Kapcsolat" {...a11yProps(2)}  />
      </Tabs>
    </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
        <Services />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Gallery />
      </TabPanel>
      <TabPanel value={value} index={2} style={{padding: 0}}>
        <Contact />
      </TabPanel>
      </SwipeableViews>
    </Box>
    </Box>
    */
  );
}
/*
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
          <Typography component={'span'} /* default: p, causes warning  >{children}</Typography>
        </Box>
      
      )}
    </div>
  );
}
*/
export default App;
