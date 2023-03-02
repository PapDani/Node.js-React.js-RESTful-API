import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Logo from "./images/logos/logo.png";

import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Offer from "./pages/Offer";
import About from "./pages/About";

import { Email, Facebook, Call } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import { Theme } from "./theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./App.css";



function App() {

  //Drawer on mobile
  const [open, setOpen] = useState(false);
  
  function openMenu() {
      setOpen(!open);
  }

  function closeMenu() {
      setOpen(false);
  }


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
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const moreThan820px = useMediaQuery(`(min-width:${Theme.breakpoints.values.tablet}px)`);

  return (
    <Box>
      <ThemeProvider theme={Theme}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <Box sx={{ width: "100%" }}>
          {/* <AppBar position="static" style={{ backgroundColor: "#354244" }}> */}
          <AppBar elevation={0} position="sticky" sx={{backgroundColor:`${Theme.palette.primary.semiTransparent}`}}>
            {/* <Tabs value={value} onChange={handleChange} centered variant="scrollable" textColor="primary" inkBarStyle={{ background: 'yellow' }} scrollButtons allowScrollButtonsMobile */}
            <Stack direction="row"
              justifyItems="center"
              alignItems="sketch"
              alignContent="flex-start"
            >
              <Stack direction="row"
                alignItems="center"
              >
                <Box
                  component="img"
                  sx={{
                    height: 150,
                  }}
                  alt="Logo"
                  src={Logo}
                />
              </Stack>


              <Stack direction="column" width="100%">
                <Stack direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  justifyItems="center"
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  marginLeft="auto"
                  gap={2}
                  marginTop={3}
                  marginRight={6}
                >

                  <Stack direction="row"
                    alignItems="center"
                    // spacing={1}
                    padding={2}
                    // borderRight={1}
                    borderRadius={2}
                    // borderLeft={2}
                    // borderBottom={2}
                    border={2}
                    borderColor="divider.primary"
                  >
                    <Email className="contactIcons" onClick={e => window.location.href = "mailto:perfectsystemhungary@gmail.com"} color="primary" />
                    <a  href="mailto:perfectsystemhungary@gmail.com">
                      {moreThan820px && "\u00A0perfectsystemhungary@gmail.com"}
                    </a>

                  </Stack>

                  <Stack direction="row"
                    alignItems="center"
                    // spacing={1}
                    padding={2}
                    // borderRight={1}
                    borderRadius={2}
                    // borderLeft={1}
                    // borderBottom={2}
                    border={2}
                    borderColor='divider.primary'
                  >
                    <Call className="contactIcons" onClick={e => window.location.href = "tel:+36202125022"} color="primary" />
                    <a href="tel:+36202125022">
                      {moreThan820px && "\u00A0+36 (20) 212 5022"}
                    </a>
                  </Stack>

                  <Stack direction="row"
                    alignItems="center"
                    // spacing={1}
                    padding={2}
                    // borderLeft={1}
                    borderRadius={2}
                    // borderBottom={2}
                    border={2}
                    borderColor='divider.primary'
                  >
                    <Facebook className="contactIcons" onClick={e => window.location.href = "https://www.facebook.com/profile.php?id=100083219104359"} color="primary" />
                    <a href="https://www.facebook.com/profile.php?id=100083219104359">
                      {moreThan820px && "\u00A0Facebook"}
                    </a>
                  </Stack>

                </Stack>

                {moreThan820px ?
                  <Stack direction="row"
                  alignItems="flex-end"
                  justifyContent="flex-start"
                  height="100%"
                  >
                    <Tabs value={value} onChange={handleChange} /*centered*/ variant="scrollable" textColor="secondary"
                      scrollButtons allowScrollButtonsMobile
                    >
                      <Tab label="Rólunk" {...a11yProps(0)} />
                      <Tab label="Szolgáltatások" {...a11yProps(1)} />
                      <Tab label="Ajánlat kérés" {...a11yProps(2)} />
                      <Tab label="Galéria" {...a11yProps(3)} />
                    </Tabs>
                    </Stack>
                :
                  <Stack direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        height="100%"
                  >
                    <Button onClick={openMenu} variant="outlined" color="secondary" className="menuButton">
                    MENU
                    </Button>
                    <Drawer anchor={"top"} open={open} 
                    onClose={closeMenu} PaperProps={{sx:{backgroundColor:`${Theme.palette.primary.semiTransparent}`}}}>
                      <Stack direction="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                      <Tabs value={value} onChange={handleChange} /*centered*/ variant="scrollable" textColor="secondary"
                        allowScrollButtonsMobile orientation="vertical" TabIndicatorProps={{sx: {visibility: 'hidden'}}}
                      >
                        <Tab label="Rólunk" {...a11yProps(0)} onClick={closeMenu} />
                        <Tab label="Szolgáltatások" {...a11yProps(1)} onClick={closeMenu} />
                        <Tab label="Ajánlat kérés" {...a11yProps(2)} onClick={closeMenu} />
                        <Tab label="Galéria" {...a11yProps(3)} onClick={closeMenu} />

                      </Tabs>
                      <Button onClick={closeMenu} 
                        variant="outlined" color="secondary" className="menuButton">
                        X
                      </Button>
                      </Stack>
                    </Drawer>
                  </Stack>                
                }

              </Stack>
            </Stack>

          </AppBar>

          <SwipeableViews
            axis={Theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0}>
              <About />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Services />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Offer theme={Theme} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Gallery />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </ThemeProvider>
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
          <Typography component={"span"} /* default: p, causes warning */>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
