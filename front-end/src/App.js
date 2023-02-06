import { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";

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
import "./App.css";

//Ezt a Theme.js-ből hogy lehetne használni, hogy itt ne legyen?
const breakpoints = {
  mobile: 426,
  tablet: 769,
  laptop: 1025,
  desktop: 1440
}

const getClassName = (width) => {
  console.log("width: " + width);

  if (width < breakpoints.mobile) {
    console.log("mobile");
    return "hideContactString"
  } else if (width < breakpoints.tablet) {
    console.log("tablet");
    return "hideContactString"
  } else {
    console.log("else");
    return "showContactString"
  }
}

function App() {

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

  const [contactStringClassName, setContactStringClassName] = useState(getClassName(window.innerWidth));
  const updateDimensions = () => {
    setContactStringClassName(getClassName(window.innerWidth));
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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

        <Box>
          {/* <AppBar position="static" sx={{ backgroundImage: `url(${HoneycombBlue})` }}> */}
          <AppBar elevation={0} position="static" color="transparent">

            {/* <Box sx={{ display: 'none' }}>
            Hidden on all
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            Hidden only on xs            
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}>
            Hidden only on sm
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}>
            Hidden only on md
              </Box>
              <Box sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}>
              Hidden only on lg
              </Box>
              <Box  	sx={{ display: { xs: 'block', xl: 'none' } }}>
              Hidden only on xl
              </Box>
              <Box  	sx={{ display: { xs: 'block', sm: 'none' } }}>
              Visible only on xs
              </Box>
              <Box  	sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}>
              Visible only on sm
              </Box>
              <Box d 	sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
              Visible only on md
              </Box>
              <Box  	sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}>
              Visible only on lg
              </Box>
              <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
              Visible only on xl
              </Box> */}

            <Stack direction="row"
              justifyContent="flex-end"
              alignItems="center"
              justifyItems="center"
            >

              <Stack direction="row"
                alignItems="center"
                spacing={1}
                padding={2}
                borderRight={1}
                borderLeft={2}
                borderBottom={2}
                borderColor="divider.primary"
              >
                <Email className="contactIcons" onClick={e => window.location.href = "mailto:perfectsystemhungary@gmail.com"} color="primary" />
                <a className={contactStringClassName} href="mailto:perfectsystemhungary@gmail.com">
                  perfectsystemhungary@gmail.com
                </a>

              </Stack>

              <Stack direction="row"
                alignItems="center"
                spacing={1}
                padding={2}
                borderRight={1}
                borderLeft={1}
                borderBottom={2}
                borderColor='divider.primary'
              >
                <Call className="contactIcons" onClick={e => window.location.href = "tel:+36202125022"} color="primary" />
                <a className={contactStringClassName} href="tel:+36202125022">+36 (20) 212 5022</a>
              </Stack>

              <Stack direction="row"
                alignItems="center"
                spacing={1}
                padding={2}
                borderLeft={1}
                borderBottom={2}
                borderColor='divider.primary'
              >
                <Facebook className="contactIcons" onClick={e => window.location.href = "https://www.facebook.com/profile.php?id=100083219104359"} color="primary" />
                <a className={contactStringClassName} href="https://www.facebook.com/profile.php?id=100083219104359">
                  Facebook
                </a>
              </Stack>

            </Stack>

          </AppBar>
        </Box>

        <Box sx={{ width: "100%" }}>
          {/* <AppBar position="static" style={{ backgroundColor: "#354244" }}> */}
          <AppBar elevation={0} color="transparent" position="static">
            {/* <Tabs value={value} onChange={handleChange} centered variant="scrollable" textColor="primary" inkBarStyle={{ background: 'yellow' }} scrollButtons allowScrollButtonsMobile */}
            <Stack direction="row"
              justifyItems="center"
              alignItems="center"
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

              <Tabs value={value} onChange={handleChange} /*centered*/ variant="scrollable" textColor="secondary"
                scrollButtons allowScrollButtonsMobile
              >
                <Tab label="Rólunk" {...a11yProps(0)} />
                <Tab label="Szolgáltatások" {...a11yProps(1)} />
                <Tab label="Ajánlat kérés" {...a11yProps(2)} />
                <Tab label="Galéria" {...a11yProps(3)} />

              </Tabs>
            </Stack>

          </AppBar>

          <SwipeableViews
            axis={Theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={1}>
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
