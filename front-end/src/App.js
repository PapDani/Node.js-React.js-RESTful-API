import './App.css';
import { useState } from 'react';

import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Services from './pages/Services';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


function App() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (

    <div className="App">
        <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Szolgáltatások" />
        <Tab label="Galéria" />
        <Tab label="Kapcsolat" />
      </Tabs>
    
      <TabPanel value={value} index={0}>
        <Services />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Gallery />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Contact />
      </TabPanel>
    </Box>
  </div>
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
